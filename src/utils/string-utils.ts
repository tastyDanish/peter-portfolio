export const splitStringAtIndex = (str: string, index: number) => {
  const firstPart = str.substring(0, index);
  const secondPart = str.substring(index);
  return [firstPart, secondPart];
};
