import React from 'react';

function SliderComponent({ sliderValue, setSliderValue, min, max, label }) {
    function sliderChangeHandler(event) {
        setSliderValue(event.target.value);
    };

    return (
        <div>
            <span>{label}: </span>
            <input
                type="range"
                min={min}
                max={max}
                value={sliderValue}
                onChange={sliderChangeHandler}
            />
            <span>{sliderValue}</span>
        </div>
    );
}

export default SliderComponent;