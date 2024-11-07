import "./resume.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getResume, ResumeRecord, SectionRecord } from "../api/api";
import closeIcon from "./close-paper.svg";
import downloadIcon from "./download.svg";
import JsPDF from "jspdf";

export interface ResumeProps {
  showResume: boolean;
  onOverlayClick(): void;
}

const Resume = (props: ResumeProps) => {
  const [resume, setResume] = useState<ResumeRecord | undefined>();

  useEffect(() => {
    getResume().then((s) => {
      setResume(s);
    });
  }, []);

  const renderContent = (content: string[], sub: boolean) => {
    if (content.length === 1) {
      return <div key={0}>{content[0]}</div>;
    }
    return content.map((text, index) => (
      <li key={sub ? index + 200 : index + 300}>
        <div key={sub ? index + 400 : index + 100}>{text}</div>
      </li>
    ));
  };

  const renderHeader = (header: string, sub: boolean) => {
    header = header.replace(" at ", "<br>");
    header = header.replace(" from ", "<br>");
    if (sub) {
      return <h3 dangerouslySetInnerHTML={{ __html: header }} />;
    }
    return <h2 dangerouslySetInnerHTML={{ __html: header }} />;
  };

  const renderSection = (
    section: SectionRecord,
    subSection: boolean = false
  ) => {
    if (section.header === "DESCRIPTION") return <></>;
    return (
      <div key={section.header}>
        {renderHeader(section.header, subSection)}
        <ul key={section.header + "key"}>
          {renderContent(section.content, subSection)}
        </ul>
        {section.collection &&
          section.collection.length > 0 &&
          section.collection.map((subSection) =>
            renderSection(subSection, true)
          )}
      </div>
    );
  };

  const generatePDF = () => {
    const doc = new JsPDF("portrait", "pt", "a4");
    const resumeRef = document.querySelector("#paper");
    if (resumeRef) {
      doc.html(resumeRef.outerHTML).then(() => {
        doc.save("Peter Lansdaal Resume.pdf");
      });
    }
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
          <div
            className="paper-container"
            id="paper">
            <div className="dotmatrix-holes" />
            <div
              className="paper"
              onClick={(e) => e.stopPropagation()}>
              <button
                className="download"
                onClick={generatePDF}
                style={{
                  display: "none",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}>
                <img
                  src={downloadIcon}
                  alt="Download"
                />
              </button>
              <button
                className="close"
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
