// ProcessDetailPanel.js
import React, { useState, useEffect } from "react";
import vnfProcedures from "./vnfProcedures";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProcessDetailPanel = ({ vnf, vnfLocations }) => {
  const procedures = vnfProcedures[vnf] || [];
  const [selectedProcess, setSelectedProcess] = useState(procedures.length > 0 ? procedures[0].name : null);
  const [svgContent, setSvgContent] = useState(null);
  const [processLatency, setProcessLatency] = useState(null);

  // Fetch SVG content based on selected process
  useEffect(() => {
    if (selectedProcess) {
      fetch(getDiagramSrc(selectedProcess))
        .then((response) => response.text())
        .then((svg) => setSvgContent(svg))
        .catch((error) => console.error("Error loading SVG:", error));
    }
  }, [selectedProcess]);

  useEffect(() => {
    if (vnfLocations && selectedProcess && vnf) {
      axios.post("http://localhost:5001/get-process-latency", {
        vnfLocations,
        vnf,
        processName: selectedProcess,
      })
        .then((response) => {
          setProcessLatency(response.data.latency);
        })
        .catch((error) => console.error("Error fetching process latency:", error));
    }
  }, [vnfLocations, selectedProcess, vnf]);
  const getDiagramSrc = (processName) => {
    return `${process.env.PUBLIC_URL}/vnf_procedures/${vnf}-${processName}.svg`;
  };

  return (
    <div className="process-detail-panel d-flex" style={{ justifyContent: "center", padding: "20px" }}>
      {/* Sidebar Navigation */}
      <div className="sidebar-nav" style={{ width: "20%", padding: "20px" }}>
        <h3 className="mb-3">Processes for {vnf}</h3>
        
        <div className="list-group">
          {procedures.map((procedure, index) => (
            <button
              key={index}
              className={`list-group-item list-group-item-action ${selectedProcess === procedure.name ? "active" : ""}`}
              onClick={() => setSelectedProcess(procedure.name)}
            >
              {procedure.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="process-content" style={{ width: "70%", padding: "20px", textAlign: "center" }}>
        {selectedProcess ? (
          <>
            <h3>Process Details for {selectedProcess}</h3>
            {/* Display the total latency above the SVG */}
            {processLatency !== null && (
              <div className="latency-display mb-3">
                <span className="badge bg-primary">
                  Total Latency: {processLatency} ms
                </span>
              </div>
            )}
            <div
              className="diagram-container"
              style={{ position: "relative", display: "inline-block" }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </>
        ) : (
          <p>Select a process from the left to see the details.</p>
        )}
      </div>
    </div>
  );
};

export default ProcessDetailPanel;
