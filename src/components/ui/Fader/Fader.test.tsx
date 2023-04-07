import React from 'react';
import { render, screen } from '@testing-library/react';
import { Slider, SliderProps } from 'primereact/slider';

import Fader from './Fader';
import { BUS_MAX, BUS_MIN, FADER_STEPS, NOMINAL_LEVEL } from '../../../constants/gainValues';

jest.mock('primereact/slider', () => (
  {
    Slider: jest.fn()
  }
))


describe('<Fader />', () => {
  let mockSlider = Slider as jest.Mock;

  beforeEach(() => {
    mockSlider.mockReset();
  })

  it("should render a slider with correct props", () => {
    // Arrange
    const value = 50;
    const changeFn = jest.fn();
    const expectedProps: SliderProps = {
      value,
      onChange: changeFn,
      min: BUS_MIN,
      max: BUS_MAX,
      step: FADER_STEPS,
      orientation: "vertical",
      id: 'fader'
    }

    // Act
    render(<Fader value={value} onChange={changeFn} />);

    // Assert
    expect(mockSlider).toHaveBeenLastCalledWith(expectedProps, {})
  });

  it("should render a label with - for number less than nominal", () => {
    // Arrange
    const value = NOMINAL_LEVEL - 1;
    const changeFn = jest.fn();

    // Act
    render(<Fader value={value} onChange={changeFn} />);
    const label = screen.queryByText(`${value - NOMINAL_LEVEL}dB`);

    // Assert
    expect(label).not.toBeNull();
  });

  it("should render a label with + for number more than nominal", () => {
    // Arrange
    const value = NOMINAL_LEVEL + 1;
    const changeFn = jest.fn();

    // Act
    render(<Fader value={value} onChange={changeFn} />);
    const label = screen.queryByText(`+${value - NOMINAL_LEVEL}dB`);

    // Assert
    expect(label).not.toBeNull();
  });

  it("should render a label with neither - or + for number equal to nominal", () => {
    // Arrange
    const value = NOMINAL_LEVEL;
    const changeFn = jest.fn();

    // Act
    render(<Fader value={value} onChange={changeFn} />);
    const label = screen.queryByText(`0dB`);

    // Assert
    expect(label).not.toBeNull();
  });
});