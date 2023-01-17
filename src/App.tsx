import React, { useState } from 'react';
import colors from './api/colors';
import carsFromServer from './api/cars';
import { FullCarsList } from './types';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const finColor = (colorId: number) => (
  colors.find(c => c.id === colorId)
);

const getNewColoredCar = (): FullCarsList[] => (
  carsFromServer.map(car => ({
    ...car,
    color: finColor(car.colorId),
  }))
);

export const App: React.FC = () => {
  const [cars] = useState(getNewColoredCar);
  const [query, setQuery] = useState('');
  const [color, setColor] = useState(1);

  let visibleCars = cars;

  if (query) {
    visibleCars = cars.filter(
      car => car.brand.toLowerCase().includes(query.toLowerCase()),
    );
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
        value={color}
        onChange={event => setColor(+event.target.value)}
      >
        <option>Chose a color</option>
      </select>

      <table>
        <thead>
          {visibleCars.map(car => (
            <tr>
              <th>{car.id}</th>
              <th>{car.brand}</th>
              <th style={{ color: car.color?.name }}>{car.color?.name}</th>
              <th>{car.rentPrice}</th>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
};
