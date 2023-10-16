import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';
import CarList from './components/CarList';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

export const App = () => {
  function findCollors(colorId) {
    return colorsFromServer.find(color => color.id === colorId);
  }

  const data = carsFromServer.map((item) => {
    return ({
      ...item,
      color: findCollors(item.colorId),
    });
  });

  const [currentList, setCurrentList] = useState(data);
  const [sumbol, setSumbol] = useState('');
  const filtetSybol = sumbol.trim().toLowerCase();

  const filterCar = currentList.filter(item => item.brand.toLowerCase()
    .includes(filtetSybol));

  function chooseCollor(selectedCollorId) {
    return currentList.filter((item) => item.colorId === selectedCollorId);
  }

  return (
    <div>
      <input
        value={sumbol}
        type="search"
        placeholder="Find by car brand"
        onChange={(event) => setSumbol(event.target.value)}
      />

      <select
        onChange={() => {
          setCurrentList((event) => chooseCollor(event.target.value));
        }}
      >
        <option selected disabled>Choose collor</option>
        {colorsFromServer.map((item) => (
          <option>
            {item.name}
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
        <CarList filterCar={filterCar} />
      </table>
    </div>
  );
};
