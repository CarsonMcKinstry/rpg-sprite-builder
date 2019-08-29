import React from "react";
import SpriteBuilder from "./SpriteBuilder";
import "./App.scss";
import { query } from "./db";

import ColorBuilderProvider from "./ColorPickerContext";

const App = () => {
  return (
    <ColorBuilderProvider>
      <SpriteBuilder />
    </ColorBuilderProvider>
  );
};

export default App;
