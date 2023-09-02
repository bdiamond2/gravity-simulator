import React, { useState } from 'react';
import Canvas from './Canvas'
import Slider from './Slider'

function App() {
  const [sliderMass, setSliderMass] = useState(1);
  const [sliderVel, setSliderVel] = useState(2);
  const [sliderScale, setSliderScale] = useState(1);

  return (
    <div>
      <Canvas
        sliderVals={{
          mass: sliderMass,
          velocity: sliderVel,
          scale: sliderScale
        }}
        width="800"
        height="600"
      />
      <Slider
        label='Mass'
        sliderValue={sliderMass}
        setSliderValue={setSliderMass}
        min={1}
        max={1000}
      />
      <Slider
        label='Horizontal Velocity'
        sliderValue={sliderVel}
        setSliderValue={setSliderVel}
        min={-10}
        max={10}
      />
      <Slider
        label='Scale'
        sliderValue={sliderScale}
        setSliderValue={setSliderScale}
        min='0'
        max='5'
        step='0.1'
      />
    </div>
  );
}

export default App;
