import { CarsWithColor } from '../types/types';

import carsFromServer from './cars';
import colorsFromServer from './colors';

const getCarsWithColors = (): CarsWithColor[] => {
  return carsFromServer.map(car => ({
    ...car,
    color: colorsFromServer
      .find(color => color.id === carsFromServer.colorId) || null,
  }));
};
