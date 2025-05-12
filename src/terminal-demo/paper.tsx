import "./paper.css";
import { AnimatePresence, motion } from "framer-motion";
import closeIcon from "./close-paper.svg";
import { ReactNode } from "react";

export interface PaperProps {
  showContent: boolean;
  onOverlayClick(): void;
  children: ReactNode;
}

const Paper = ({ showContent, onOverlayClick, children }: PaperProps) => {
  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
            onOverlayClick();
          }}
          initial={{ y: "100%" }}
          animate={{ y: "-5%", overflowY: "auto" }}
          exit={{ y: "100%", transition: { ease: "easeIn", duration: 0.4 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="scroll-container">
          <div
            className="paper-container"
            id="paper">
            <div className="dotmatrix-holes" />
            <div
              className="paper"
              onClick={(e) => e.stopPropagation()}>
              <button
                className="close"
                onClick={onOverlayClick}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}>
                <img
                  src={closeIcon}
                  alt="Close"
                />
              </button>
              {children}
            </div>
            <div className="dotmatrix-holes" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Paper;
