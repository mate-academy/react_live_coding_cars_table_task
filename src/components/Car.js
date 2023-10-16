import carsFromServer from '../api/cars';
import { getColorsById } from './ColorsById';

export const cars = carsFromServer.map(car => ({
  ...car,
  color: getColorsById(car.colorId),
}));
