import { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';
import { Cars } from './components/Cars';
import { Colors } from './components/Colors';

function findColor(colorId) {
  return colorsFromServer.find(color => color.id === colorId) || 'unknown';
}

const cars = carsFromServer.map((car) => {
  return {
    ...car,
    color: findColor(car.colorId).name,
  };
});

const TABLE_ROW = ['Id', 'Brand', 'Color', 'Rent Price'];

function sortByValue(initialCars, brandName, color) {
  let sortCars = initialCars;

  if (brandName) {
    sortCars = sortCars.filter(car => car.brand.toLowerCase()
      .includes(brandName.trim().toLowerCase()));
  }

  if (color) {
    sortCars = sortCars.filter(car => car.color === color);
  }

  return sortCars;
}

export const App = () => {
  const [brandName, setBrandName] = useState('');
  const [carColor, setCarColor] = useState('');
  const sortedCars = sortByValue(cars, brandName, carColor);

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        onChange={(event) => {
          setBrandName(event.target.value);
        }}
      />

      <Colors
        colorsFromServer={colorsFromServer}
        setCarColor={setCarColor}
      />

      <Cars
        sortedCars={sortedCars}
        rowHeadings={TABLE_ROW}
      />
    </div>
  );
};
