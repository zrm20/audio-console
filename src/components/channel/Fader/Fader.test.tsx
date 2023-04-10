import React from 'react';
import { render, screen } from '@testing-library/react';
import { Slider, SliderProps } from 'primereact/slider';

import Fader from './Fader';
import { BUS_MAX_GAIN, BUS_MIN_GAIN } from '../../../constants/busLevels';

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

  it("should render a Slider component with correct props", () => {
    // Arrange
    const value = 0;
    const onChange = jest.fn();
    const sliderProps: SliderProps = {
      value,
      onChange,
      orientation: "vertical",
      min: BUS_MIN_GAIN,
      max: BUS_MAX_GAIN,
      id: "fader"
    };
    const expectedProps = expect.objectContaining(sliderProps);

    // Act
    render(<Fader value={value} onChange={onChange} />);

    // Assert
    expect(mockSlider).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should use a value of BUS_MAX_GAIN if value is above max", () => {
    // Arrange
    const value = BUS_MAX_GAIN + 1;
    const onChange = jest.fn();
    const sliderProps: SliderProps = {
      value: BUS_MAX_GAIN
    };
    const expectedProps = expect.objectContaining(sliderProps);

    // Act
    render(<Fader value={value} onChange={onChange} />);

    // Assert
    expect(mockSlider).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should use a value of BUS_MIN_GAIN if value is below min", () => {
    // Arrange
    const value = BUS_MIN_GAIN - 1;
    const onChange = jest.fn();
    const sliderProps: SliderProps = {
      value: BUS_MIN_GAIN
    };
    const expectedProps = expect.objectContaining(sliderProps);

    // Act
    render(<Fader value={value} onChange={onChange} />);

    // Assert
    expect(mockSlider).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a label containing the value", () => {
    // Arrange
    const value = BUS_MIN_GAIN + 1;
    const onChange = jest.fn();

    // Act
    render(<Fader value={value} onChange={onChange} />);
    const label = screen.queryByText(`${value}dB`)

    // Assert
    expect(label).not.toBeNull();
  });

  it("should render a label with a + for positive gain", () => {
    // Arrange
    const value = BUS_MAX_GAIN;
    const onChange = jest.fn();

    // Act
    render(<Fader value={value} onChange={onChange} />);
    const label = screen.queryByText(`+${value}dB`)

    // Assert
    expect(label).not.toBeNull();
  });
});