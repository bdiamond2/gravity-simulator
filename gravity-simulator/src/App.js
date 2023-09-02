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
      <table>
        <tr>
          <td>Mass</td>
          <td>
            <Slider
              sliderValue={sliderMass}
              setSliderValue={setSliderMass}
              min={1}
              max={1000}
            />
          </td>
        </tr>
        <tr>
          <td>X-Velocity</td>
          <td>
            <Slider
              sliderValue={sliderVel}
              setSliderValue={setSliderVel}
              min={-10}
              max={10}
            />
          </td>
        </tr>
        <tr>
          <td>Scale</td>
          <td>
            <Slider
              sliderValue={sliderScale}
              setSliderValue={setSliderScale}
              min='0.1'
              max='1'
              step='0.01'
            />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
