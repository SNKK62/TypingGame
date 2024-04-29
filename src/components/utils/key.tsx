interface Props {
  top: number;
  left: number;
  height: number;
  width: number;
  isShift: boolean;
  alphabet: string;
  shiftAlphabet: string;
  isCorrect: boolean;
  isRecommended: boolean;
  isWrong: boolean;
  isOneOfCandiate: boolean;
}

export const Key: React.FC<Props> = ({
  top,
  left,
  width,
  isShift,
  alphabet,
  shiftAlphabet,
  isCorrect,
  isRecommended,
  isWrong,
  isOneOfCandiate,
}) => {
  return (
    <div
      style={{
        top: !(isCorrect || isWrong) ? top : top + 6,
        left: left,
        aspectRatio: '1/1',
        width: width,
        position: 'absolute',
        borderRadius: '5px',
        color: isCorrect ? 'skybkue' : isRecommended ? 'yellow' : 'white',
        backgroundImage: isWrong
          ? 'linear-gradient(45deg, orange 0%, red 100%)'
          : isRecommended
          ? 'linear-gradient(45deg, #666666 0%, #6666ff 100%)'
          : isOneOfCandiate
          ? 'linear-gradient(45deg, #666666 0%, #6666bb 100%)'
          : isCorrect
          ? 'linear-gradient(45deg, #00ff00 0%, #00cccc 100%)'
          : 'linear-gradient(45deg, #333333 0%, #666666 100%)',
        boxShadow:
          isCorrect || isWrong ? '0px 0px 1px rgba(0,0,0,0.29)' : '0px 6px 2px rgba(0,0,0,0.29)',
        borderBottom: isCorrect || isWrong ? 'none' : 'solid 3px gray',
        fontSize: width / 2,
        lineHeight: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!isShift ? alphabet : shiftAlphabet}
    </div>
  );
};
