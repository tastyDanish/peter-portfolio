import "./monitor.css";
import Screen from "./screen";
import Power from "./power";
import { useCallback, useEffect, useState } from "react";
import ZylexPortrait from "./zylexPortrait";
import { getResume } from "../api/api";
import Resume from "./resume";
import CircleButton from "./circle-button";

const Monitor = () => {
  const [power, setPower] = useState(false);
  const [showPaper, setShowPaper] = useState(false);

  const handlePower = (power: boolean) => {
    setPower(power);
  };

  const flipPaper = useCallback(() => {
    setShowPaper(!showPaper);
  }, [setShowPaper, showPaper]);

  return (
    <>
      <Resume
        showResume={showPaper}
        onOverlayClick={flipPaper}
      />
      <div className="monitor">
        <div className="border-box">
          <div className="monitor-details">
            <div className="monitor-base">
              <div className="screen-border">
                <Screen isOn={power} />
              </div>
              <div className="right-panel">
                <div className="button-panel">
                  <CircleButton
                    label="RESUME"
                    handleOnClick={flipPaper}
                  />
                  <Power
                    isOn={power}
                    handlePower={handlePower}
                  />
                </div>

                <ZylexPortrait isOn={power} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Monitor;
