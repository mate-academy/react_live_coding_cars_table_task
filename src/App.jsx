import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';
import CarList from './components/CarList';

const SHOW_FULL_DATA = 'show all';

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
  const filterSymbol = sumbol.trim().toLowerCase();

  const filterCar = currentList.filter(item => item.brand.toLowerCase()
    .includes(filterSymbol));

  // console.log(currentList)

  function chooseCollor(selectedCollorName) {
    const filterColorData = data
      .filter((item) => item.color.name === selectedCollorName);

    if (selectedCollorName === SHOW_FULL_DATA) {
      return setCurrentList(data);
    }

    return setCurrentList(filterColorData);
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
        onChange={(e) => {
          chooseCollor(e.target.value);
        }}
      >
        <option selected disabled>Choose collor</option>
        <option>
          {SHOW_FULL_DATA}
        </option>
        {colorsFromServer.map((item) => (
          <option
            key={item.id}
          >
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
