import React from 'react';
import { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';
import { CarFull } from './types/Types';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color
const fullCar:CarFull[] = carsFromServer.map(car => {
  const color = colorsFromServer.find(colorCar => colorCar.id === car.colorId);

  return {
    ...car,
    color,
  };
});

export const App: React.FC = () => {
  const [carName, setCarName] = useState('');
  const [cars] = useState(fullCar);
  let filteredCarsByName = cars;

  if (carName) {
    filteredCarsByName = cars
      .filter(car => (car.brand.toLowerCase()).includes(carName.toLowerCase()));
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={carName}
        onChange={(event) => setCarName(event.target.value)}
      />

      <select value={0}>
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
          {filteredCarsByName.map(car => (
            <tr>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: car.color?.name }}>{car.color?.name}</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
