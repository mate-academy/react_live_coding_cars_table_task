import React, { useState } from 'react';
// import { Car, Color } from './types/types';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const mergedArrays = carsFromServer.map(item => {
  return {
    ...item,
    color: colorsFromServer.find(color => color.id === item.colorId),
  };
});

export const App: React.FC = () => {
  const [color, setColor] = useState('');
  const [inputValue, setInputValue] = useState('');

  let filterByBrand = mergedArrays.filter(({ brand }) => brand.toLowerCase()
    .includes(inputValue.toLowerCase()));

  if (color) {
    filterByBrand = filterByBrand.filter(item => item.color?.name === color);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(event.target.value);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={inputValue}
        onChange={handleChange}
      />

      <select value={color} onChange={handleColorChange}>
        <option value="">Chose a color</option>
        {colorsFromServer.map((item) => (
          <option key={item.id} value={item.name}>{item.name}</option>
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
          {filterByBrand.map(car => (
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
