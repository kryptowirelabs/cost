import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the components
import NetworkDiagramPanel from "./components/jsx/NetworkDiagramPanel";
import DeploymentZonesPanel from "./components/jsx/DeploymentZonesPanel";
import VnfInfoPanel from "./components/VnfInfoPanel";
import ProcessDetailPanel from "./components/ProcessDetailPanel";

function App() {
  const [regions, setRegions] = useState({
    WZ: [],
    LZ: [],
    AZ: [],
  });

  const [selectedVnf, setSelectedVnf] = useState(null);
  const [vnfDetails, setVnfDetails] = useState({});
  const [vnfProcedures, setVnfProcedures] = useState({});
  const [resourceRequirements, setResourceRequirements] = useState(null); // Add resourceRequirements state
  const [vnfLocations, setVnfLocations] = useState({});


  const [locationWZ, setLocationWZ] = useState("");
  const [locationLZ, setLocationLZ] = useState("");
  const [locationAZ, setLocationAZ] = useState("");
  const [activeZone, setActiveZone] = useState("WZ");
  const [isLZDisabled, setIsLZDisabled] = useState(false);

  const localZoneOptions = {
    "US-East: N. Virginia": ["Atlanta", "Chicago", "NYC"],
    "US-West: Oregon": ["Seattle", "Denver", "LA"],
    "Canada-Central": [],
    "Europe - London": [],
    "Europe - Frankfurt": [],
    "Asia-Pacific: Tokyo": [],
    "Asia-Pacific: Seoul": [],
    "Asia-Pacific: Sydney": []
  };

  const wavelengthZoneOptions = {
    "US-East: N. Virginia": ["Atlanta-WZ", "Chicago-WZ", "NYC-WZ"],
    "US-West: Oregon": ["Seattle-WZ", "Denver-WZ", "LA-WZ"],
    "Canada-Central": ["Toronto-WZ"],
    "Europe - London": ["London-WZ"],
    "Europe - Frankfurt": ["Berlin-WZ"],
    "Asia-Pacific: Tokyo": ["Tokyo-WZ"],
    "Asia-Pacific: Seoul": ["Seoul-WZ"],
    "Asia-Pacific: Sydney": ["Perth-WZ", ""]
  };

  const handleLocationUpdate = (locationType, locationValue) => {
    if (locationType === "WZ") {
      setLocationWZ(locationValue);
    } else if (locationType === "LZ") {
      setLocationLZ(locationValue);
    } else if (locationType === "AZ") {
      setLocationAZ(locationValue);
      setLocationLZ("");
      if (localZoneOptions[locationValue] && localZoneOptions[locationValue].length === 0) {
        setActiveZone("WZ");
        setIsLZDisabled(true);
      } else {
        setIsLZDisabled(false);
      }
    }
  };

  const getFilteredLocalZones = () => {
    if (locationAZ && localZoneOptions[locationAZ] && localZoneOptions[locationAZ].length > 0) {
      return localZoneOptions[locationAZ];
    }
    return [];
  };

  const getFilteredWavelengthZones = () => {
    if (locationAZ && wavelengthZoneOptions[locationAZ]) {
      return wavelengthZoneOptions[locationAZ];
    }
    return [];
  };

  const applyUpdates = () => {
    const data = {
      regions,
      locations: {
        WZ: locationWZ,
        LZ: locationLZ,
        AZ: locationAZ,
      },
      vnfLocations: {}
    };
  
    Object.keys(regions).forEach((zoneType) => {
      regions[zoneType].forEach((vnf) => {
        data.vnfLocations[vnf] = {
          location: zoneType === "AZ" ? locationAZ : zoneType === "LZ" ? locationLZ : locationWZ,
          zoneType: zoneType,
        };
      });
    });
  
    setVnfLocations(data.vnfLocations); // Store in state to pass down
  
    axios.post("http://localhost:5001/apply-updates", data)
      .then(response => {
        console.log(response.data);
        setVnfProcedures(response.data.procedures);
      })
      .catch(error => console.error("Error applying updates:", error));
  };
  

  const handleDrop = (item, newRegion) => {
    if (!item || !item.name || !newRegion) {
      console.error("Invalid item or region entered");
      return;
    }

    setRegions((prev) => {
      const updatedRegions = { ...prev };
      Object.keys(updatedRegions).forEach((key) => {
        updatedRegions[key] = updatedRegions[key].filter((vnf) => vnf !== item.name);
      });
      updatedRegions[newRegion] = [...updatedRegions[newRegion], item.name];
      return updatedRegions;
    });
  };

  const handleVnfSelect = (vnf) => {
    setSelectedVnf(vnf);
  };

  const handleVnfInputChange = (vnf, value) => {
    setVnfDetails((prev) => ({ ...prev, [vnf]: value }));
  };

  const handleResourceRequirementsUpdate = (requirements) => {
    setResourceRequirements(requirements);
  };

  const toggleActiveZone = () => {
    if (isLZDisabled) {
      alert("No edge zone available");
    } else {
      setActiveZone((prevZone) => (prevZone === "WZ" ? "LZ" : "WZ"));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container-fluid position-relative">
        <header className="bg-primary text-white text-center py-4 mb-4">
          <h1>COST: Cloud Optimization Strategy for Telcos</h1>
        </header>

        <div className="row">
          <NetworkDiagramPanel
            onSelectVnf={handleVnfSelect}
            regions={regions}
            handleVnfInputChange={handleVnfInputChange}
            setResourceRequirements={handleResourceRequirementsUpdate} // Pass resourceRequirements update handler
          />

          <DeploymentZonesPanel
            regions={regions}
            handleDrop={handleDrop}
            handleLocationUpdate={handleLocationUpdate}
            locationWZ={locationWZ}
            locationLZ={locationLZ}
            locationAZ={locationAZ}
            activeZone={activeZone}
            isLZDisabled={isLZDisabled}
            getFilteredLocalZones={getFilteredLocalZones}
            getFilteredWavelengthZones={getFilteredWavelengthZones}
            applyUpdates={applyUpdates}
            toggleActiveZone={toggleActiveZone}
            localZoneOptions={localZoneOptions}
          />

          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <VnfInfoPanel resourceRequirements={resourceRequirements} />
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Process Details</h2>
                <ProcessDetailPanel vnf={selectedVnf} vnfLocations={vnfLocations} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;

