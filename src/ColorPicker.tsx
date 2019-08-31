import React, { FunctionComponent, useEffect } from "react";
import { query } from "./db";
import "./ColorPicker.scss";
import { useQuery } from "./useQuery";

// import { colorMap } from "./constants";

interface ColorPickerProps {
  currentColor: string;
  chooseColor: (i: string) => void;
}

const addColorQuery = `
  mutation addColorQuery($color: Color!) {
    addUsedColor(color: $color) {
      id
      color
    }
  }
`;

const usedColorQueries = `
  {
    usedColors {
      color
    }
  }
`;

const ColorPicker: FunctionComponent<ColorPickerProps> = ({
  currentColor,
  chooseColor
}) => {
  const { loading, data, errors, runQuery } = useQuery(usedColorQueries, {});

  function saveUsedColor() {
    query(addColorQuery, {
      color: currentColor
    }).then(runQuery);
  }

  const palette = !loading
    ? data.usedColors.map(
        ({ color: backgroundColor }: { color: any }, i: number) => (
          <div
            key={backgroundColor + "_" + i}
            className="swatch"
            style={{
              backgroundColor,
              borderWidth: backgroundColor === currentColor ? 4 : 0
            }}
            onClick={() => chooseColor(backgroundColor)}
          />
        )
      )
    : [];

  while (palette.length < 16) {
    palette.push(
      <div
        className="swatch"
        style={{
          backgroundColor: "white"
        }}
      />
    );
  }

  const colorExistsInPalette = () => {
    if (!loading) {
      return !!data.usedColors.find(
        ({ color }: { color: string }) => color === currentColor
      );
    }

    return false;
  };

  return (
    <>
      <div className="toolbox-button-box">
        <input
          className="toolbox-button"
          type="color"
          value={currentColor}
          onChange={e => {
            chooseColor(e.currentTarget.value);
          }}
        />
        <button
          className="toolbox-button"
          onClick={() => {
            if (currentColor !== "#ffffff" && !colorExistsInPalette()) {
              saveUsedColor();
            }
          }}
        >
          Add
        </button>
      </div>
      <div className="palette">{palette}</div>
    </>
  );
};

export default ColorPicker;
