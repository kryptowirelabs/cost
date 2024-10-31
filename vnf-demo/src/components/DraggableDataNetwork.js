import React from "react";
import { useDrag } from "react-dnd";

const DraggableDataNetwork = ({ name, position, onSelectVnf, style }) => {
  const [, drag] = useDrag(() => ({
    type: "VNF",
    item: { name },
  }));

  return (
    <div
      ref={drag}
      onClick={() => onSelectVnf(name)}
      style={{
        ...style,
        position: "absolute",
        top: position.top,
        left: position.left,
        width: "120px",
        height: "80px",
        cursor: "pointer",
      }}
    >
      {/* Cloud shape created with SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 40"
        width="100%"
        height="100%"
      >
        <path
          d="M50 18c0-5.25-4.25-9.5-9.5-9.5-4.13 0-7.63 2.5-9 6-1.25-3.38-4.5-5.75-8.5-5.75C16.75 8.75 13 12.5 13 17c0 .63.13 1.38.25 2H9.5C6.25 19 4 21.25 4 24.5c0 3.25 2.25 5.5 5.5 5.5h39c4.25 0 7.5-3.25 7.5-7.5S54.25 18 50 18z"
          fill="#e3f2fd"
          stroke="#007bff"
          strokeWidth="2"
        />
      </svg>
      <div style={{ textAlign: "center", marginTop: "-20px", fontWeight: "bold" }}>
        {name}
      </div>
    </div>
  );
};

export default DraggableDataNetwork;