import React, { useState, useEffect } from "react";
import NetworkDiagram from "../NetworkDiagram"; // Import NetworkDiagram as required
import axios from "axios"; // Ensure axios is imported

const NetworkDiagramPanel = ({ onSelectVnf, regions, handleVnfInputChange, setResourceRequirements }) => {
  const [vnfInputs, setVnfInputs] = useState({});

  useEffect(() => {
    const initialInputs = {};
    Object.keys(regions).forEach((region) => {
      regions[region].forEach((vnf) => {
        if (!initialInputs[vnf]) {
          initialInputs[vnf] = { requestsPerMinute: "", instanceCount: 1 }; // Default instanceCount is 1
        }
      });
    });
    setVnfInputs(initialInputs);
  }, [regions]);

  const handleInputChange = (vnf, key, value) => {
    setVnfInputs((prev) => ({
      ...prev,
      [vnf]: { ...prev[vnf], [key]: value },
    }));
    handleVnfInputChange(vnf, { [key]: value });
  };

  const submitVnfDetails = () => {
    axios
      .post("http://localhost:5001/update-vnf-details", vnfInputs)
      .then((response) => {
        console.log(response.data);
        setResourceRequirements(response.data.resourceRequirements);
      })
      .catch((error) => console.error("Error updating VNF details:", error));
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h2 className="card-title">5G Core Service Based Architecture</h2>
          <NetworkDiagram onSelectVnf={onSelectVnf} regions={regions} />

          <hr style={{ margin: "20px 0", borderTop: "2px solid #007bff" }} />

          <div className="vnf-inputs mt-4">
            <h3 className="mb-3">Enter VNF Information:</h3>
            <div className="row">
              {Object.keys(regions).map((region) =>
                regions[region].map((vnf) => (
                  <div key={vnf} className="col-md-4 mb-3"> {/* Change col-md-6 to col-md-4 */}
                    <label>{vnf}</label>
                    <div className="row">
                      <div className="col">
                        <input
                          type="number"
                          placeholder={`${vnf === "UPF" ? "Data GB/hr" : "Reqs/min"}`}
                          value={vnfInputs[vnf]?.requestsPerMinute || ""}
                          onChange={(e) => handleInputChange(vnf, "requestsPerMinute", e.target.value)}
                          className="form-control"
                          style={{ width: "auto" }}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          placeholder="Instances"
                          value={vnfInputs[vnf]?.instanceCount || 1}
                          onChange={(e) => handleInputChange(vnf, "instanceCount", e.target.value)}
                          className="form-control"
                          style={{ width: "auto" }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button onClick={submitVnfDetails} className="btn btn-primary mt-3">
              Submit VNF Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkDiagramPanel;
