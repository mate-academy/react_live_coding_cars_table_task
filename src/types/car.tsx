import { Color } from "./color";

export interface Car {
  id: number,
  brand: string,
  rentPrice: number,
  colorId: number,
}

export interface CarWithColor extends Car {
  color?: Color;
}
