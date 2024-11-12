import { splitStringAtIndex } from "../../utils/string-utils";

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

export const containerLines = (text: string, containerWidth: number) => {
  let lines: string[] = [];
  let lastSpaceIndex = -1;
  let counter = 0;
  lines.push(
    text.split("").reduce((acc, curr) => {
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
  return lines;
};
