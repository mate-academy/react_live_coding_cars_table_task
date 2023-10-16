import colorsFromServer from '../api/colors';

const Color = ({ selectedColor, setSelectedColor }) => (
  <select
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
  </select>
);

export default Color;
