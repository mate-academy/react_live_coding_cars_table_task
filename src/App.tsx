import React, { useState } from 'react';

import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

import { CarsWithColor } from './types/types';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const getCarsWithColors = (): CarsWithColor[] => {
  return carsFromServer.map(car => ({
    ...car,
    color: colorsFromServer
      .find(color => color.id === carsFromServer.colorId) || null,
  }));
};

export const App: React.FC = () => {
  const [cars] = useState(getCarsWithColors());

  return (
    <div>
      <input type="search" placeholder="Find by car brand" />

      <select>
        <option>Chose a color</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr>
              <td>
                {car.id}
              </td>

              <td>
                {car.brand}
              </td>

              <td>
                {car.color}
              </td>

              <td>
                {car.rentPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
