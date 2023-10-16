export function getVisibileCars({
  transport,
  selectedCarId,
  query,
  selectedColor,
}) {
  let visibleCars = [...transport];

  if (selectedCarId) {
    visibleCars = visibleCars.filter(car => (
      car.color.id === selectedCarId
    ));
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visibleCars = visibleCars.filter(car => (
      car.brand.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (selectedColor) {
    visibleCars = visibleCars.filter(car => selectedColor === 'All'
      || car.color.name === selectedColor);
  }

  return visibleCars;
}
