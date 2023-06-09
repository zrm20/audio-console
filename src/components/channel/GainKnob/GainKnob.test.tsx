import { render, screen } from "@testing-library/react";
import { Knob, KnobProps } from "primereact/knob";
import { PRE_AMP_MAX_GAIN, PRE_AMP_MIN_GAIN } from "../../../constants/busLevels";
import { COMPONENT_SIZE } from "../../../constants/primeReactSizes";

import GainKnob from "./GainKnob";

jest.mock("primereact/knob", () => ({
  Knob: jest.fn()
}));

describe('<GainKnob />', () => {
  let mockKnob = Knob as jest.Mock;
  beforeEach(() => {
    mockKnob.mockReset();
  });

  it("should render a Knob component with correct props", () => {
    // Arrange
    const value = PRE_AMP_MIN_GAIN + 1;
    const changeFn = jest.fn();
    const size = 90;
    const props: KnobProps = {
      value,
      onChange: changeFn,
      size: COMPONENT_SIZE * (size / 100),
      min: PRE_AMP_MIN_GAIN,
      max: PRE_AMP_MAX_GAIN,
      step: 1,
      role: "slider"
    };
    const expectedProps = expect.objectContaining(props);


    // Act
    render(<GainKnob value={value} onChange={changeFn} size={size} />);

    // Assert
    expect(Knob).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should set value to min constant if value is under min pre amp level", () => {
    // Arrange
    const value = PRE_AMP_MIN_GAIN - 1;
    const changeFn = jest.fn();

    // Act
    render(<GainKnob value={value} onChange={changeFn} />);

    // Assert
    expect(Knob).toHaveBeenCalledWith(
      expect.objectContaining(
        { value: PRE_AMP_MIN_GAIN }
      ), {});
  });

  it("should set value to max constant if value is above max pre amp level", () => {
    // Arrange
    const value = PRE_AMP_MAX_GAIN + 1;
    const changeFn = jest.fn();

    // Act
    render(<GainKnob value={value} onChange={changeFn} />);

    // Assert
    expect(Knob).toHaveBeenCalledWith(
      expect.objectContaining(
        { value: PRE_AMP_MAX_GAIN }
      ), {});
  });

  it("should render a label of 'Gain'", () => {
    // Arrange
    const value = PRE_AMP_MAX_GAIN + 1;
    const changeFn = jest.fn();

    // Act
    render(<GainKnob value={value} onChange={changeFn} />);

    // Assert
    expect(screen.queryByText("Gain")).not.toBeNull();
  })
});