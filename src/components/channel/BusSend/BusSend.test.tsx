import React from 'react';
import { render, screen } from '@testing-library/react';
import { Knob, KnobProps } from 'primereact/knob';
import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton';

import BusSend from './BusSend';
import { COMPONENT_SIZE } from '../../../constants/primeReactSizes';
import { BUS_MAX_GAIN, BUS_MIN_GAIN } from '../../../constants/busLevels';
import { MIN_DBFS_VALUE } from '../../../constants/audioLevels';

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
    const value = 0;
    const changeFn = jest.fn();
    const name = "testBus";
    const preFaderChange = jest.fn();

    const valueShift = 0 - BUS_MIN_GAIN;
    const knobProps: KnobProps = {
      value: value + valueShift,
      min: 0,
      max: BUS_MAX_GAIN + valueShift,
      role: "slider",
      size: COMPONENT_SIZE,
      id: `bus-${name}`,
    };
    const expectedProps = expect.objectContaining(knobProps);

    // Act
    render(
      <BusSend
        value={value}
        onChange={changeFn}
        name={name}
        isPreFader
        onIsPreFaderChange={preFaderChange}
      />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a bus name", () => {
    // Arrange
    const value = 50;
    const changeFn = jest.fn();
    const preFaderChange = jest.fn();
    const name = "testBus";

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange} />);
    const nameText = screen.queryByText(name);

    // Assert
    expect(nameText).not.toBeNull();
  });

  it("should render a value label", () => {
    // Arrange
    const value = BUS_MIN_GAIN + 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const preFaderChange = jest.fn();
    const expectedProps = expect.objectContaining({ valueTemplate: `${value}dB` });

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange} />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a value label with a + for positive gain value", () => {
    // Arrange
    const value = BUS_MAX_GAIN - 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const preFaderChange = jest.fn();
    const expectedProps = expect.objectContaining({ valueTemplate: `+${value}dB` });

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange} />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should have a value of 0 if value props is under BUS_MIN", () => {
    // Arrange
    const value = BUS_MIN_GAIN - 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const preFaderChange = jest.fn();

    const expectedProps = expect.objectContaining({ value: 0 })

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange} />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should have a value of BUS_MAX_GAIN if value props is above shifted max gain", () => {
    // Arrange
    const value = BUS_MAX_GAIN + 1;
    const changeFn = jest.fn();
    const name = "testBus";
    const preFaderChange = jest.fn();

    const valueShift = 0 - BUS_MIN_GAIN;

    const expectedProps = expect.objectContaining({ value: BUS_MAX_GAIN + valueShift });

    // Act
    render(<BusSend value={value} onChange={changeFn} name={name} isPreFader onIsPreFaderChange={preFaderChange} />);

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

  it("should show label of -∞ if value is MIN_DBFS_VALUE", () => {
    // Arrange
    const value = MIN_DBFS_VALUE;
    const changeFn = jest.fn();
    const name = "testBus";
    const isPre = true;
    const onPreFadeChange = jest.fn();

    const expectedProps = expect.objectContaining({ valueTemplate: '-∞'})

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
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});

  });
});