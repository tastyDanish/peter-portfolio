import { useCallback, useEffect, useRef, useState } from "react";
import "./screen.css";
import TerminalInput from "./terminalInput";
import { motion, useAnimate } from "framer-motion";
import loadingText from "./loadingText";
import { splitStringAtIndex } from "../utils/string-utils";

enum screenStates {
  flash,
  loading,
  ready,
}

const Screen = () => {
  const [text, setText] = useState<string[]>([]);
  const [textQueue, setTextQueue] = useState<string[]>([]);
  const [screenState, setScreenState] = useState<screenStates>(
    screenStates.flash
  );
  const [showLogo, setShowLogo] = useState(false);
  const [scope, animate] = useAnimate();
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLInputElement>(null);

  let enterOffset = 1;
  let i = 0;
  let memCounter = 0;
  function animateLoading() {
    setShowLogo(true);

    memCounter += Math.floor(Math.random() * 45000);
    i++;

    setText(loadingText(memCounter, i));

    if (i <= 20) {
      setTimeout(animateLoading, 100); // Delay each iteration by 500 milliseconds
    } else {
      setText([]);
      setShowLogo(false);
      setScreenState(screenStates.ready);
      i = 0;
      memCounter = 0;
    }
  }

  useEffect(() => {
    if (screenState == screenStates.flash) {
      flashAnimation().then((_) => setScreenState(screenStates.loading));
    }
    if (screenState == screenStates.loading) {
      animateLoading();
    }
    if (screenState == screenStates.ready) {
      setText(["Peter Lansdaal", "Hi, I'm a software dev"]);
    }
  }, [screenState]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [text]);

  useEffect(() => {
    if (textQueue.length > 0) {
      setText([...text, textQueue[0]]);
      setTimeout(() => setTextQueue(textQueue.slice(1)), 300);
    }
  }, [textQueue]);

  const clearThenType = (lines: string[]) => {
    setText([]);
    setTimeout(() => setText(lines), 300);
  };

  const onEnter = useCallback(
    (inputText: string, clear: boolean, space?: boolean) => {
      if (inputText.toLowerCase().trimEnd() == "clear") {
        setText([]);
        return;
      }
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      let lines: string[] = [];
      let lastSpaceIndex = -1;
      let counter = 0;
      lines.push(
        inputText.split("").reduce((acc, curr) => {
          if (curr === "\n") {
            if (acc.trim() == "") {
              lines.push(" ");
            } else {
              lines.push(acc);
            }
            counter = 4;
            lastSpaceIndex = -1;
            return "    ";
          }
          if (curr === " ") {
            lastSpaceIndex = counter;
          }
          counter++;
          const newWord = acc + curr;
          if (measureTextWidth(newWord) > containerWidth - 30) {
            enterOffset++;
            if (lastSpaceIndex != -1) {
              const splitAtLastSpace = splitStringAtIndex(
                newWord,
                lastSpaceIndex + 1
              );
              lines.push(splitAtLastSpace[0]);
              lastSpaceIndex = -1;
              counter = splitAtLastSpace[1].length;
              return splitAtLastSpace[1];
            }
            lines.push(acc);
            return curr;
          }
          return newWord;
        }, "")
      );
      if (space) {
        lines.unshift(" ");
      }
      if (clear) {
        clearThenType(lines);
      } else {
        setTextQueue(lines);
      }
    },
    [containerRef, setTextQueue, clearThenType]
  );

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

  const handleClick = () => {
    if (childRef.current) childRef.current.focus();
  };

  async function flashAnimation() {
    await animate(
      scope.current,
      {
        opacity: 0.6,
        background:
          "linear-gradient(180deg, rgba(8,8,8,1) 5%, rgba(94,194,61,1) 25%, rgba(94,194,61,1) 41%, rgba(172,217,126,1) 51%, rgba(93,190,61,1) 59%, rgba(80,142,60,1) 75%, rgba(8,8,8,1) 95%)",
      },
      { delay: 0.7, duration: 0.02 }
    );
    await animate(
      scope.current,
      { opacity: 0 },
      { ease: "easeOut", duration: 0.01 }
    );
    await animate(scope.current, { opacity: 0 }, { duration: 0.2 });
  }

  return (
    <div
      className="screen"
      onClick={handleClick}>
      {screenState == screenStates.flash ? (
        <motion.div
          className="screen-flash"
          ref={scope}
        />
      ) : (
        <div className="screen-content">
          {showLogo ? <div className="screen-logo" /> : null}
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
          <TerminalInput
            ready={screenState == screenStates.ready}
            onEnter={onEnter}
            childRef={childRef}
          />
        </div>
      )}
    </div>
  );
};

export default Screen;
