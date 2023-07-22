import "./monitor.css";
import Screen from "./screen";
import Power from "./power";
import { useState } from "react";
import ZylexPortrait from "./zylexPortrait";
import { AnimatePresence, motion, useAnimate, useScroll } from "framer-motion";

const Monitor = () => {
  const [power, setPower] = useState(false);
  const [showPaper, setShowPaper] = useState(false);

  const handlePower = (power: boolean) => {
    setPower(power);
  };

  const flipPaper = async () => {
    setShowPaper(!showPaper);
  };

  return (
    <>
      <AnimatePresence>
        {showPaper && (
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
              flipPaper();
            }}
            initial={{ y: 1200 }}
            animate={{ y: "-5%", overflowY: "auto" }}
            exit={{ y: 1000 }}
            transition={{ duration: 0.8 }}
            className="scroll-container">
            <div
              className="paper-container"
              onClick={(e) => e.stopPropagation()}>
              <div className="dotmatrix-holes" />
              <div className="paper" />
              <div className="dotmatrix-holes" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="monitor">
        <div className="border-box">
          <div className="monitor-details">
            <div className="monitor-base">
              <div className="screen-border">
                <Screen isOn={power} />
              </div>
              <div className="right-panel">
                <Power
                  isOn={power}
                  handlePower={handlePower}
                />
                <button onClick={flipPaper}>show resume</button>
                <ZylexPortrait isOn={power} />
                <div className="tag-border">
                  <div className="tag">UNICOMP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Monitor;
