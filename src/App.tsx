import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';
import 'bulma/css/bulma.css';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const findCarbyId = (id: number) => (
  colorsFromServer.find(el => el.id === id)
);

const carWithColor = carsFromServer.map(el => ({
  ...el,
  color: findCarbyId(el.colorId),
}));

export const App: React.FC = () => {
  const [query, setQuery] = useState('');

  const [pickAColor, setPickAColor] = useState(0);

  const handleReset = () => {
    setQuery('');
    setPickAColor(0)
  }
  const shouldRestButton = query || pickAColor > 0;

  let visibleCars = carWithColor;

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visibleCars = carWithColor.filter(el => {
      const stringToCheck = el.brand;

      return stringToCheck.toLocaleLowerCase().includes(lowerQuery);
    });
  }

  if (pickAColor > 0) {
    visibleCars = carWithColor.filter(el => el.colorId === pickAColor);
  }

  return (
    <div>
      <input
        className="input is-primary"
        style={{ width: 'max-content', margin: '0 20px'}}
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={el => setQuery(el.target.value)}
      />

      <select
        className="input is-primary"
        style={{ width: 'max-content', margin: '0 20px' }}
        onChange={(el) => setPickAColor(+el.target.value)}
        value={pickAColor}
      >
        <option value={0}>Chose a color</option>
        {colorsFromServer.map(el => (
          // eslint-disable-next-line
          <option
            value={el.id}
            key={el.id}
          >
            {el.name}
          </option>))}
      </select>

      {shouldRestButton && (
        <button
          className="button is-danger"
          type="button"
          onClick={handleReset}
          style={{ margin: '0 10px' }}
        >
          Reset
        </button>)}

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
          {visibleCars.map(el => (
            <tr>
              <td>{el.id}</td>
              <td>{el.brand}</td>
              <td style={{ color: `${el.color?.name}` }}>{el.color?.name}</td>
              <td>{el.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
