import React from "react";

export default function BoundingRectBox(props) {  // component for codes in images
  let { dimension, position, code } = props;

  let styleObj = {
    display: "inline-block",
    position: "absolute",
    left: `${position.left}px`,
    bottom: `${position.bottom + dimension.height}px`,
    fontSize: 16 + "px",
    background: "green",
  };

  return <div style={styleObj}>{code}</div>;
}
