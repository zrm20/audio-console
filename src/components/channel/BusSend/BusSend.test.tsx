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
  const valueOffset = 0 - BUS_MIN_GAIN;
  const busOffsetMax = BUS_MAX_GAIN + valueOffset;

  beforeEach(() => {
    mockKnob.mockReset();
    mockToggleButton.mockReset();
  });

  it("should render a knob with correct props", () => {
    // Arrange
    const requiredInputProps = {
      id: "test",
      name: "Test",
      preFaderInput: -12,
      postFaderInput: -24,
    };

    const knobProps: KnobProps = {
      value: 0,
      role: "slider",
      min: 0,
      max: busOffsetMax,
      step: 1,
      size: COMPONENT_SIZE,
      id: requiredInputProps.id
    };
    const expectedProps = expect.objectContaining(knobProps);

    // Act
    render(
      <BusSend
        {...requiredInputProps}
      />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a bus name", () => {
    // Arrange
    const requiredInputProps = {
      id: "test",
      name: "Test",
      preFaderInput: -12,
      postFaderInput: -24,
    };

    // Act
    render(
      <BusSend {...requiredInputProps} />
    );
    const nameText = screen.queryByText(requiredInputProps.name);

    // Assert
    expect(nameText).not.toBeNull();
  });

  it("should render a ToggleButton with correct props, initial state of false", () => {
    // Arrange
    const requiredInputProps = {
      id: "test",
      name: "Test",
      preFaderInput: -12,
      postFaderInput: -24,
    };

    const props: ToggleButtonProps = {
      onLabel: "Pre",
      offLabel: "Pre",
      checked: false
    };
    const expectedProps = expect.objectContaining(props);

    // Act
    render(<BusSend {...requiredInputProps} />);

    // Assert
    expect(mockToggleButton).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should pass initialSendLevel value to useState", () => {
    // Arrange
    const requiredInputProps = {
      id: "test",
      name: "Test",
      preFaderInput: -12,
      postFaderInput: -24,
    };
    const initialSendLevel = BUS_MIN_GAIN + 1;
    const expectedKnobValue = initialSendLevel + valueOffset;

    // Act
    render(<BusSend {...requiredInputProps} initialSendLevel={initialSendLevel} />);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(
      expect.objectContaining({ value: expectedKnobValue }),
      {}
    );
  });

  it("should pass initialPreFader to useState", () => {
    // Arrange
    const requiredInputProps = {
      id: "test",
      name: "Test",
      preFaderInput: -12,
      postFaderInput: -24,
    };

    // Act
    render(<BusSend {...requiredInputProps} initialPreFader />);

    // Assert
    expect(mockToggleButton).toHaveBeenCalledWith(
      expect.objectContaining({ checked: true }),
      {}
    );
  });

  it("should show a sendValue label", () => {
    // Arrange
    const requiredInputProps = {
      id: "test",
      name: "Test",
      preFaderInput: -12,
      postFaderInput: -24,
    };
    const initialSendLevel = -12;
    const expectedProps = expect.objectContaining({ valueTemplate: `${initialSendLevel}dB`})

    // Act
    render(<BusSend {...requiredInputProps} initialSendLevel={initialSendLevel}/>);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should show a sendValue label with + value for sendLevel above 0", () => {
    // Arrange
    const requiredInputProps = {
      id: "test",
      name: "Test",
      preFaderInput: -12,
      postFaderInput: -24,
    };
    const initialSendLevel = 6;
    const expectedProps = expect.objectContaining({ valueTemplate: `+${initialSendLevel}dB`})

    // Act
    render(<BusSend {...requiredInputProps} initialSendLevel={initialSendLevel}/>);

    // Assert
    expect(mockKnob).toHaveBeenCalledWith(expectedProps, {});
  });
});