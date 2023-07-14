import { useEffect, useRef, useState } from "react";
import "./screen.css";
import TerminalInput from "./terminalInput";
import { motion, useAnimate } from "framer-motion";

enum screenStates {
  flash,
  loading,
  ready,
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Screen = () => {
  const [text, setText] = useState<string[]>([]);
  const [screenState, setScreenState] = useState<screenStates>(
    screenStates.flash
  );
  const [scope, animate] = useAnimate();
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLInputElement>(null);
  let enterOffset = 1;

  let i = 0;

  function animateLoading() {
    const flipperState = i % 4;
    if (flipperState === 0) {
      setText(["loading... \\"]);
    } else if (flipperState === 1) {
      setText(["loading... |"]);
    } else if (flipperState === 2) {
      setText(["loading... /"]);
    } else {
      setText(["loading... |"]);
    }

    i++;

    if (i <= 10) {
      setTimeout(animateLoading, 300); // Delay each iteration by 500 milliseconds
    } else {
      setScreenState(screenStates.ready);
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

  const handleClick = () => {
    if (childRef.current) childRef.current.focus();
  };

  async function flashAnimation() {
    await animate(
      scope.current,
      {
        opacity: 0.7,
        background:
          "linear-gradient(180deg, rgba(8,8,8,1) 5%, rgba(94,194,61,1) 25%, rgba(94,194,61,1) 41%, rgba(172,217,126,1) 51%, rgba(93,190,61,1) 59%, rgba(80,142,60,1) 75%, rgba(8,8,8,1) 95%)",
      },
      { delay: 1, duration: 0.02 }
    );
    await animate(
      scope.current,
      { opacity: 0 },
      { ease: "easeOut", duration: 0.01 }
    );
    await animate(scope.current, { opacity: 0 }, { duration: 0.3 });
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
