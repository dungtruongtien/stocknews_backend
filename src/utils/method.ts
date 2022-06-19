export const genCode = (baseValue: number, strLength: number = 6): string => {
  const convertedBaseValue = ('000000' + baseValue).slice(-6)
  // baseValue format = "xxxxxxx" e.g "0000001"
  const alphaBetaAndNumb = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "0"];
  let result = "";
  for (let i = 0; i < strLength; i++) {
    if (convertedBaseValue[i] === "0") {
      const alphaBetaAndNumbRandIdx = Math.floor(Math.random() * alphaBetaAndNumb.length);
      result += alphaBetaAndNumb[alphaBetaAndNumbRandIdx]
    } else {
      result += alphaBetaAndNumb[parseInt(convertedBaseValue[i])]
    }
  }
  return result;
}