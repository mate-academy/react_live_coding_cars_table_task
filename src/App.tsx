import React from 'react';

import carsFromServer from './api/cars';

import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const findColorById = (colorId: number | undefined) => {
  return colorsFromServer.find(color => color.id === colorId);
};

const autoWithColor = carsFromServer.map(car => {
  return {
    ...car,
    colorName: findColorById(car.colorId),
  };
});

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

          {autoWithColor.map((car) => {
            return (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td style={{ color: 'red' }}>{car.colorName?.name}</td>
                <td>{car.rentPrice}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
};
