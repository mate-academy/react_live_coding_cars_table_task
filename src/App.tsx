import React, { useState } from 'react';
import cars from './api/cars';
import { CarWithColor } from './types/car';
import colors from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const preparedCar = (): CarWithColor[] => {
  return cars.map(car => {
    const color = colors.find(c => c.id === car.colorId)

    return {
      ...car,
      color,
    };
  });
};

export const App: React.FC = () => {
  const [cars] = useState(preparedCar);

  return (
    <div>
      <input type="search" placeholder="Find by car brand" />

      <select>
        <option>Chose a color</option>
      </select>

      <table>
        {cars.map(car => (
          <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        ))}

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
