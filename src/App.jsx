import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

function getColorById(carId) {
  return colorsFromServer.find((color) => carId === color.id) || null;
}

const cars = carsFromServer.map((car) => ({
  ...car,
  color: getColorById(car.colorId),
}));

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

export const App = () => {
  const [query, setQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const filteredCars = cars.filter((car) => {
    const matchesBrand = car.brand.toLowerCase().includes(query.toLowerCase());
    const matchesColor = !selectedColor || car.color.name === selectedColor;

    return matchesBrand && matchesColor;
  });

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <select
        onChange={(e) => {
          setSelectedColor(e.target.value);
        }}
      >
        <option value="">All</option>
        {colorsFromServer.map((color) => (
          <option key={color.id}>{color.name}</option>
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
          {filteredCars.map(({
            id, brand, color, rentPrice,
          }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{brand}</td>
              <td style={{ color: `${color.name}` }}>{color.name}</td>
              <td>{rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
