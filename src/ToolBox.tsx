import React, { FunctionComponent, useContext } from "react";
import ColorPicker from "./ColorPicker";
import { ColorPickerContext } from "./ColorPickerContext";
import "./Toolbox.scss";

export interface ToolBoxProps {
  load: () => void;
  save: () => void;
  reset: () => void;
}

const ToolBox: FunctionComponent<ToolBoxProps> = ({ load, save, reset }) => {
  const { currentColor, setCurrentColor } = useContext(ColorPickerContext);

  return (
    <div className="toolbox">
      <div className="toolbox-button-box">
        <button onClick={() => load()} className="toolbox-button">
          Load
        </button>
        <button onClick={() => save()} className="toolbox-button">
          Save
        </button>
        {/* <button className="toolbox-button">Print</button> */}
      </div>

      <ColorPicker currentColor={currentColor} chooseColor={setCurrentColor} />
      {/* <div className="toolbox-button-box">
        <button className="toolbox-button">Undo</button>
        <button className="toolbox-button">Redo</button>
      </div> */}
      <button onClick={() => reset()} className="toolbox-button">
        Reset
      </button>
    </div>
  );
};

export default ToolBox;
