import { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const carsWithColors = carsFromServer.map(car => {
  const color = colorsFromServer
    .find(colorFromServer => colorFromServer.id === car.colorId);

  return ({
    ...car,
    color,
  });
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  let preparedCars = [...carsWithColors];

  if (query) {
    preparedCars = preparedCars.filter(car => (
      car.brand.toLowerCase().includes(query.toLowerCase())
    ));
  }

  if (selectedColor) {
    preparedCars = preparedCars.filter(car => (
      car.colorId === Number(selectedColor)
    ));
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
        onChange={(event) => setSelectedColor(event.target.value)}
      >
        <option>Chose a color</option>
        {
          colorsFromServer.map(color => (
            <option
              key={color.id}
              value={color.id}
            >
              {color.name}
            </option>
          ))
        }
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
          {
            preparedCars.map(car => {
              return (
                <tr>
                  <td>{car.id}</td>
                  <td>{car.brand}</td>
                  <td style={{ color: 'red' }}>{car.color.name}</td>
                  <td>{car.rentPrice}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};
