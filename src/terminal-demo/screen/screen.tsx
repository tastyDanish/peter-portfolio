import { useCallback, useEffect, useRef, useState } from "react";
import "./screen.css";
import TerminalInput from "./terminal-input";
import { motion, useAnimate } from "framer-motion";
import loadingText from "./loadingText";
import Bio from "./bio";
import { useText } from "./text-provider";
import { TextBox } from "./text-box";

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
  const { setText, writeText } = useText();
  const [inputAllowed, setInputAllowed] = useState<boolean>(false);
  const [screenState, setScreenState] = useState<screenStates>(
    screenStates.off
  );
  const [showLogo, setShowLogo] = useState(false);
  const [scope, animate] = useAnimate();
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
      animationTimeoutRef.current = setTimeout(animateLoading, 200);
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
      setText([]);
      setScreenState(screenStates.flash);
    } else {
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
      setInputAllowed(false);
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
      writeText(
        "ZYLEX: Greetings! As the imprisoned wizard Zylex, I am here to assist in getting Peter Lansdaal a job. Do you have any questions about Peter Lansdaal's qualifications?",
        false,
        false,
        true
      );
      setInputAllowed(true);
    }
  }, [screenState]);

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
          {showLogo && <div className="screen-logo" />}
          <TextBox />
          {inputAllowed && (
            <div style={{ height: "50px", width: "100%" }}>
              <TerminalInput childRef={childRef} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Screen;
