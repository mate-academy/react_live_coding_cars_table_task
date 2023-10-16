import React from 'react';

const CarList = ({ filterCar }) => {
  return (
    <tbody>
      {filterCar.length > 0 ? (
        filterCar.map((car) => {
          const firstLetterColor = car.color.name
            .slice(0, 1)
            .toUpperCase();
          const fullColorName = firstLetterColor + car.color.name.slice(1);

          return (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: car.color.name }}>
                {fullColorName}
              </td>
              <td>{car.rentPrice}</td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td
            colSpan="4"
            style={{ color: 'red' }}
          >
            EMPTY
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default CarList;
