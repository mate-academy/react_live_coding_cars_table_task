export interface Color {
  id: number,
  name: string,
}

export interface Car {
  id: number,
  brand: string,
  rentPrice: number,
  colorId: number,
}

export interface FullCar extends Car {
  color?: Color,
}
