import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const findColorById = (colorId: number | undefined) => {
  return colorsFromServer.find(color => color.id === colorId);
};

const autoWithColor = carsFromServer.map(car => {
  return {
    ...car,
    colorName: findColorById(car.colorId),
  };
});

export const App: React.FC = () => {
  const [autos] = useState(autoWithColor);
  const [searchQuery, setSearchQuery] = useState('');
  const [pickColor, setPickColor] = useState(0);

  const preparedSearchQuery = searchQuery.toLocaleLowerCase();
  const visibleCars = autos.filter(car => (
    car.brand?.toLocaleLowerCase().includes(preparedSearchQuery)));

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />

      <select
        value={pickColor}
        onChange={(event) => setPickColor(+event.target.value)}
      >
        <option value={0}>Chose a color</option>
        {colorsFromServer.map(color => (
          <option
            value={color.id}
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

          {visibleCars.map((car) => {
            return (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td style={{ color: car.colorName?.name }}>
                  {car.colorName?.name}
                </td>
                <td>{car.rentPrice}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
};
