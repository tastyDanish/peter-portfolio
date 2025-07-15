import "./monitor.css";
import Screen from "./screen/screen";
import Power from "./power";
import { useCallback, useState } from "react";
import ZylexPortrait from "./zylex-portrait/zylexPortrait";
import Resume from "./resume";
import CircleButton from "./circle-button";
import { TextProvider } from "./screen/text-provider";
import Links from "./links";
import Paper from "./paper";

const Monitor = () => {
  const [power, setPower] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const handlePower = (power: boolean) => {
    setPower(power);
  };

  const flipResume = useCallback(() => {
    setShowResume(!showResume);
  }, [setShowResume, showResume]);

  const flipLinks = useCallback(() => {
    setShowLinks(!showLinks);
  }, [setShowLinks, showLinks]);

  return (
    <>
      <Paper
        showContent={showResume}
        onOverlayClick={flipResume}>
        <Resume />
      </Paper>
      <Paper
        showContent={showLinks}
        onOverlayClick={flipLinks}>
        <Links />
      </Paper>
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
                    label="PROJECTS"
                    handleOnClick={flipLinks}
                  />
                  <CircleButton
                    label="RÉSUMÉ"
                    handleOnClick={flipResume}
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
