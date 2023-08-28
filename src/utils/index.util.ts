export const extractString = (str: string, index: number, char: string) => {
  if (!str) return;
  const splitPart = str.split(char);
  const results = splitPart[splitPart.length - index];
  return results;
};
