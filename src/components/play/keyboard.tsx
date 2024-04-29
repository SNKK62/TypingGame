import { Key } from '../utils/key';

interface Props {
  screenHeight: number;
  screenWidth: number;
  correct: string;
  wrong: string;
  candidate: string[];
  shiftPressed: boolean;
  nIsOk: boolean;
}

const keys1stLine: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '^'];
const keys2ndLine: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '@', '['];
const keys3rdLine: string[] = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', ':', ']'];
const keys4thLine: string[] = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '\\'];

export const Keyboard: React.FC<Props> = ({
  screenWidth,
  screenHeight,
  correct,
  wrong,
  candidate,
  nIsOk,
  //   shiftPressed,
}) => {
  if (nIsOk) {
    candidate.push('n');
  }
  const keyWidth = Math.min(screenWidth * 0.06, (screenHeight * 0.5 * 0.25 * 6) / 7);
  return (
    <div>
      {keys1stLine.map((item, index) => (
        <Key
          key={item}
          top={screenHeight * 0.5}
          left={screenWidth * (0.07 + 0.07 * index)}
          height={screenHeight / 9}
          width={keyWidth}
          isShift={false}
          alphabet={item}
          shiftAlphabet=''
          isCorrect={correct === item}
          isWrong={wrong === item}
          isRecommended={candidate[0] === item}
          isOneOfCandiate={candidate.includes(item)}
        ></Key>
      ))}
      {keys2ndLine.map((item, index) => (
        <Key
          key={item}
          top={screenHeight * 0.5 + ((keyWidth * 7) / 6) * 1}
          left={screenWidth * (0.09 + 0.07 * index)}
          height={screenHeight / 9}
          width={keyWidth}
          isShift={false}
          alphabet={item}
          shiftAlphabet=''
          isCorrect={correct === item}
          isWrong={wrong === item}
          isRecommended={candidate[0] === item}
          isOneOfCandiate={candidate.includes(item)}
        ></Key>
      ))}
      {keys3rdLine.map((item, index) => (
        <Key
          key={item}
          top={screenHeight * 0.5 + ((keyWidth * 7) / 6) * 2}
          left={screenWidth * (0.11 + 0.07 * index)}
          height={screenHeight / 9}
          width={keyWidth}
          isShift={false}
          alphabet={item}
          shiftAlphabet=''
          isCorrect={correct === item}
          isWrong={wrong === item}
          isRecommended={candidate[0] === item}
          isOneOfCandiate={candidate.includes(item)}
        ></Key>
      ))}
      {keys4thLine.map((item, index) => (
        <Key
          key={item}
          top={screenHeight * 0.5 + ((keyWidth * 7) / 6) * 3}
          left={screenWidth * (0.14 + 0.07 * index)}
          height={screenHeight / 9}
          width={keyWidth}
          isShift={false}
          alphabet={item}
          shiftAlphabet=''
          isCorrect={correct === item}
          isWrong={wrong === item}
          isRecommended={candidate[0] === item}
          isOneOfCandiate={candidate.includes(item)}
        ></Key>
      ))}
    </div>
  );
};
