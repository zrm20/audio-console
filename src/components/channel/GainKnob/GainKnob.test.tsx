import { render, screen } from "@testing-library/react";
import { Knob, KnobProps } from "primereact/knob";
import { PRE_AMP_MAX_GAIN, PRE_AMP_MIN_GAIN, PRE_AMP_STEPS } from "../../../constants/gainValues";
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
    const value = 12;
    const changeFn = jest.fn();
    const expectedProps: KnobProps = {
      value,
      onChange: changeFn,
      size: COMPONENT_SIZE,
      min: PRE_AMP_MIN_GAIN,
      max: PRE_AMP_MAX_GAIN,
      step: PRE_AMP_STEPS,
      role: "slider"
    };


    // Act
    render(<GainKnob value={value} onChange={changeFn} />);

    // Assert
    expect(Knob).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
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