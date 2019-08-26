import React, { FunctionComponent, createContext } from "react";
import "./ColorPicker.scss";

import { colorMap } from "./constants";

interface ColorPickerProps {
  currentColor: number;
  chooseColor: (i: number) => void;
}

const ColorPicker: FunctionComponent<ColorPickerProps> = ({
  currentColor,
  chooseColor
}) => {
  const palette = colorMap.map((color, i) => {
    return (
      <div
        key={color + "_" + i}
        className="swatch"
        style={{
          backgroundColor: color,
          borderWidth: currentColor === i ? 4 : 0
        }}
        onClick={() => chooseColor(i)}
      />
    );
  });

  return <div className="palette">{palette}</div>;
};

export default ColorPicker;
