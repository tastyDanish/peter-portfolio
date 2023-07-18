export default (memCounter: number, counter: number) => {
  const memMax = 262144;
  let loadingArray = [
    "VENOGRAPH (C) 1978",
    "SPEED: 40MHz",
    "CPU: INVOTECH XL4-MMX",
    " ",
    "Version J82151Q",
  ];

  if (counter > 1) {
    loadingArray.push(
      " ",
      `Memory Test : ${
        memCounter > memMax ? String(memMax) + " OK" : memCounter
      }`,
      " "
    );
  }

  if (counter > 2) {
    loadingArray.push("Verifying DMI Hardware Pool...");
    loadingArray.push(
      `     Detecting .....   ${
        counter > 3 ? `SATA DRIVE 1 ${counter > 5 ? "OK" : ""}` : ""
      }`
    );
  }

  if (counter > 6)
    loadingArray.push(
      `     Detecting .....   ${
        counter > 7 ? `SATA DRIVE 2 ${counter > 9 ? "OK" : ""}` : ""
      }`
    );
  if (counter > 10)
    loadingArray.push(
      `     Detecting .....   ${
        counter > 11 ? `SATA DRIVE 3 ${counter > 13 ? "OK" : ""}` : ""
      }`
    );
  if (counter > 14) {
    loadingArray.push(" ", " ");
    const flipperState = counter % 4;
    if (flipperState === 0) {
      loadingArray.push("loading... \\");
    } else if (flipperState === 1) {
      loadingArray.push("loading... |");
    } else if (flipperState === 2) {
      loadingArray.push("loading... /");
    } else {
      loadingArray.push("loading... |");
    }
  }

  return loadingArray;
};
