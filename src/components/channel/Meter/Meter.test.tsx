import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from 'primereact/progressbar';

import Meter from './Meter';
import { MIN_DBFS_VALUE } from '../../../constants/audioLevels';
import { DBFS_NOMINAL } from '../../../constants/busLevels';

jest.mock('primereact/progressbar', () => ({
  ProgressBar: jest.fn()
}));

describe('<Meter />', () => {
  let mockProgressBar = ProgressBar as jest.Mock;

  beforeEach(() => {
    mockProgressBar.mockReset();
  });

  it("should render a ProgressBar with percentage value", () => {
    // Arrange
    const input = MIN_DBFS_VALUE / 2;
    const expectedProps = expect.objectContaining({ value: 50 });

    // Act
    render(<Meter signalLevel={input}/>)

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a ProgressBar with value of 0 if signal is MIN_DBFS and green color", () => {
    // Arrange
    const input = MIN_DBFS_VALUE;
    const expectedProps = expect.objectContaining({ value: 0 });

    // Act
    render(<Meter signalLevel={input}/>)

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a ProgressBar with value of 0 if signal is under MIN_DBFS", () => {
    // Arrange
    const input = MIN_DBFS_VALUE - 1;
    const expectedProps = expect.objectContaining({ value: 0 });

    // Act
    render(<Meter signalLevel={input}/>)

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a ProgressBar with percentage value of 100 if signal is 0", () => {
    // Arrange
    const input = 0;
    const expectedProps = expect.objectContaining({ value: 100 });

    // Act
    render(<Meter signalLevel={input}/>)

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a ProgressBar with percentage value of 100 if signal over 0", () => {
    // Arrange
    const input = 1;
    const expectedProps = expect.objectContaining({ value: 100 });

    // Act
    render(<Meter signalLevel={input}/>)

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should have a color of red if percentage value is 100+", () => {
    // Arrange
    const input = 1;
    const expectedProps = expect.objectContaining({ color: 'red' });

    // Act
    render(<Meter signalLevel={input}/>)

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should have a color of yellow if percentage value is above nominal", () => {
    // Arrange
    const input = -50;
    const expectedProps = expect.objectContaining({ color: 'yellow' });

    // Act
    render(<Meter signalLevel={input} nominalLevel={-51}/>)

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should have a color of green if percentage value is equal to nominal", () => {
    // Arrange
    const input = -50;
    const expectedProps = expect.objectContaining({ color: 'green' });

    // Act
    render(<Meter signalLevel={input} nominalLevel={-50}/>)

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should default nominal level to constant", () => {
    // Arrange
    const input = DBFS_NOMINAL + 1;
    const expectedProps = expect.objectContaining({ color: 'yellow' });

    // Act
    render(<Meter signalLevel={input}/>)

    // Assert
    expect(mockProgressBar).toHaveBeenCalledWith(expectedProps, {});
  });

  it("should render a title if passed", () => {
    // Arrange
    const input = DBFS_NOMINAL + 1;
    const title = "test";

    // Act
    render(<Meter signalLevel={input} title={title} />)
    const text = screen.findByAltText(title);

    // Assert
    expect(text).not.toBeNull();
  });

  it("should trim title to 10 chars", () => {
    // Arrange
    const input = DBFS_NOMINAL + 1;
    const title = "0123456789cutoff";
    const shownText = title.slice(0, 10);
    const hiddenText = title.slice(11);

    // Act
    render(<Meter signalLevel={input} title={title} />)
    const shown = screen.queryByText(shownText);
    const hidden = screen.queryByText(hiddenText);

    // Assert
    expect(shown).not.toBeNull();
    expect(hidden).toBeNull();
  });

  it("should show value label", () => {
    // Arrange
    const input = -25;

    // Act
    render(<Meter signalLevel={input} />)
    const valueLabel = screen.queryByText(`${input} dBfs`);

    // Assert
    expect(valueLabel).not.toBeNull();
  });

  it("should show value label of MIN_DBFS for signal below minimum", () => {
    // Arrange
    const input = MIN_DBFS_VALUE - 1;

    // Act
    render(<Meter signalLevel={input} />)
    const valueLabel = screen.queryByText(`${MIN_DBFS_VALUE} dBfs`);

    // Assert
    expect(valueLabel).not.toBeNull();
  });
});
