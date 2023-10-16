// import React from 'react';
import { useState } from 'react';
// import cn from 'classnames';
// import carsFromServer from './api/cars';
// import colorsFromServer from './api/colors';

import { getVisibileCars } from './components/VisibleCar';
import { cars } from './components/Car';

import Cars from './components/Cars';
import Seach from './components/Seach';
import Color from './components/Colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

// function getColorsById(colorId) {
//   return colorsFromServer.find(color => color.id === colorId) || 'unknown';
// }

// export const cars = carsFromServer.map(car => ({
//   ...car,
//   color: getColorsById(car.colorId),
// }));

// const getVisibileCars = ({
//   transport,
//   selectedCarId,
//   query,
//   selectedColor,
// }) => {
//   let visibleCars = [...transport];

//   if (selectedCarId) {
//     visibleCars = visibleCars.filter(car => (
//       car.color.id === selectedCarId
//     ));
//   }

//   if (query) {
//     const normalizedQuery = query.trim().toLowerCase();

//     visibleCars = visibleCars.filter(car => (
//       car.brand.toLowerCase().includes(normalizedQuery)
//     ));
//   }

//   if (selectedColor) {
//     visibleCars = visibleCars.filter(car => selectedColor === 'All'
//       || car.color.name === selectedColor);
//   }

//   return visibleCars;
// };

export const App = () => {
  const [selectedCarId, setSelectedCarId] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('All');

  const visibleCars = getVisibileCars({
    transport: cars,
    selectedCarId,
    query,
    selectedColor,
  });

  return (
    <div>
      <Seach
        query={query}
        setQuery={setQuery}
      />
      <Color
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <Cars
        cars={visibleCars}
        selectedCarId={selectedCarId}
        setSelectedCarId={setSelectedCarId}
      />
      {/* <input
        type="search"
        placeholder="Find by car brand"
        className="input"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      /> */}

      {/* <select
        value={selectedColor}
        onChange={(event) => {
          setSelectedColor(event.target.value);
        }}
      >
        <option value="All">Chose a color</option>
        {colorsFromServer.map(color => (
          <option
            key={color.id}
            value={color.name}
          >
            {color.name}
          </option>
        ))}
      </select> */}

      {/* <table>
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
            <tr
              key={car.id}
              className={cn({
                'is-active': car.id === selectedCarId,
              })}
              onClick={() => {
                setSelectedCarId(car.id);
              }}
            >
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: `${car.color.name}` }}>{car.color.name}</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};
