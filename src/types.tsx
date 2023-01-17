export interface Cars {
  id: number,
  brand: string,
  rentPrice: number,
  colorId: number,
  info: string,
}

export interface Colors {
  id: number,
  name: string,
}

export interface FullCarsList extends Cars {
  color?: Colors,
}
