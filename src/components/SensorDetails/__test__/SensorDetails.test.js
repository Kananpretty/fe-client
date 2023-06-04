import { fireEvent, render, screen } from "@testing-library/react";
import SensorsDetails from "../SensorsDetails";

const mockedFilterHandler = jest.fn();

const mockedSensorData1 = {
  name: "Tempreture",
  value: "",
  unit: "C degree",
  connected: false,
};

describe("Sensor Connected Details Section", () => {
  it("should render sensor name", () => {
    render(
      <SensorsDetails
        sensorData={mockedSensorData1}
        clickHandler={mockedFilterHandler}
      />
    );
    const sensorName = screen.getByText("Tempreture");
    expect(sensorName).toBeInTheDocument();
  });

  it("should render sensor connect button when connected false", () => {
    render(
      <SensorsDetails
        sensorData={mockedSensorData1}
        clickHandler={mockedFilterHandler}
      />
    );
    const connectButton = screen.getByRole("button", { name: "Connect" });
    expect(connectButton).toBeInTheDocument();
  });
});

