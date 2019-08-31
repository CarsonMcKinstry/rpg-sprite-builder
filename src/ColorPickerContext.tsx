import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  FunctionComponent
} from "react";

export interface ColorPickerValue {
  currentColor: string;
  setCurrentColor: Dispatch<SetStateAction<string>>;
}

export const ColorPickerContext = createContext<ColorPickerValue>({
  currentColor: "#ffffff",
  setCurrentColor: i => undefined
});

const ColorPickerProvider: FunctionComponent<{}> = ({ children }) => {
  const [currentColor, setCurrentColor] = useState("#ffffff");
  return (
    <ColorPickerContext.Provider
      value={{
        currentColor,
        setCurrentColor
      }}
    >
      {children}
    </ColorPickerContext.Provider>
  );
};

export default ColorPickerProvider;
