import React, { FunctionComponent, useContext } from "react";
import ColorPicker from "./ColorPicker";
import { ColorPickerContext } from "./ColorPickerContext";
import "./Toolbox.scss";

export interface ToolBoxProps {
  print: () => void;
  save: () => void;
  reset: () => void;
}

const ToolBox: FunctionComponent<ToolBoxProps> = ({ print, save, reset }) => {
  const { currentColor, setCurrentColor } = useContext(ColorPickerContext);

  return (
    <div className="toolbox">
      <div className="toolbox-button-box">
        <button onClick={() => print()} className="toolbox-button">
          Print
        </button>
        <button onClick={() => save()} className="toolbox-button">
          Save
        </button>
        {/* <button className="toolbox-button">Print</button> */}
      </div>
      <button
        className="toolbox-button"
        onClick={() => setCurrentColor("#ffffff")}
      >
        Eraser
      </button>
      <ColorPicker currentColor={currentColor} chooseColor={setCurrentColor} />
      <button onClick={() => reset()} className="toolbox-button">
        Reset
      </button>
    </div>
  );
};

export default ToolBox;
