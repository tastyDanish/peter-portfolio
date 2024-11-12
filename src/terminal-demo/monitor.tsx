import "./monitor.css";
import Screen from "./screen/screen";
import Power from "./power";
import { useCallback, useState } from "react";
import ZylexPortrait from "./zylex-portrait/zylexPortrait";
import Resume from "./resume";
import CircleButton from "./circle-button";
import { TextProvider } from "./screen/text-provider";

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
                <TextProvider>
                  <Screen isOn={power} />
                </TextProvider>
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
