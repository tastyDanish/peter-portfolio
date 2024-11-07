import "./power.css";
import { useState } from "react";

interface PowerProps {
  isOn: boolean;
  handlePower(power: boolean): void;
}
const Power = (props: PowerProps) => {
  const [isChecked, setIsChecked] = useState(props.isOn);

  const handleChange = () => {
    props.handlePower(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <div className="power">
      <label className={`rocker rocker-small ${!isChecked ? "right" : "left"}`}>
        <input
          id="switch"
          type="checkbox"
          checked={!isChecked}
          onChange={handleChange}
        />
        <span className="switch-left">O</span>
        <span className="switch-right">I</span>
      </label>
    </div>
  );
};

export default Power;
