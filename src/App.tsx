import React, { useState, useEffect } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color V
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

type Car = {
  id: number;
  brand: string;
  rentPrice: number;
  colorId: number;
};

export const App: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [brandSearchBy, setBrandSearchBy] = useState('');
  const [carsToShow, setCarsToShow] = useState<Car[]>(carsFromServer);

  const getCarsByColorId = (color: number, carsArr: Car[]) => {
    return carsArr.filter(({ colorId }) => +color === colorId);
  };

  const getCarsByBrand = (queryString: string, carsArr: Car[]) => {
    const query = queryString.toLowerCase().trim();

    return query !== ''
      ? carsArr
        .filter(({ brand }) => brand.toLowerCase().includes(query))
      : carsToShow;
  };

  useEffect(() => {
    const cars = getCarsByColorId(selectedColor, carsToShow);

    setCarsToShow(cars);
  }, [selectedColor]);

  useEffect(() => {
    const cars = getCarsByBrand(brandSearchBy, carsToShow);

    setCarsToShow(cars);
  }, [brandSearchBy]);

  const handleSelectColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { target: { value } } = event;

    setSelectedColor(+value);
  };

  const handleSearchByBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    const castedValue = value.replace(/[^A-Z,a-z]/g, '');

    setBrandSearchBy(castedValue);
  };

  const getColorById = (idToFind: number) => {
    return colorsFromServer.find(({ id }) => id === idToFind)?.name;
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        onChange={handleSearchByBrand}
        value={brandSearchBy}
      />

      <select
        onChange={handleSelectColor}
        value={selectedColor}
      >
        <option
          disabled
          value="0"
        >
          Chose a color
        </option>
        {colorsFromServer.map(({ id, name }) => (
          <option key={id} value={id}>{ name }</option>
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
          {carsToShow.map(({
            id,
            brand,
            rentPrice,
            colorId,
          }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{brand}</td>
              <td
                style={{ color: getColorById(colorId) }}
              >
                {getColorById(colorId)}
              </td>
              <td>{rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
