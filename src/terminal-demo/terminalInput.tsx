import React, { RefObject, useEffect } from "react";
import { chat } from "../api/api";
import "./terminalInput.css";
import ZylexWriting from "./zylexWriting";

interface TerminalInputProps {
  ready: boolean;
  onEnter(text: string, clear: boolean, space?: boolean): void;
  childRef: RefObject<HTMLInputElement>;
}

const TerminalInput = (props: TerminalInputProps) => {
  const [inputValue, setInputValue] = React.useState("");
  const [chatEnabled, setChatEnabled] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [response, setResponse] = React.useState("");

  useEffect(() => {
    if (props.childRef.current) props.childRef.current.focus();
  }, []);

  useEffect(() => {
    if (response && chatEnabled)
      props.onEnter(`ZYLEX: ${response}`, false, true);
    setloading(false);
  }, [response]);

  useEffect(() => {
    if (!loading && props.childRef.current) props.childRef.current.focus();
  }, [loading]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue.toLowerCase() == "chat") {
        setChatEnabled(!chatEnabled);
        if (!chatEnabled) {
          props.onEnter(
            "chat enabled. You can now talk to the assistant",
            false
          );
        } else {
          props.onEnter("chat disabled.", false);
        }
      } else {
        if (chatEnabled) {
          setloading(true);
          handleChat();
        } else {
          props.onEnter(inputValue, false);
        }
      }

      setInputValue("");
    }
  };

  const handleChat = () => {
    props.onEnter(`USER: ${inputValue}`, false, true);
    try {
      chat(inputValue).then((response) => {
        setResponse(response);
      });
    } catch (error) {
      // Handle error
      setResponse("ERROR");
      console.error(error);
    }
  };

  return (
    <div
      className="terminal-input"
      style={{ opacity: props.ready ? "1" : "0" }}>
      {loading ? (
        <ZylexWriting />
      ) : (
        <>
          <div>{`C:${chatEnabled ? "CHAT" : ""}>`}</div>
          <input
            ref={props.childRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}></input>
        </>
      )}
    </div>
  );
};

export default TerminalInput;
