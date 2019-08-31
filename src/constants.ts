import { SpriteBoard } from "./types";
export const cellSize = 10;

export const numCols = 52;
export const numRows = 52;

export const canvasWidth = 521;
export const canvasHeight = 521;

export const defaultSpriteBoard: SpriteBoard = [...Array(numRows)].fill(
  [...Array(numCols)].fill("white")
);

const grayScale = ["white", "LightGray", "Grey", "black"];

const reds = ["LightCoral", "Crimson", "FireBrick", "DarkRed"];

const oranges = ["SandyBrown", "DarkOrange", "Chocolate", "OrangeRed"];

const yellows = ["LemonChiffon", "Khaki", "Gold", "GoldenRod"];
const greens = [
  "MediumAquaMarine",
  "MediumSeaGreen",
  "ForestGreen",
  "DarkGreen"
];
const blues = ["LightCyan", "LightSkyBlue", "CornflowerBlue", "MidnightBlue"];
const purples = ["Plum", "MediumOrchid", "MediumPurple", "RebeccaPurple"];
const browns = ["Tan", "Peru", "Sienna", "SaddleBrown"];
const skins = ["LavenderBlush", "MistyRose", "PeachPuff", "Wheat"];
const slates = ["Silver", "SlateGrey", "LightSteelBlue", "SteelBlue"];

export const colorMap = [
  ...grayScale,
  ...slates,
  ...reds,
  ...oranges,
  ...yellows,
  ...greens,
  ...blues,
  ...purples,
  ...browns,
  ...skins
];
