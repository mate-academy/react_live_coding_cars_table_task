import React from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';
import { CarWithColor } from './types';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCarsWithColor = (): CarWithColor[] => (
  carsFromServer.map(car => {
    const color = colorsFromServer.find(oneColor => (
      car.colorId === oneColor.id
    ));

    return {
      ...car,
      color,
    };
  })
);

export const App: React.FC = () => {
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
          <tr>
            <td>1</td>
            <td>Ferarri</td>
            <td style={{ color: 'red' }}>Red</td>
            <td>500</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Opel</td>
            <td style={{ color: 'white' }}>White</td>
            <td>300</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Audi</td>
            <td style={{ color: 'black' }}>Black</td>
            <td>300</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
