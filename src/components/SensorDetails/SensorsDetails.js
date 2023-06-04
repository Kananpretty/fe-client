import "./SensorDetails.css";

const SensorDetails = ({
  sensorName,
  sensorValue,
  sensorUnit,
  sensorConnected,
  sensorId,
  clickHandler,
}) => {
  return (
    <div className="sensorBox">
      <div className="sensorBody">
        <p>{sensorName}</p>
        <div className="sensorDetail">
          <p>
            {sensorValue
              ? sensorValue + " " + sensorUnit
              : "Please connect to see value"}{" "}
          </p>
        </div>
      </div>
      <div className="sensorFooter">
        <button
          className={
            sensorConnected
              ? "sensorConnectedButtonColor"
              : "sensorDisonnectedButtonColor"
          }
          onClick={(e) => {
            clickHandler(e, sensorId);
          }}
          value={sensorConnected ? "Disconnect" : "Connect"}>
          {sensorConnected ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
};

export default SensorDetails;
