import React, { useState } from 'react';
import colors from './api/colors';
import carsFromServer from './api/cars';
import { FullCarsList } from './types';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const findColor = (colorId: number) => (
  colors.find(c => c.id === colorId)
);

const getNewColoredCar = (): FullCarsList[] => (
  carsFromServer.map(car => ({
    ...car,
    color: findColor(car.colorId),
  }))
);

export const App: React.FC = () => {
  const [cars] = useState(getNewColoredCar);
  const [query, setQuery] = useState('');
  const [chosenColor, setChosenColor] = useState('');
  const [chosenPrice, setChosenPrice] = useState('');

  let visibleCars = cars;

  if (query) {
    visibleCars = cars.filter(car => {
      const stringToCheck = `
        ${car.brand}
        ${car.info}
      `;

      return stringToCheck.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (chosenColor) {
    visibleCars = visibleCars.filter(c => c.color?.name === chosenColor);
  }

  if (chosenPrice) {
    visibleCars = visibleCars.filter(c => c.rentPrice <= +chosenPrice)
      || chosenColor[0];
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />

      <select
        onChange={event => setChosenColor(event.target.value)}
        value={chosenColor}
      >
        <option value="">Chose a color</option>
        <option value="white">white</option>
        <option value="black">black</option>
        <option value="red">red</option>
      </select>

      <select
        value={chosenPrice}
        onChange={event => setChosenPrice(event.target.value)}
      >
        <option value="">Chose by price</option>
        <option value="100">less then 100</option>
        <option value="200">less then 200</option>
        <option value="500">less then 500</option>
      </select>

      <table>
        <thead>
          {visibleCars.map(car => (
            <tr>
              <th>{car.id}</th>
              <th>{car.brand}</th>
              <th>{car.info}</th>
              <th style={{ color: car.color?.name }}>{car.color?.name}</th>
              <th>{car.rentPrice}</th>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
};
