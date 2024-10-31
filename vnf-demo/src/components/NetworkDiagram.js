import React from "react";
import DraggableVnf from "./DraggableVnf";
import DraggableDataNetwork from "./DraggableDataNetwork"; // Import new component for Data Network

// Customizable colors
const colors = {
  line: "#007bff",
  vnf: "#e3f2fd",
  deployedVnf: "#b3e5fc",
  labelFontSize: 16,
  labelBorder: "#007bff", // Border color for label
  labelBackground: "#ffffff", // Background color for the label
};

// Customizable positions
const posValues = {
  lowerBusTop: 300,
  upperBusTop: 50,
  upfGNBTopUE: 450,
  sbaBusTop: 150,
  sbaBusLateral: 50,
  labelBoxPush: 45,
};

// Customizable positions
const positions = {
  SCP: { top: 50, left: 100 },
  NRF: { top: 50, left: 300 },
  UDR: { top: 50, left: 500 },
  UDM: { top: 50, left: 700 },
  AUSF: { top: 50, left: 900 },
  AMF: { top: posValues.lowerBusTop, left: 400 },
  SMF: { top: posValues.lowerBusTop, left: 800 },
  UPF: { top: posValues.upfGNBTopUE, left: 800 },
  gNB: { top: posValues.upfGNBTopUE, left: 400 },
  UE: { top: posValues.upfGNBTopUE, left: 150 },
  DN: { top: posValues.upfGNBTopUE, left: 1100 }, 
};

