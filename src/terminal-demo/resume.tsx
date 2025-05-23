import "./paper.css";
import { useEffect, useState } from "react";
import { getResume, ResumeRecord, SectionRecord } from "../api/api";
// import JsPDF from "jspdf";

const Resume = () => {
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
      </div>
    );
  };

  // const generatePDF = () => {
  //   const doc = new JsPDF("portrait", "pt", "a4");
  //   const resumeRef = document.querySelector("#paper");
  //   if (resumeRef) {
  //     doc.html(resumeRef.outerHTML).then(() => {
  //       doc.save("Peter Lansdaal Resume.pdf");
  //     });
  //   }
  // };

  return (
    <>
      <h1>Peter Lansdaal</h1>
      {resume &&
        resume.sections.map((section) => {
          return renderSection(section);
        })}
    </>
  );
};

export default Resume;
