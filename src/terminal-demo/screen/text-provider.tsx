import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { containerLines } from "./screen-utils";

interface TextContextType {
  text: string[];
  writeText: (
    inputText: string,
    clear: boolean,
    inputAfter: boolean,
    space?: boolean
  ) => void;
  setText: React.Dispatch<React.SetStateAction<string[]>>;
  terminalReady: boolean;
  setTerminalReady: React.Dispatch<React.SetStateAction<boolean>>;
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
  inputEnabled: boolean;
}

const TextContext = createContext<TextContextType | undefined>(undefined);

export const TextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [text, setText] = useState<string[]>([]);
  const [textQueue, setTextQueue] = useState<string[]>([]);
  const [terminalReady, setTerminalReady] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [inputEnabled, setInputEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (textQueue.length > 0) {
      setText([...text, textQueue[0]]);
      setTimeout(() => setTextQueue(textQueue.slice(1)), 500);
    } else {
      setInputEnabled(true);
    }
  }, [textQueue]);

  const writeText = useCallback(
    (
      inputText: string,
      clear: boolean,
      space?: boolean,
      disableInput?: boolean
    ) => {
      if (disableInput) {
        setInputEnabled(false);
      }
      if (inputText.toLowerCase().trimEnd() == "clear") {
        setText([]);
        return;
      }
      const lines = containerLines(inputText, containerWidth);
      if (space) {
        lines.unshift(" ");
      }
      if (clear) {
        setText([]);
        setTimeout(() => setText(lines), 500);
      } else {
        setTextQueue(lines);
      }
    },
    [text, textQueue]
  );

  return (
    <TextContext.Provider
      value={{
        text,
        setText,
        writeText,
        terminalReady,
        setTerminalReady,
        setContainerWidth,
        inputEnabled,
      }}>
      {children}
    </TextContext.Provider>
  );
};

// Custom hook to use the text context
export const useText = () => {
  const context = useContext(TextContext);
  if (!context) {
    throw new Error("useText must be used within a TextProvider");
  }
  return context;
};
