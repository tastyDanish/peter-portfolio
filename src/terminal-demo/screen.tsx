import { useEffect, useRef, useState } from "react";
import "./screen.css";
import TerminalInput from "./terminalInput";

const Screen = () => {
  const [text, setText] = useState<string[]>([
    "Peter Lansdaal",
    "Hi, I'm a software dev",
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  let enterOffset = 1;

  useEffect(() => {
    const container = containerRef.current;
    if (container && container.scrollHeight > container.clientHeight) {
      setText(text.slice(enterOffset));
    }
    enterOffset = 1;
  }, [text]);

  const onEnter = (inputText: string) => {
    if (inputText.toLowerCase().trimEnd() == "clear") {
      setText([]);
      return;
    }
    const containerWidth = containerRef.current?.offsetWidth ?? 0;
    let lines: string[] = [];
    lines.push(
      inputText.split("").reduce((acc, curr) => {
        const newWord = acc + curr;
        if (measureTextWidth(newWord) > containerWidth) {
          enterOffset++;
          lines.push(acc);
          return curr;
        }
        return newWord;
      }, "")
    );
    setText([...text, ...lines]);
  };

  const measureTextWidth = (text: string) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      const font = getComputedStyle(document.body).getPropertyValue("font");
      context.font = font;
      return context.measureText(text).width;
    }
    return 0;
  };

  const childRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (childRef.current) childRef.current.focus();
  };

  return (
    <div
      className="screen"
      onClick={handleClick}>
      <div
        className="screen-content"
        ref={containerRef}>
        <div className="screen-text">
          {text.map((item, index) => (
            <div
              className="screen-line"
              key={index}>
              {item}
            </div>
          ))}
        </div>
        <TerminalInput
          onEnter={onEnter}
          childRef={childRef}
        />
      </div>
    </div>
  );
};

export default Screen;
