import { SpriteBoard } from "./types";
export const cellSize = 10;

export const numCols = 52;
export const numRows = 52;

export const canvasWidth = 521;
export const canvasHeight = 521;

export const defaultSpriteBoard: SpriteBoard = [...Array(numRows)].fill(
  [...Array(numCols)].fill(0)
);

export const colorMap = [
  "white",
  "black",
  "Bisque",
  "FireBrick",
  "DarkRed",
  "OrangeRed",
  "DarkOrange",
  "Gold",
  "GoldenRod",
  "LimeGreen",
  "DarkOliveGreen",
  "DarkGreen",
  "Turquoise",
  "CornflowerBlue",
  "MidnightBlue",
  "MediumPurple"
];
