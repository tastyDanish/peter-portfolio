import React, { RefObject, useEffect, useRef } from "react";
import { chat } from "../api/api";
import "./terminalInput.css";
import ZylexWriting from "./zylexWriting";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

interface TerminalInputProps {
  ready: boolean;
  onEnter(text: string, clear: boolean, space?: boolean): void;
  childRef: RefObject<HTMLInputElement>;
}

const TerminalInput = (props: TerminalInputProps) => {
  const [inputValue, setInputValue] = React.useState("");
  const [chatEnabled, setChatEnable] = React.useState(true);
  const [loading, setloading] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const messageHistory = useRef<ChatCompletionMessageParam[]>([]);

  useEffect(() => {
    if (response && chatEnabled)
      props.onEnter(`ZYLEX: ${response}`, false, true);
    setloading(false);
  }, [response]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (chatEnabled) {
        setloading(true);
        handleChat();
      } else {
        props.onEnter(inputValue, false);
      }

      setInputValue("");
    }
  };

  const handleChat = async () => {
    if (messageHistory.current.length > 8) messageHistory.current.shift();
    props.onEnter(`USER: ${inputValue}`, false, true);
    messageHistory.current.push({ role: "user", content: inputValue });
    try {
      const response = await chat(messageHistory.current);
      messageHistory.current.push({
        role: "system",
        content: response.content ?? "MESSAGE NOT FOUND",
      });
      setResponse(response.content ?? "MESSAGE NOT FOUND");
    } catch (error) {
      const errorMessage =
        "This confounding box lost your message. Can you try again?";
      messageHistory.current.push({ role: "system", content: errorMessage });
      setResponse(errorMessage);
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
