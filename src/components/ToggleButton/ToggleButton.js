import "./ToggleButton.css";

const ToggleButton = ({ toggleLabels, selectedValue, onFilterHandler }) => {
  return (
    <>
      <span>{toggleLabels[0]}</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={selectedValue}
          onChange={(e) => onFilterHandler(e)}></input>
        <span className="slider round"></span>
      </label>
      <span>{toggleLabels[1]}</span>
    </>
  );
};

export default ToggleButton;
