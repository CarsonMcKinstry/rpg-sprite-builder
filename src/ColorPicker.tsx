import React, { FunctionComponent, MouseEventHandler } from "react";

import { colorMap } from "./common";

const ColorPicker: FunctionComponent<{
  currentColor: number;
  chooseColor: (i: number) => MouseEventHandler;
}> = ({ chooseColor, currentColor }) => {
  const palette = colorMap.map((color, i) => {
    return (
      <div
        key={color + "_" + i}
        style={{
          backgroundColor: color,
          boxSizing: "border-box",
          borderWidth: currentColor === i ? 4 : 0,
          borderColor: "gray",
          borderStyle: "solid",
          height: 40,
          width: 40,
          transition: "border 0.05s ease-in-out"
        }}
        onClick={chooseColor(i)}
      />
    );
  });

  return (
    <div
      style={{
        border: "1px solid black",
        width: 160,
        display: "flex",
        flexWrap: "wrap"
      }}
    >
      {palette}
    </div>
  );
};

export default ColorPicker;
