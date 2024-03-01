export const numberFormat = (num: number): string => {
  if (Number.isInteger(num)) {
    const numStr = num.toString();
    const result = numStr.length >= 4 ? numSlicer(numStr) + "K" : numStr;
    return result;
  } else {
    return "";
  }
};

const numSlicer = (numString: string): string => {
  return numString.slice(0, numString.length - 3);
};
