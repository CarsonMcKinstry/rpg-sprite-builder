import React, { FunctionComponent, useContext } from "react";
import ColorPicker from "./ColorPicker";
import { ColorPickerContext } from "./ColorPickerContext";

export interface ToolBoxProps {}

const ToolBox: FunctionComponent<ToolBoxProps> = () => {
  const { currentColor, setCurrentColor } = useContext(ColorPickerContext);

  return (
    <div>
      <div>
        <button>Load</button>
        <button>Save</button>
        <button>Print</button>
      </div>

      <ColorPicker currentColor={currentColor} chooseColor={setCurrentColor} />
      <div>
        <button>Undo</button>
        <button>Redo</button>
      </div>
      <button>Reset</button>
    </div>
  );
};

export default ToolBox;
