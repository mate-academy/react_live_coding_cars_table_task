const Seach = ({ query, setQuery }) => (
  <input
    type="search"
    placeholder="Find by car brand"
    className="input"
    value={query}
    onChange={(event) => {
      setQuery(event.target.value);
    }}
  />
);

export default Seach;
