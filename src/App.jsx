import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color
const fullCarInfo = carsFromServer.map(car => {
  const color = colorsFromServer.find(colorEl => colorEl.id === car.colorId);

  return {
    ...car,
    color,
  };
});

const filterByName = (query, selectedColor) => {
  let filteredCars = [...fullCarInfo];

  if (query) {
    filteredCars = filteredCars.filter(car => car.brand
      .toLowerCase()
      .includes(query.toLowerCase()));
  }

  if (selectedColor) {
    filteredCars = filteredCars.filter(car => car.color === selectedColor);
  }

  return filteredCars;
};

export const App = () => {
  const [newQuery, setNewQuery] = useState('');
  const [newColor, setNewColor] = useState('');

  const visibleCars = filterByName(newQuery, newColor);

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        onChange={event => setNewQuery(event.target.value)}
        value={newQuery}
      />

      <select onChange={event => setNewColor(event.target.value)}>
        <option value={''}>Chose a color</option>
        {colorsFromServer.map(color => (
          <option
            value={color.name}
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
          {visibleCars.map(car => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: car.color }}>Red</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
