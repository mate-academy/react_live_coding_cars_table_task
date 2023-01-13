import React from 'react';
import carsFromServer from './api/cars';
// import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const findCarbyId = (colorId: number) => {
  carsFromServer.find(el => el.id === colorId);
};

const carWithColor = carsFromServer.map(el => ({
  ...el,
  color: findCarbyId(el.colorId),
}));

export const App: React.FC = () => {
  return (
    <div>
      <input type="search" placeholder="Find by car brand" />

      <select>
        <option>Chose a color</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>color</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {carWithColor.map(el => (
            <tr>
              <td>{el.id}</td>
              <td>{el.brand}</td>
              <td style={{ color: 'red' }}>color</td>
              <td>{el.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
