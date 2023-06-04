import {  render, screen } from "@testing-library/react";
import ToggleButton from "../ToggleButton";

const mockedFilterHandler = jest.fn();

describe("Header Section", () => {
  it("should render toggle switch as checkbox", () => {
    render(
      <ToggleButton
        toggleLabels={["Show All", "Show Connected"]}
        selectedValue={true}
        onFilterHandler={mockedFilterHandler}
      />
    );
    const checkBoxSwitch = screen.getByRole("checkbox");
    expect(checkBoxSwitch).toBeInTheDocument();
  });

  it("should render show all label", () => {
    render(
      <ToggleButton
        toggleLabels={["Show All", "Show Connected"]}
        selectedValue={true}
        onFilterHandler={mockedFilterHandler}
      />
    );
    const checkBoxSwitch = screen.getByText("Show All");
    expect(checkBoxSwitch).toBeInTheDocument();
  });

  it("should render show conencted label", () => {
    render(
      <ToggleButton
        toggleLabels={["Show All", "Show Connected"]}
        selectedValue={true}
        onFilterHandler={mockedFilterHandler}
      />
    );
    const checkBoxSwitch = screen.getByText("Show Connected");
    expect(checkBoxSwitch).toBeInTheDocument();
  });
});
