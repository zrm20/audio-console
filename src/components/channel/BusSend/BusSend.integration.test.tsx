import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import 'jest-canvas-mock';

import BusSend from "./BusSend";

describe("<BusSend /> - Integration", () => {
  it("should call onChange when the Pre button is clicked", () => {
    // Arrange
    const onChange = jest.fn();
    
    // Act
    render(
      <BusSend 
        name="Test"
        id="test"
        value={0}
        isPreFader
        onChange={onChange}
      />
    );

    const preFaderBtn = screen.getByText("Pre");
    fireEvent.click(preFaderBtn);

    // Assert
    expect(onChange).toHaveBeenCalled();
  });
});