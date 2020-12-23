import React from "react";

export default function BoundingRectBox(props) {  // bounding rect component for box
  let { dimension, position } = props;

  let styleObj = {
    display: "inline-block",
    position: "absolute",
    left: `${position.left}px`,
    bottom: `${position.bottom}px`,
    width: `${dimension.width}px`,
    height: `${dimension.height}px`,
  };

  return <div style={{ ...styleObj, border: `2.5px solid magenta` }}></div>;
}
