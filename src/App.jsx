import { useState } from 'react';
import { getVisibileCars } from './components/VisibleCar';
import { cars } from './components/Car';

import Cars from './components/Cars';
import Seach from './components/Seach';
import Color from './components/Colors';

export const App = () => {
  const [selectedCarId, setSelectedCarId] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('All');

  const visibleCars = getVisibileCars({
    transport: cars,
    selectedCarId,
    query,
    selectedColor,
  });

  return (
    <div>
      <Seach
        query={query}
        setQuery={setQuery}
      />
      <Color
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <Cars
        cars={visibleCars}
        selectedCarId={selectedCarId}
        setSelectedCarId={setSelectedCarId}
      />
    </div>
  );
};
