import { render, screen } from "@testing-library/react";
import { Knob } from "primereact/knob";
import { PRE_AMP_MAX_GAIN, PRE_AMP_MIN_GAIN, PRE_AMP_STEPS } from "../../../constants/gainValues";
import { COMPONENT_SIZE } from "../../../constants/primeReactSizes";

import GainKnob from "./GainKnob";
import useStyles from "./GainKnob.styles";


jest.mock("primereact/knob", () => {
  return {
    Knob: jest.fn()
  }
});

jest.mock("./GainKnob.styles.ts", () => (jest.fn()));

describe('<GainKnob />', () => {
  beforeEach(() => {
    const mockUseStyles = useStyles as jest.Mock;
    mockUseStyles.mockReturnValue({ root: {} })
  });

  it("should render a Knob component with value, and other props", () => {
    const value = 12;
    const changeFn = jest.fn();

    render(<GainKnob value={value} onChange={changeFn} />);
    expect(Knob).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          value: value,
          onChange: changeFn,
          size: COMPONENT_SIZE,
          min: PRE_AMP_MIN_GAIN,
          max: PRE_AMP_MAX_GAIN,
          step: PRE_AMP_STEPS,
          valueTemplate: `+${value}dB`
        }
      ),
      {}
    );
  });

  it("should set value to min constant if value is under min constant", () => {
    const value = PRE_AMP_MIN_GAIN - 1;
    const changeFn = jest.fn();

    render(<GainKnob value={value} onChange={changeFn} />);
    expect(Knob).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          value: PRE_AMP_MIN_GAIN,
        }
      ),
      {}
    );
  });

  it("should set value to max constant if value is above max constant", () => {
    const value = PRE_AMP_MAX_GAIN + 1;
    const changeFn = jest.fn();

    render(<GainKnob value={value} onChange={changeFn} />);
    expect(Knob).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          value: PRE_AMP_MAX_GAIN,
        }
      ),
      {}
    );
  });

  it("should render a label of 'Gain'", () => {
    const value = PRE_AMP_MAX_GAIN + 1;
    const changeFn = jest.fn();

    render(<GainKnob value={value} onChange={changeFn} />);

    expect(screen.queryByText("Gain")).not.toBeNull();
  })
});