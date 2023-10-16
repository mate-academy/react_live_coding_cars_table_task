import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const cars = carsFromServer.map(car => {
  const color = colorsFromServer.find(col => col.id === car.colorId);

  return {
    ...car,
    color,
  };
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  // const [colorFilter, setColorFilter] = useState('');
  let visibleCar = cars;

  if (query) {
    const normalizeQuery = query.toLowerCase();

    visibleCar = visibleCar
      .filter(car => car.brand.toLowerCase().includes(normalizeQuery));
  }

  // if (colorFilter) {
  //   visibleCar = visibleCar
  //     .filter(car => car.color?.name === colorFilter);
  // }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      <select>
        <option>Chose a color</option>

        {colorsFromServer.map(color => (
          <option
            key={color.id}
            value={color.name}
            // onChange={(event) => {
            //   setColorFilter(event.target.value);
            // }}
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
          {visibleCar.map(car => (
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
