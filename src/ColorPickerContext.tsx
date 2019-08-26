import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  FunctionComponent
} from "react";

export interface ColorPickerValue {
  currentColor: number;
  setCurrentColor: Dispatch<SetStateAction<number>>;
}

export const ColorPickerContext = createContext<ColorPickerValue>({
  currentColor: 1,
  setCurrentColor: i => undefined
});

const ColorPickerProvider: FunctionComponent<{}> = ({ children }) => {
  const [currentColor, setCurrentColor] = useState(1);
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
