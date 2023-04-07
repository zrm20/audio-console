import React from 'react';
import { render, screen } from '@testing-library/react';
import { Knob, KnobProps } from 'primereact/knob';

import BusSend from './BusSend';
import { BUS_MAX, BUS_MIN, BUS_STEPS, NOMINAL_LEVEL } from '../../../constants/gainValues';
import { COMPONENT_SIZE } from '../../../constants/primeReactSizes';

jest.mock('primereact/knob', () => ({
  Knob: jest.fn()
}))

describe('<BusSend />', () => {
  let mockKnob = Knob as jest.Mock;
  beforeEach(() => {
    mockKnob.mockReset();
  });

  it("should render a knob with correct props", () => {
    // Arrange
    const value = 50;
    const changeFn = jest.fn();
    const name = "testBus";
    const expectedProps: KnobProps = {
      value,
      onChange: changeFn,
      min: BUS_MIN,
      max: BUS_MAX,
      step: BUS_STEPS,
      role: "slider",
      size: COMPONENT_SIZE,
      id: `bus-${name}`,
    };

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it("should render a bus name", () => {
    // Arrange
    const value = 50;
    const changeFn = jest.fn();
    const name = "testBus";

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} />);
    const nameText = screen.queryByText(name);

    // Assert
    expect(nameText).not.toBeNull();
  });

  it("should render a value label", () => {
    // Arrange
    const value = NOMINAL_LEVEL - 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const expectedProps = expect.objectContaining({ valueTemplate: '-1dB' });

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a value label with a + for value above nominal", () => {
    // Arrange
    const value = NOMINAL_LEVEL + 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const expectedProps = expect.objectContaining({ valueTemplate: '+1dB' });

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should have a value of BUS_MIN if value props is under BUS_MIN", () => {
    // Arrange
    const value = BUS_MIN - 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const expectedProps = expect.objectContaining({ value: BUS_MIN })

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should have a value of BUS_MAX if value props is above BUS_MAX", () => {
    // Arrange
    const value = BUS_MAX + 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const expectedProps = expect.objectContaining({ value: BUS_MAX })

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });
});