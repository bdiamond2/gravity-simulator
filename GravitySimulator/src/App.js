import React, { useState } from 'react';
import Canvas from './Canvas'
import Slider from './Slider.js'

function App() {
  const [sliderMass, setSliderMass] = useState(1);

  return (
    <div>
      <Canvas
        newMass={sliderMass}
        width="800"
        height="600"
      />
      <Slider
        sliderValue={sliderMass}
        setSliderValue={setSliderMass}
        min={1} // Provide your minimum value here
        max={1000} // Provide your maximum value here
      />
    </div>
  );
}

export default App;
