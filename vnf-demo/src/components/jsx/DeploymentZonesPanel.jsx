import React from "react";
import DropZone from "../DropZone";

const DeploymentZonesPanel = ({
  regions,
  handleDrop,
  handleLocationUpdate,
  locationWZ,
  locationLZ,
  locationAZ,
  activeZone,
  isLZDisabled,
  toggleActiveZone,
  getFilteredLocalZones,
  getFilteredWavelengthZones,
  applyUpdates,
  localZoneOptions
}) => (
  <div className="col-md-6 mb-4 d-flex align-items-start">
    <div className="card w-100">
      <div className="card-body">
        <h2 className="card-title">Deployment Zones</h2>
        <div className="d-flex justify-content-between align-items-start position-relative" style={{ paddingBottom: '10px' }}>
          {/* Wavelength Zone */}
          <div className="d-flex flex-column align-items-center" style={{ marginBottom: '1%' }}>
            <div style={{ border: "2px solid #007bff", padding: "10px", borderRadius: "8px", marginBottom: '20px', marginTop: '0px' }}>
              <div className="d-flex flex-column align-items-center">
                <DropZone name="WZ" onDrop={handleDrop} vnfs={regions.WZ} disabled={activeZone !== "WZ"} />
                <select
                  className="form-control mt-2"
                  value={locationWZ}
                  onChange={(e) => handleLocationUpdate("WZ", e.target.value)}
                  style={{ width: "80%" }}
                  disabled={activeZone !== "WZ"}
                >
                  <option value="">Select Wavelength Zone</option>
                  {getFilteredWavelengthZones().map((zone) => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
                <img
                  src={`${process.env.PUBLIC_URL}/img/small_dc.png`}
                  alt="Wavelength Zone"
                  className="mt-2"
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h5 className="text-center mt-2">Wavelength Zone</h5>
                <div className="connector-line" style={{ width: "2px", height: "30px", backgroundColor: "#007bff", marginTop: "10px" }}></div>
                <img
                  src={`${process.env.PUBLIC_URL}/img/base_station.png`}
                  alt="Base Station"
                  className="mt-3"
                  style={{ width: "60px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h5 className="text-center mt-2">Radio Access Network</h5>
              </div>
            </div>
            <h5 className="text-center mt-3">Telecom Service Provider Infrastructure</h5>
          </div>

          {/* Local Zone */}
          <div className="d-flex flex-column align-items-center" style={{ marginTop: '0px' }}>
            <DropZone name="LZ" onDrop={handleDrop} vnfs={regions.LZ} disabled={activeZone !== "LZ"} />
            <select
              className="form-control mt-2"
              value={locationLZ}
              onChange={(e) => handleLocationUpdate("LZ", e.target.value)}
              style={{ width: "80%" }}
              disabled={activeZone !== "LZ" || isLZDisabled || getFilteredLocalZones().length === 0}
            >
              <option value="">Select Local Zone</option>
              {getFilteredLocalZones().map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
            <img
              src={`${process.env.PUBLIC_URL}/img/small_dc.png`}
              alt="Local Zone"
              className="mt-2"
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h5 className="text-center mt-2">Local Zone</h5>
          </div>

          {/* Availability Zone */}
          <div className="d-flex flex-column align-items-center" style={{ marginTop: '0px' }}>
            <DropZone name="AZ" onDrop={handleDrop} vnfs={regions.AZ} />
            <select
              className="form-control mt-2"
              value={locationAZ}
              onChange={(e) => handleLocationUpdate("AZ", e.target.value)}
              style={{ width: "80%" }}
            >
              <option value="">Select Availability Zone</option>
              {Object.keys(localZoneOptions).map((az) => (
                <option key={az} value={az}>{az}</option>
              ))}
            </select>
            <img
              src={`${process.env.PUBLIC_URL}/img/large_dc.png`}
              alt="Availability Zone"
              className="mt-2"
              style={{ width: "160px", height: "160px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h5 className="text-center mt-2">Availability Zone</h5>
          </div>
        </div>

        {/* Horizontal Line between Wavelength Zone and Local Zone */}
        <div className="position-absolute" style={{
          top: '48%', left: '18%', width: '30%', height: '4px', backgroundColor: '#ff0000'
        }}>
          <div className="position-absolute" style={{
            top: '0px', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '30px', color: '#ff0000'
          }}>
            ✖
          </div>
        </div>

        {/* Connecting Lines */}
        <div className="position-absolute" style={{
          top: '70%', left: '27.5%', right: '13%', height: '3px', backgroundColor: '#007bff'
        }}></div>

        <div className="position-absolute" style={{
          top: '55%', left: '51%', width: '3px', height: '15%', backgroundColor: '#007bff'
        }}></div>
        <div className="position-absolute" style={{
          top: '65%', right: '13%', width: '3px', height: '5%', backgroundColor: '#007bff'
        }}></div>

        {/* Apply and Toggle Buttons */}
        <div className="d-flex justify-content-center align-items-left w-100 mb-4">
          <button
            className="btn btn-primary mt-3"
            onClick={applyUpdates}
            style={{ fontSize: "28.5px", fontWeight: "bold" }}
          >
            Apply Zone Locations
          </button>
        </div>

        <div className="d-flex justify-content-center align-items-center w-100 mb-4">
          <button
            className="btn btn-secondary"
            onClick={toggleActiveZone}
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Toggle Active Zone (Current: {activeZone})
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DeploymentZonesPanel;
