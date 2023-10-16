import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

// const SORT_BY = [
//   'Brand',
//   'Id',
//   'Color',
//   'Rent price',
// ];

const cars = carsFromServer.map((car) => {
  const foundColor = colorsFromServer.find(color => car.colorId === color.id)
  || null;

  return {
    ...car,
    color: foundColor?.name,
  };
});

export const App = () => {
  const [query, setQuery] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  let filteredCars = [...cars];

  if (query) {
    filteredCars = filteredCars.filter(car => car.brand.includes(query));
  }

  if (color) {
    filteredCars = filteredCars.filter(car => car.color);
  }

  if (brand) {
    filteredCars = filteredCars.filter(car => car.brand);
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <select>
        <option
          value={brand}
          onChange={(e => {
            setBrand(e.target.value);
          })}
        >
          Choose a Brand
        </option>

        <option
          value={brand}
          onChange={(e => {
            setColor(e.target.value);
          })}
        >
          Choose a Color
        </option>
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
          { filteredCars.map(car => {
            return (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td style={{ color: car.color }}>{car.color}</td>
                <td>{car.rentPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
