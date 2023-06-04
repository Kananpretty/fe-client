import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import SensorDetails from "./components/SensorDetails/SensorsDetails";
import ToggleButton from "./components/ToggleButton/ToggleButton";
import "./App.css";

function App() {
  const websocketObj = useRef(null);
  const [sensors, setSensors] = useState([]);
  const [filteredSensors, setFilteredSensors] = useState(true);

  useEffect(() => {
    console.log("opening Socket");
    websocketObj.current = new WebSocket("ws://localhost:5000");
    websocketObj.current.onopen = (event) => {
      console.log("Connected");
    };

    websocketObj.current.onclose = (event) => {
      console.log("Disconnected");
    };

    return () => {
      websocketObj.current.close();
      setSensors([]);
    };
  }, []);

  useEffect(() => {
    if (!websocketObj.current) return;
    websocketObj.current.onmessage = (event) => {
      onMessage(event);
    };
  }, [websocketObj]);

  const onMessage = (message) => {
    try {
      const sensorData = JSON.parse(message?.data);

      if (sensorData && Array.isArray(sensors)) {
        const { id, connected, value } = sensorData;
        const updatedSensors = sensors;
        const existingSensorIndex = updatedSensors.findIndex(
          (sensor) => parseInt(sensor.id) === parseInt(id)
        );

        if (existingSensorIndex !== -1) {
          updatedSensors[existingSensorIndex] = {
            ...updatedSensors[existingSensorIndex],
            connected,
            value,
          };
        } else {
          updatedSensors.push(sensorData);
        }

        setSensors([...updatedSensors]);
      }
    } catch (err) {
      // Handle the error appropriately (e.g., show an error message to the user)
      console.error("Error processing sensor data:", err);
    }
  };

  const handleConnectedButton = (e, sensorId) => {
    websocketObj.current.send(
      JSON.stringify({ command: e.target.value.toLowerCase(), id: sensorId })
    );
  };

  const handleFilterToggle = (e) => {
    setFilteredSensors(!filteredSensors);
  };

  const memoizedToggleButton = () => {
    return (
      <ToggleButton
        toggleLabels={["Show Connected", "Show All"]}
        selectedValue={filteredSensors}
        onFilterHandler={handleFilterToggle}></ToggleButton>
    );
    // eslint-disable-next-line
  };

  const memoizedSensorList = () => {
    return sensors.map((sensor) => {
      return (
        <SensorDetails
          sensorName={sensor.name}
          sensorValue={sensor.value}
          sensorUnit={sensor.unit}
          sensorConnected={sensor.connected}
          sensorId={sensor.id}
          clickHandler={handleConnectedButton}
          key={sensor.id}></SensorDetails>
      );
    });
  };

  const memoizedFilteredSensorList = () => {
    return sensors
      .filter((sensor) => sensor.connected === true)
      .map((sensor) => {
        return (
          <SensorDetails
            sensorName={sensor.name}
            sensorValue={sensor.value}
            sensorUnit={sensor.unit}
            sensorConnected={sensor.connected}
            sensorId={sensor.id}
            clickHandler={handleConnectedButton}
            key={sensor.id}></SensorDetails>
        );
      });
  };

  return (
    <div className="container">
      <div className="headerContainer">
        <div>
          <h1>Sensors Management</h1>
        </div>
        <div>{memoizedToggleButton}</div>
      </div>
      <div className="bodyContainer">
        {filteredSensors ? memoizedSensorList() : memoizedFilteredSensorList()}
      </div>
    </div>
  );
}

export default App;
