export const Colors = ({
  colorsFromServer,
  setCarColor,
}) => (
  <select
    onChange={(event) => {
      setCarColor(event.target.value);
    }}
  >
    <option value="">
      Chose a color
    </option>
    {colorsFromServer.map(color => {
      const { name, id } = color;

      return (
        <option
          key={id}
          value={name}
        >
          {name.replace(name[0], name[0].toUpperCase())}
        </option>
      );
    })}
  </select>
);
