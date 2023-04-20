import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

import BusSend from "./BusSend";

describe("<BusSend /> - Integration", () => {
  it("should toggle the prefader value when clicked", () => {
    // Arrange
    
    // Act
    render(
      <BusSend 
        id="test"
        name="Test"
        preFaderInput={-12}
        postFaderInput={-24}
      />
    );

    const preFaderBtn = screen.getByRole("button")
    fireEvent.click(preFaderBtn);

    // Assert
    expect(false).toBeTruthy();
    });
});
