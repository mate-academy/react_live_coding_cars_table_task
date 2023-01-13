import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color +
// 2. Add ability to filter car by brand name +
// 3. Add ability to filter car by color

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  let activeColor = '';

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const cars = carsFromServer.map(car => {
    return {
      ...car,
      color: (colorsFromServer.find(color => color.id === car.colorId))?.name,
    };
  });

  const filterTableColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    activeColor = event.currentTarget.value;
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={handleSetQuery}
      />

      <select value={activeColor} onChange={filterTableColor}>
        <option>Chose a color</option>
        <option>Red</option>
        <option>Black</option>
        <option>White</option>
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
          { query !== ''
            ? cars.map(car => car.brand.includes(query) && (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td style={{ color: car.color }}>{car.color}</td>
                <td>{car.rentPrice}</td>
              </tr>
            ))
            : cars.map(car => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td style={{ color: car.color }}>{car.color}</td>
                <td>{car.rentPrice}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
