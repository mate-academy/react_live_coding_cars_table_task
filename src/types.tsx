export interface Cars {
  id: number,
  brand: string,
  rentPrice: number,
  colorId: number,
}

export interface Colors {
  id: number,
  name: string,
}

export interface FullCarsList extends Cars {
  color?: Colors,
}
