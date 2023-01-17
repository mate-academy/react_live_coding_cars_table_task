import React, { useState } from 'react';
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
  const [colorNumber, setColorNumber] = useState(0);
  const [cars] = useState(fullCar);
  let filteredCarsByName = cars;

  if (carName) {
    filteredCarsByName = cars
      .filter(car => (car.brand.toLowerCase()).includes(carName.toLowerCase()));
  }

  if (colorNumber !== 0) {
    filteredCarsByName = cars.filter(car => car.color?.id === colorNumber);
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={carName}
        onChange={(event) => setCarName(event.target.value)}
      />

      <select
        value={colorNumber}
        onChange={(event) => setColorNumber(+event.target.value)}
      >
        <option defaultValue={0} disabled>Chose a color</option>
        {colorsFromServer.map(color => (
          <option
            value={color.id}
            key={color.id}
          >
            {color.name}
          </option>
        ))}
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
            <tr key={car.id}>
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
