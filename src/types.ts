export interface Car {
  id: number,
  brand: string,
  rentPrice: number,
  colorId: number,
}

export interface Color {
  id: number,
  name: string,
}

export interface CarWithColor extends Car {
  color?: Color,
}