const NetworkDiagram = ({ onSelectVnf, regions }) => {
  const vnfs = ["NRF", "UDM", "AUSF", "UDR", "SCP", "AMF", "SMF", "UPF"];

  // Function to add a bordered label
  const addLabel = (x, y, label) => (
    <>
      <rect
        x={x}
        y={y - colors.labelFontSize - 10}
        width={label.length + 50}
        height={colors.labelFontSize + 15}
        fill={colors.labelBackground}
        stroke={colors.labelBorder}
        strokeWidth="2"
        rx="4" // Rounded corners for the border
        ry="4"
      />
      <text
        x={x + 5}
        y={y - 5}
        fill="black"
        fontSize={colors.labelFontSize}
      >
        {label}
      </text>
    </>
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "600px", padding: "20px" }}>
      {/* Render VNFs */}
      {vnfs.map((vnf, index) => (
        <DraggableVnf
          key={index}
          name={vnf}
          onSelectVnf={onSelectVnf}
          position={positions[vnf]}
          isDeployed={regions.WZ.includes(vnf) || regions.LZ.includes(vnf) || regions.AZ.includes(vnf)}
          style={{
            backgroundColor: colors.vnf,
            borderColor: regions.WZ.includes(vnf) || regions.LZ.includes(vnf) || regions.AZ.includes(vnf)
              ? colors.deployedVnf
              : colors.vnf,
          }}
        />
      ))}

      {/* Render UE as an image */}
      <img
        src={`${process.env.PUBLIC_URL}/img/user_equipment.png`}
        alt="User Equipment"
        className="mt-2"
        style={{
          position: "absolute",
          top: positions.UE.top,
          left: positions.UE.left,
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      {/* Render gNB as an image */}
      <img
        src={`${process.env.PUBLIC_URL}/img/base_station.png`}
        alt="gNodeB"
        className="mt-2"
        style={{
          position: "absolute",
          top: positions.gNB.top,
          left: positions.gNB.left,
          width: "100px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      {/* Render Data Network as a draggable cloud-shaped element */}
      <DraggableDataNetwork
        name="DN"
        position={positions.DN}
        onSelectVnf={onSelectVnf}
        style={{
          backgroundColor: "#ffffff", // Keep the background white
          border: `2px solid ${colors.labelBorder}`,
          borderRadius: "50%", // Optional: to give it a cloud-like rounded shape
          width: "120px",
          height: "80px",
          position: "absolute",
        }}
      />

      {/* Connections Between Elements */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connecting UE to gNB */}
        <line
          x1={positions.UE.left + 120}
          y1={positions.UE.top + 55}
          x2={positions.gNB.left}
          y2={positions.gNB.top + 55}
          stroke={colors.line}
          strokeWidth="4"
        />

        {/* Connecting gNB to AMF */}
        <line
          x1={positions.gNB.left + 50}
          y1={positions.gNB.top + 10}
          x2={positions.AMF.left + 50}
          y2={positions.AMF.top + 80}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.gNB.left + posValues.sbaBusLateral + 5, positions.gNB.top - posValues.sbaBusTop + 2.5 * posValues.labelBoxPush, "N2")}

        {/* Connecting UE to AMF */}
        <line
          x1={positions.AMF.left - 30}
          y1={positions.AMF.top + 70}
          x2={positions.UE.left + 100}
          y2={positions.UE.top}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.UE.left + posValues.sbaBusLateral + 35, positions.UE.top - posValues.sbaBusTop + 2.5 * posValues.labelBoxPush, "N1")}

        {/* SBA Bus */}
        <line
          x1={positions.SCP.left + posValues.sbaBusLateral - 50}
          y1={positions.SCP.top + posValues.sbaBusTop}
          x2={positions.AUSF.left + posValues.sbaBusLateral + 50}
          y2={positions.AUSF.top + posValues.sbaBusTop}
          stroke={colors.line}
          strokeWidth="4"
        />

        {/* Connecting SCP to SBA */}
        <line
          x1={positions.SCP.left + posValues.sbaBusLateral}
          y1={positions.SCP.top}
          x2={positions.SCP.left + posValues.sbaBusLateral}
          y2={positions.SCP.top + posValues.sbaBusTop}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.SCP.left + posValues.sbaBusLateral + 5, positions.SCP.top + posValues.sbaBusTop - posValues.labelBoxPush, "Nscp")}

        {/* Connecting NRF to SBA */}
        <line
          x1={positions.NRF.left + posValues.sbaBusLateral}
          y1={positions.NRF.top}
          x2={positions.NRF.left + posValues.sbaBusLateral}
          y2={positions.NRF.top + posValues.sbaBusTop}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.NRF.left + posValues.sbaBusLateral + 5, positions.NRF.top + posValues.sbaBusTop - posValues.labelBoxPush, "Nnrf")}

        {/* Connecting UDR to SBA */}
        <line
          x1={positions.UDR.left + posValues.sbaBusLateral}
          y1={positions.UDR.top}
          x2={positions.UDR.left + posValues.sbaBusLateral}
          y2={positions.UDR.top + posValues.sbaBusTop}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.UDR.left + posValues.sbaBusLateral + 5, positions.UDR.top + posValues.sbaBusTop - posValues.labelBoxPush, "Nudr")}

        {/* Connecting UDM to SBA */}
        <line
          x1={positions.UDM.left + posValues.sbaBusLateral}
          y1={positions.UDM.top}
          x2={positions.UDM.left + posValues.sbaBusLateral}
          y2={positions.UDM.top + posValues.sbaBusTop}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.UDM.left + posValues.sbaBusLateral + 5, positions.UDM.top + posValues.sbaBusTop - posValues.labelBoxPush, "Nudm")}

        {/* Connecting AUSF to SBA */}
        <line
          x1={positions.AUSF.left + posValues.sbaBusLateral}
          y1={positions.AUSF.top}
          x2={positions.AUSF.left + posValues.sbaBusLateral}
          y2={positions.AUSF.top + posValues.sbaBusTop}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.AUSF.left + posValues.sbaBusLateral + 5, positions.AUSF.top + posValues.sbaBusTop - posValues.labelBoxPush, "Nausf")}

        {/* Connecting AMF to SBA */}
        <line
          x1={positions.AMF.left + posValues.sbaBusLateral}
          y1={positions.AMF.top}
          x2={positions.AMF.left + posValues.sbaBusLateral}
          y2={positions.AMF.top - posValues.sbaBusTop + 50}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.AMF.left + posValues.sbaBusLateral + 5, positions.AMF.top - posValues.sbaBusTop + 2.5 * posValues.labelBoxPush, "Namf")}

        {/* Connecting SMF to SBA */}
        <line
          x1={positions.SMF.left + posValues.sbaBusLateral}
          y1={positions.SMF.top}
          x2={positions.SMF.left + posValues.sbaBusLateral}
          y2={positions.SMF.top - posValues.sbaBusTop + 50}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.SMF.left + posValues.sbaBusLateral + 5, positions.SMF.top - posValues.sbaBusTop + 2.5 * posValues.labelBoxPush, "Nsmf")}

        {/* Connecting SMF to UPF */}
        <line
          x1={positions.SMF.left + posValues.sbaBusLateral}
          y1={positions.SMF.top}
          x2={positions.UPF.left + posValues.sbaBusLateral}
          y2={positions.UPF.top}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.UPF.left + posValues.sbaBusLateral + 5, positions.UPF.top - posValues.sbaBusTop + 2.5 * posValues.labelBoxPush, "N4")}

        {/* Connecting gNB to UPF */}
        <line
          x1={positions.gNB.left + 120}
          y1={positions.gNB.top + 40}
          x2={positions.UPF.left - 20}
          y2={positions.UPF.top + 40}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.gNB.left + 4.5 * posValues.sbaBusLateral + 5, positions.gNB.top - posValues.sbaBusTop + 4 * posValues.labelBoxPush, "N3")}

        {/* Connecting UPF to DN */}
        <line
          x1={positions.UPF.left + 120}
          y1={positions.UPF.top + 30}
          x2={positions.DN.left - 30}
          y2={positions.DN.top + 30}
          stroke={colors.line}
          strokeWidth="4"
        />
        {addLabel(positions.UPF.left + 170, positions.UPF.top + 20, "N6")}
      </svg>
    </div>
  );
};

export default NetworkDiagram;