import React from 'react';
import { render } from '@testing-library/react';
import { ProgressBar, ProgressBarProps } from 'primereact/progressbar';

import Meter from './Meter';
import { METER_MAX, METER_MIN, NOMINAL_LEVEL } from '../../../constants/gainValues';

jest.mock('primereact/progressbar', () => ({
  ProgressBar: jest.fn()
}));

describe('<Meter />', () => {
  let mockProgressBar = ProgressBar as jest.Mock;
  beforeEach(() => {
    mockProgressBar.mockReset();
  });

  it("should render a Progress bar with value prop", () => {
    // Arrange
    const value = 50;
    const expectedProps: ProgressBarProps = { value };

    // Act
    render(<Meter value={value} />);

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it("should render green for value equal to nominal", () => {
    // Arrange
    const value = NOMINAL_LEVEL;
    const expectedProps: ProgressBarProps = { color: "green" };

    // Act
    render(<Meter value={value} />);

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it("should render yellow for value above nominal", () => {
    // Arrange
    const value = NOMINAL_LEVEL + 1;
    const expectedProps: ProgressBarProps = { color: "yellow" };

    // Act
    render(<Meter value={value} />);

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it("should render red for value equal to max", () => {
    // Arrange
    const value = METER_MAX;
    const expectedProps: ProgressBarProps = { color: "red" };

    // Act
    render(<Meter value={value} />);

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it("should have have value constrained to minimum", () => {
    // Arrange
    const value = METER_MIN - 1;
    const expectedProps: ProgressBarProps = { value: METER_MIN };

    // Act
    render(<Meter value={value} />);

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it("should have have value constrained to maximum", () => {
    // Arrange
    const value = METER_MAX + 1;
    const expectedProps: ProgressBarProps = { value: METER_MAX };

    // Act
    render(<Meter value={value} />);

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });
});