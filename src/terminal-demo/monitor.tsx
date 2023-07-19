import "./monitor.css";
import Screen from "./screen";
import Power from "./power";
import { useState } from "react";

const Monitor = () => {
  const [power, setPower] = useState(false);

  const handlePower = (power: boolean) => {
    setPower(power);
  };

  return (
    <div className="monitor">
      <div className="border-box">
        <div className="monitor-details">
          <div className="monitor-base">
            <div className="screen-border">
              <Screen isOn={power} />
            </div>
            <Power
              isOn={power}
              handlePower={handlePower}
            />
            <div className="tag-border">
              <div className="tag">UNICOMP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
