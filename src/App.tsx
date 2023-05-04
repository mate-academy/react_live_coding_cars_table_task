import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const cars = carsFromServer.map(car => {
  const color = colorsFromServer.find(c => c.id === car.colorId);

  return {
    ...car,
    color,
  };
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectCarByColor, setSelectCarByColor] = useState('');

  let visibleCar = [...cars];

  if (query) {
    visibleCar = visibleCar.filter(car => (
      car.brand.toLowerCase().includes(query.toLowerCase())
    ));
  }

  if (selectCarByColor) {
    visibleCar = visibleCar.filter(car => (car.color?.id === car.colorId));
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
        value={selectCarByColor}
        onChange={(event) => setSelectCarByColor(event.target.value)}
      >
        {colorsFromServer.map(({ id, name }) => (
          <option key={id}>{name}</option>
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
          {visibleCar.map(({
            id, brand, color, rentPrice,
          }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{brand}</td>
              <td style={{ color: 'red' }}>{color?.name}</td>
              <td>{rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
