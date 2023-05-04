/* eslint-disable no-console */
import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 3. Add ability to filter car by color

const carsWithColors = carsFromServer.map(car => {
  const findColor = colorsFromServer.find(color => (
    color.id === car.colorId
  ));

  return {
    ...car,
    color: findColor,
  };
});

console.log(carsWithColors);

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [carColor, setCarColor] = useState('');

  let vissbleCars = [...carsWithColors];

  if (query) {
    vissbleCars = vissbleCars.filter(car => {
      const lowerQuery = query.toLowerCase();
      const lowerBrand = car.brand.toLowerCase();

      return lowerBrand.includes(lowerQuery);
    });
  }

  console.log(carColor);

  if (carColor.length) {
    vissbleCars = vissbleCars.filter(car => car.color?.name === carColor);
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <select
        value={carColor}
        onChange={(event) => setCarColor(event.target.value)}
      >
        <option disabled value={carColor}>Chose a color</option>
        {colorsFromServer.map(({ id, name }) => (
          <option
            key={id}
          >
            {name}
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
          {vissbleCars.map(({
            id,
            brand,
            rentPrice,
            color,
          }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{brand}</td>
              <td style={{ color: `${color?.name}` }}>{color?.name}</td>
              <td>{rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
