import { Text } from './utils/text';

interface WordCardProps {
  word: string | undefined;
  kanaPast: string | undefined;
  kanaNow: string | undefined;
  kanaFuture: string | undefined;
  keyPast: string | undefined;
  keyNow1: string | undefined;
  keyNow2: string | undefined;
  keyFuture: string | undefined;
  width: number;
  height: number;
  x: number;
  y: number;
  opacity: number;
  color?: string;
  fontColor?: string;
  keyDisplay?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  kanaPast,
  kanaNow,
  kanaFuture,
  keyPast,
  keyNow1,
  keyNow2,
  keyFuture,
  width,
  height,
  x,
  y,
  opacity = 1,
  color = 'darkblue',
  fontColor = 'white',
  keyDisplay = true,
}) => {
  const wordHeight = keyDisplay ? height / 3 : height / 2.5;
  const kanaHeight = keyDisplay ? height / 6 : height / 4;
  return (
    <div
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        color: fontColor,
        position: 'absolute',
        top: y,
        left: x,
        opacity: opacity,
      }}
    >
      <Text position='center' htmlType='p' fontSize={wordHeight}>
        {word}
      </Text>
      <Text position='center' htmlType='p' fontSize={kanaHeight}>
        <span style={{ color: 'gray' }}>{kanaPast}</span>
        <span style={{ color: 'yellow', fontWeight: 'bold' }}>{kanaNow}</span>
        <span style={{ color: 'white' }}>{kanaFuture}</span>
      </Text>
      {keyDisplay && (
        <Text position='center' htmlType='p' fontSize={height / 6}>
          <span style={{ color: 'gray' }}>{keyPast}</span>
          <span style={{ color: 'lightgray' }}>{keyNow1}</span>
          <span style={{ color: 'yellow', fontWeight: 'bold' }}>{keyNow2}</span>
          <span style={{ color: 'white' }}>{keyFuture}</span>
        </Text>
      )}
    </div>
  );
};
