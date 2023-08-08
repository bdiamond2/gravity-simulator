import React, { useContext, useState } from 'react';
import Canvas from './Canvas'

function App() {
  const [sliderMass, setSliderMass] = useContext(1);

  return (
    <div>
      <Canvas width="800" height="600" />
    </div>
  );
}

export default App;
