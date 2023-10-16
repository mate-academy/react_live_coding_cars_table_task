import cn from 'classnames';

const Cars = ({ cars, selectedCarId, setSelectedCarId }) => (
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
      {cars.map(car => (
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
          <td style={{ color: `${car.color.name}` }}>
            {car.color.name.charAt(0).toUpperCase() + car.color.name.slice(1)}
          </td>
          <td>{car.rentPrice}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Cars;
