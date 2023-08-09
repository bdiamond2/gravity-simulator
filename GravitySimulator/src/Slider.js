import React from 'react';

function SliderComponent({ sliderValue, setSliderValue, min, max }) {
    function sliderChangeHandler(event) {
        setSliderValue(event.target.value);
    };

    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={sliderValue}
                onChange={sliderChangeHandler}
            />
            <p>{sliderValue}</p>
        </div>
    );
}

export default SliderComponent;