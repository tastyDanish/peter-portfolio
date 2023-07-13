import { motion } from "framer-motion";
import "./monitor.css";
import Screen from "./screen";

const Monitor = () => {
  return (
    <div className="monitor">
      <div className="border-box">
        <div className="monitor-base">
          <div className="screen-border">
            <Screen />
          </div>
          <div className="tag-border">
            <div className="tag">UNICOMP</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
