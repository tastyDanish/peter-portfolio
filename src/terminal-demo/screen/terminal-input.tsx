import React, { RefObject, useEffect, useRef } from "react";
import { chat } from "../../api/api";
import "./terminal-input.css";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useText } from "./text-provider";
import ZylexThinking from "../zylex-thinking";

interface TerminalInputProps {
  childRef: RefObject<HTMLInputElement>;
}

const TerminalInput = (props: TerminalInputProps) => {
  const { writeText, inputEnabled } = useText();
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [chatEnabled, setChatEnabled] = React.useState(true);
  const [response, setResponse] = React.useState("");
  const messageHistory = useRef<ChatCompletionMessageParam[]>([]);

  useEffect(() => {
    if (response && chatEnabled) {
      writeText(`ZYLEX: ${response}`, false, true, true);
    }
    setTimeout(() => setLoading(false), 100);
  }, [response]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (chatEnabled) {
        handleChat();
      } else {
        writeText(inputValue, false, false);
      }

      setInputValue("");
    }
  };

  const handleChat = async () => {
    if (messageHistory.current.length > 8) messageHistory.current.shift();
    setLoading(true);
    writeText(`USER: ${inputValue}`, false, true);

    messageHistory.current.push({ role: "user", content: inputValue });
    try {
      const zylexRespponse = await chat(messageHistory.current);
      const content = zylexRespponse.content ?? "MESSAGE NOT FOUND";
      messageHistory.current.push({
        role: "system",
        content,
      });
      setResponse(content);
    } catch (error) {
      const errorMessage =
        "This confounding box lost your message. Can you try again?";
      messageHistory.current.push({ role: "system", content: errorMessage });
      setResponse(errorMessage);
    }
  };

  return (
    <>
      {loading ? (
        <ZylexThinking />
      ) : (
        inputEnabled && (
          <div className="terminal-input">
            <div className="terminal-prompt">{`C:${
              chatEnabled ? "CHAT" : ""
            }>`}</div>
            <input
              ref={props.childRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
              className="terminal-input-field"
            />
          </div>
        )
      )}
    </>
  );
};

export default TerminalInput;
