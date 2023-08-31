import React, { useState } from 'react';
import Canvas from './Canvas'
import Slider from './Slider'

function App() {
  const [sliderMass, setSliderMass] = useState(1);
  const [sliderVel, setSliderVel] = useState(2);

  return (
    <div>
      <Canvas
        newMass={sliderMass}
        newVel={sliderVel}
        width="800"
        height="600"
      />
      <Slider
        label='Mass'
        sliderValue={sliderMass}
        setSliderValue={setSliderMass}
        min={1} // Provide your minimum value here
        max={1000} // Provide your maximum value here
      />
      <Slider
        label='Horizontal Velocity'
        sliderValue={sliderVel}
        setSliderValue={setSliderVel}
        min={-10} // Provide your minimum value here
        max={10} // Provide your maximum value here
      />
    </div>
  );
}

export default App;
