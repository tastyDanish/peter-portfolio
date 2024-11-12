import { useEffect, useRef } from "react";
import { useText } from "./text-provider";

export const TextBox = () => {
  const { text, setContainerWidth, inputEnabled } = useText();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContainerWidth(containerRef.current?.offsetWidth ?? 0);
  }, [containerRef.current?.offsetWidth]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [text, inputEnabled]);

  return (
    <div
      className="screen-text"
      ref={containerRef}>
      {text.map((item, index) => (
        <div
          className="screen-line"
          key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};
