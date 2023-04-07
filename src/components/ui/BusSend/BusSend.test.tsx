import React from 'react';
import { render, screen } from '@testing-library/react';
import { Knob, KnobProps } from 'primereact/knob';
import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton';

import BusSend from './BusSend';
import { BUS_MAX, BUS_MIN, BUS_STEPS, NOMINAL_LEVEL } from '../../../constants/gainValues';
import { COMPONENT_SIZE } from '../../../constants/primeReactSizes';

jest.mock('primereact/knob', () => ({
  Knob: jest.fn()
}));
jest.mock('primereact/togglebutton', () => ({
  ToggleButton: jest.fn()
}));

describe('<BusSend />', () => {
  let mockKnob = Knob as jest.Mock;
  let mockToggleButton = ToggleButton as jest.Mock;

  beforeEach(() => {
    mockKnob.mockReset();
    mockToggleButton.mockReset();
  });

  it("should render a knob with correct props", () => {
    // Arrange
    const value = 50;
    const changeFn = jest.fn();
    const name = "testBus";
    const preFaderChange = jest.fn();
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
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange}/>);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it("should render a bus name", () => {
    // Arrange
    const value = 50;
    const changeFn = jest.fn();
    const preFaderChange = jest.fn();
    const name = "testBus";

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange}/>);
    const nameText = screen.queryByText(name);

    // Assert
    expect(nameText).not.toBeNull();
  });

  it("should render a value label", () => {
    // Arrange
    const value = NOMINAL_LEVEL - 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const preFaderChange = jest.fn();
    const expectedProps = expect.objectContaining({ valueTemplate: '-1dB' });

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange}/>);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a value label with a + for value above nominal", () => {
    // Arrange
    const value = NOMINAL_LEVEL + 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const preFaderChange = jest.fn();
    const expectedProps = expect.objectContaining({ valueTemplate: '+1dB' });

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange} />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should have a value of BUS_MIN if value props is under BUS_MIN", () => {
    // Arrange
    const value = BUS_MIN - 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const preFaderChange = jest.fn();
    const expectedProps = expect.objectContaining({ value: BUS_MIN })

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange}/>);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should have a value of BUS_MAX if value props is above BUS_MAX", () => {
    // Arrange
    const value = BUS_MAX + 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const preFaderChange = jest.fn();
    const expectedProps = expect.objectContaining({ value: BUS_MAX })

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange}/>);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a ToggleButton with correct props", () => {
    // Arrange
    const value = 0;
    const changeFn = jest.fn();
    const name = "testBus";
    const isPre = true;
    const onPreFadeChange = jest.fn();
    const expectedProps: ToggleButtonProps = {
      checked: isPre,
      onChange: onPreFadeChange,
      onLabel: "Pre",
      offLabel: "Pre"
    };

    // Act
    render(
      <BusSend 
        value={value} 
        onChange={changeFn} 
        name={name} 
        isPreFader={isPre} 
        onIsPreFaderChange={onPreFadeChange}
      />
    );

    // Assert
    expect(mockToggleButton).toHaveBeenCalledWith(expectedProps, {});
  });
});