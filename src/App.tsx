import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const prepearedCars = carsFromServer.map(car => {
  const color = colorsFromServer.find(c => c.id === car.colorId);

  return ({
    ...car,
    color,
  }

  );
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedColorId, setSelectedColorId] = useState(0);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => (
    setQuery(event.target.value)
  );
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => (
    setSelectedColorId(+event.target.value)
  )

  let visibleCars = [...prepearedCars];

  if (query) {
    visibleCars = visibleCars.filter(car => {
      const { brand } = car;
      const normalizeBrand = brand.toLowerCase();

      return (
        normalizeBrand.includes(query.toLowerCase())
      );
    });
  }

  if (selectedColorId) {
    visibleCars = visibleCars.filter(car => car.colorId === selectedColorId);
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={handleInput}
      />

      <select
        value={selectedColorId}
        onChange={handleSelect}
      >
        <option>Chose a color</option>
        {colorsFromServer.map(color => (
          <option
            key={color.id}
            value={color.id}
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
              <td style={{ color: `${car.color?.name}` }}>{car.color?.name}</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
