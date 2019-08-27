import { colorMap } from "./constants";

export const getColor = (n: number): string => {
  const color = colorMap[n];
  return color ? color : "white";
};
