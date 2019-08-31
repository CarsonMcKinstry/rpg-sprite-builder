import React, { FunctionComponent, createContext } from "react";
import "./ColorPicker.scss";

import { colorMap } from "./constants";

interface ColorPickerProps {
  currentColor: string;
  chooseColor: (i: string) => void;
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
          borderWidth: currentColor === color ? 4 : 0
        }}
        onClick={() => chooseColor(color)}
      />
    );
  });

  return <div className="palette">{palette}</div>;
};

export default ColorPicker;
