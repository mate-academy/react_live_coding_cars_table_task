import React, { useState } from 'react';
import { getFullCar } from './helpers';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

export const App: React.FC = () => {
  const [cars] = useState(getFullCar);
  const [query, setQuery] = useState('');
  const [selectedColorId, setSelectedColorId] = useState(0);

  const visibleCars = cars.filter(car => {
    const preparedQuery = query.toLowerCase();
    const isBrandMatch = car.brand.toLowerCase().includes(preparedQuery);

    const isColorMatch = selectedColorId
      ? selectedColorId === car.color?.id
      : true;

    return isBrandMatch && isColorMatch;
  });

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <select
        value={selectedColorId}
        onChange={(event) => {
          setSelectedColorId(+event.target.value);
        }}
      >
        <option value={0} disabled>Chose a color</option>

        {colorsFromServer.map(color => (
          <option value={color.id} key={color.id}>
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
              <td style={{ color: 'red' }}>{car.color?.name}</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
