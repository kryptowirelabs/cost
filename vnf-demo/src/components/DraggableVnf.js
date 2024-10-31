import React from "react";
import { useDrag } from "react-dnd";
import { vnfStyles } from "../styles/styles"; // Import shared styles

const DraggableVnf = ({ name, onSelectVnf, position }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "VNF",
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      onClick={() => onSelectVnf(name)}
      style={{
        ...vnfStyles,
        position: position ? "absolute" : "relative",
        top: position?.top,
        left: position?.left,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 2 : 1,
      }}
    >
      {name}
    </div>
  );
};

export default DraggableVnf;