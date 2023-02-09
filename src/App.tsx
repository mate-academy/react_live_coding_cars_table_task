import React, { useState } from 'react';
// import cars from './api/cars';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const carsWithColor = carsFromServer.map(car => {
  const colors = colorsFromServer.find(color => color.id === car.colorId);

  return { ...car, colors };
});

export const App: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  // const [colorId, setColorId] = useState(0);

  let filteredCars = [...carsWithColor];
  const correctBrandName = brandName;

  if (correctBrandName) {
    filteredCars = filteredCars.filter(
      b => b.brand.includes(correctBrandName),
    );
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={brandName}
        onChange={(event) => setBrandName(event.target.value)}
      />

      <select>
        <option>
          Chose a color
        </option>
        {colorsFromServer.map(color => (
          <option>
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
          {filteredCars.map(car => (
            <tr>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: `${car.colors?.name}` }}>{car.colors?.name}</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
