import React, { useState } from "react";
import { useDrag } from "react-dnd";

const VnfItem = ({ name }) => {
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
     style={{
       padding: "8px",
       margin: "8px",
       backgroundColor: isDragging ? "lightgreen" : "lightgrey",
       cursor: "move",
       borderRadius: "4px",
       width: "100px",
       textAlign: "center",
     }}
   >
     {name}
   </div>
 );
};

export default VnfItem;