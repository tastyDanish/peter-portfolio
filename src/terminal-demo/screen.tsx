import { useCallback, useEffect, useRef, useState } from "react";
import "./screen.css";
import TerminalInput from "./terminalInput";
import { motion, useAnimate } from "framer-motion";
import loadingText from "./loadingText";
import { splitStringAtIndex } from "../utils/string-utils";
import Bio from "./bio";

enum screenStates {
  off,
  flash,
  loading,
  ready,
}

interface ScreenProps {
  isOn: boolean;
}

const Screen = (props: ScreenProps) => {
  const [text, setText] = useState<string[]>([]);
  const [textQueue, setTextQueue] = useState<string[]>([]);
  const [screenState, setScreenState] = useState<screenStates>(
    screenStates.off
  );
  const [showLogo, setShowLogo] = useState(false);
  const [scope, animate] = useAnimate();
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLInputElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const memCounter = useRef(0);

  let i = 0;

  const animateLoading = useCallback(() => {
    setShowLogo(true);

    memCounter.current += Math.floor(Math.random() * 45000);
    i++;

    setText(loadingText(memCounter.current, i));

    if (i <= 20) {
      animationTimeoutRef.current = setTimeout(animateLoading, 200); // Delay each iteration by 500 milliseconds
    } else {
      setText([]);
      setShowLogo(false);
      setScreenState(screenStates.ready);
      i = 0;
      memCounter.current = 0;
    }
  }, [i, memCounter, props.isOn, screenState]);

  useEffect(() => {
    if (props.isOn) {
      setScreenState(screenStates.flash);
    } else {
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
      setScreenState(screenStates.off);
      setShowLogo(false);
      setText([]);
    }
  }, [props.isOn]);

  useEffect(() => {
    if (screenState === screenStates.flash) {
      flashAnimation().then((_) => {
        if (scope.current) setScreenState(screenStates.loading);
      });
    }
    if (screenState === screenStates.loading) {
      animateLoading();
    }
    if (screenState === screenStates.ready) {
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
      setTimeout(() => setTextQueue(textQueue.slice(1)), 500);
    }
  }, [textQueue]);

  const clearThenType = (lines: string[]) => {
    setText([]);
    setTimeout(() => setText(lines), 500);
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
            if (acc.trim() === "") {
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

  const flashAnimation = async () => {
    if (scope.current)
      await animate(
        scope.current,
        {
          opacity: 0.6,
          background:
            "linear-gradient(180deg, rgba(8,8,8,1) 5%, rgba(94,194,61,1) 25%, rgba(94,194,61,1) 41%, rgba(172,217,126,1) 51%, rgba(93,190,61,1) 59%, rgba(80,142,60,1) 75%, rgba(8,8,8,1) 95%)",
        },
        { delay: 0.1, duration: 0.02 }
      );
    if (scope.current)
      await animate(
        scope.current,
        { opacity: 0 },
        { ease: "easeOut", duration: 0.01 }
      );
    if (scope.current)
      await animate(scope.current, { opacity: 0 }, { duration: 0.2 });
  };

  return (
    <div
      className={`screen${screenState == screenStates.off ? " off" : ""}`}
      onClick={handleClick}>
      {screenState === screenStates.flash ? (
        <motion.div
          className="screen-flash"
          ref={scope}
        />
      ) : screenState === screenStates.off ? (
        <Bio />
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
