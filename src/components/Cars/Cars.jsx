export const Cars = ({ sortedCars, rowHeadings }) => (
  <table>
    <thead>
      <tr>
        {rowHeadings.map(heading => (
          <th key={heading}>
            {heading}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {sortedCars.map(car => {
        const {
          id,
          brand,
          rentPrice,
          color,
        } = car;

        return (
          <tr key={id}>
            <td>
              {id}
            </td>

            <td>
              {brand}
            </td>

            <td style={{ color }}>
              {color.replace(color[0], color[0].toUpperCase())}
            </td>

            <td>
              {rentPrice}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
