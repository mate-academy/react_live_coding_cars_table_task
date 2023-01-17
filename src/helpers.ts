import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';
import { FullCar } from './types';

export const getColorById = (colorId: number) => (
  colorsFromServer.find(color => color.id === colorId)
);

export const getFullCar = (): FullCar[] => {
  return carsFromServer.map(car => ({
    ...car,
    color: getColorById(car.colorId),
  }));
};
