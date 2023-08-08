import React from 'react';

function SliderComponent({ sliderValue, setSliderValue }) {
    function sliderChangeHandler(event) {
        setSliderValue(event.target.value);
    };
}