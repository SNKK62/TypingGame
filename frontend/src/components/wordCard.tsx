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
  color = 'darkblue',
  fontColor = 'white',
  keyDisplay = true,
}) => {
  return (
    <div
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        color: fontColor,
      }}
    >
      <Text position='center' htmlType='p' fontSize={height / 3}>
        {word}
      </Text>
      <Text position='center' htmlType='p' fontSize={height / 6}>
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
