import React, { RefObject, useEffect } from "react";
import "./terminalInput.css";

interface TerminalInputProps {
  ready: boolean;
  onEnter(text: string): void;
  childRef: RefObject<HTMLInputElement>;
}

const TerminalInput = (props: TerminalInputProps) => {
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    if (props.childRef.current) props.childRef.current.focus();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.onEnter(inputValue);
      setInputValue("");
    }
  };

  return (
    <div
      className="terminal-input"
      style={{ opacity: props.ready ? "1" : "0" }}>
      <div>{"C:>"}</div>
      <input
        ref={props.childRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}></input>
    </div>
  );
};

export default TerminalInput;
