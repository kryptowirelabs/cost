import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableVnf from "./DraggableVnf";

const DropZone = ({ name, onDrop, vnfs }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "VNF",
    drop: (item) => {
      onDrop(item, name);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [location, setLocation] = useState("");

  return (
    <div
      ref={drop}
      style={{
        padding: "16px",
        margin: "8px",
        backgroundColor: isOver ? "lightblue" : "#f0f0f0",
        minHeight: "300px",
        width: "300px",
        border: "2px dashed #000",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", 
        gap: "10px", 
      }}
    >
      {vnfs && vnfs.length > 0 ? (
        vnfs.map((vnf, index) => (
          <DraggableVnf
            key={index}
            name={vnf}
            onSelectVnf={() => {}}
            position={null}
            style={{
              marginBottom: "10px", // Add space between VNFs
              width: "100%", // Make sure VNFs are consistent in size
            }}
          />
        ))
      ) : (
        <p style={{ color: "#999" }}>No VNFs assigned</p>
      )}
    </div>
  );
};

export default DropZone;