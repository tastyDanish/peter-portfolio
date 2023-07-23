import "./resume.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getResume, resumeRecord, sectionRecord } from "../api/api";
import closeIcon from "./close-paper.svg";

export interface ResumeProps {
  showResume: boolean;
  onOverlayClick(): void;
}

const Resume = (props: ResumeProps) => {
  const [resume, setResume] = useState<resumeRecord | undefined>();

  useEffect(() => {
    getResume().then((s) => {
      setResume(s);
    });
  }, []);

  const renderContent = (content: string[], sub: boolean) => {
    if (content.length === 1) {
      return <div key={Math.random() * 100}>{content[0]}</div>;
    }
    return content.map((text, index) => (
      <li>
        <div key={sub ? index : index + 100}>{text}</div>
      </li>
    ));
  };

  const renderHeader = (header: string, sub: boolean) => {
    if (sub) {
      return <h3>{header}</h3>;
    }
    return <h2>{header}</h2>;
  };

  const renderSection = (
    section: sectionRecord,
    subSection: boolean = false
  ) => {
    if (section.header === "DESCRIPTION") return <></>;
    return (
      <div key={section.header}>
        {renderHeader(section.header, subSection)}
        <ul>{renderContent(section.content, subSection)}</ul>
        {section.collection &&
          section.collection.length > 0 &&
          section.collection.map((subSection) =>
            renderSection(subSection, true)
          )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {props.showResume && (
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
            props.onOverlayClick();
          }}
          initial={{ y: "100%" }}
          animate={{ y: "-5%", overflowY: "auto" }}
          exit={{ y: "100%", transition: { ease: "easeIn", duration: 0.4 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="scroll-container">
          <div className="paper-container">
            <div className="dotmatrix-holes" />
            <div
              className="paper"
              onClick={(e) => e.stopPropagation()}>
              <button
                onClick={props.onOverlayClick}
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
              <h1>Peter Lansdaal</h1>
              {resume &&
                resume.sections.map((section) => {
                  return renderSection(section);
                })}
            </div>
            <div className="dotmatrix-holes" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Resume;
