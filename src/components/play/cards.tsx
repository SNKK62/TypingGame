import { WordCard } from '../wordCard';

interface Props {
  card1word: string | undefined;
  card1kana: string | undefined;
  card1key: string | undefined;
  card2word: string | undefined;
  card2kana: string | undefined;
  card2key: string | undefined;
  card3word: string | undefined;
  card3kanaPast: string | undefined;
  card3kanaNow: string | undefined;
  card3kanaFuture: string | undefined;
  card3keyPast: string | undefined;
  card3keyNow1: string | undefined;
  card3keyNow2: string | undefined;
  card3keyFuture: string | undefined;
  card4word: string | undefined;
  card4kana: string | undefined;
  card4key: string | undefined;
  gradation: number;
  screenHeight: number;
  screenWidth: number;
  isCorrect: string;
  isWrong: string;
  isTransparent: boolean;
}

export const Cards: React.FC<Props> = ({
  card1word,
  card1kana,
  card1key,
  card2word,
  card2kana,
  card2key,
  card3word,
  card3kanaPast,
  card3kanaNow,
  card3kanaFuture,
  card3keyPast,
  card3keyNow1,
  card3keyNow2,
  card3keyFuture,
  card4word,
  card4kana,
  card4key,
  gradation,
  screenHeight,
  screenWidth,
  isCorrect,
  isWrong,
  isTransparent,
}) => {
  return (
    <div>
      <WordCard
        word={card1word}
        kanaPast={''}
        kanaNow={''}
        kanaFuture={card1kana}
        keyPast={''}
        keyNow1={''}
        keyNow2={''}
        keyFuture={card1key}
        width={screenWidth * (31 / 60 + (gradation * 3) / 60)}
        height={screenHeight * (3 / 50 + gradation / 50)}
        x={screenWidth * (15 / 120 - (gradation * 3) / 120)}
        y={screenHeight * (-3 / 50 + (gradation * 4) / 50)}
        opacity={isTransparent ? 0 : card1word !== '' ? 0.4 + gradation * 0.2 : 0}
      />
      <WordCard
        word={card2word}
        kanaPast={''}
        kanaNow={''}
        kanaFuture={card2kana}
        keyPast={''}
        keyNow1={''}
        keyNow2={''}
        keyFuture={card2key}
        width={screenWidth * (34 / 60 + (gradation * 3) / 60)}
        height={screenHeight * (4 / 50 + gradation / 50)}
        x={screenWidth * (12 / 120 - (gradation * 3) / 120)}
        y={screenHeight * (1 / 50 + (gradation * 5) / 50)}
        opacity={isTransparent ? 0 : card2word !== '' ? 0.6 + gradation * 0.2 : 0}
      />
      <WordCard
        word={card3word}
        kanaPast={card3kanaPast}
        kanaNow={card3kanaNow}
        kanaFuture={card3kanaFuture}
        keyPast={card3keyPast}
        keyNow1={card3keyNow1}
        keyNow2={card3keyNow2}
        keyFuture={card3keyFuture}
        width={screenWidth * (37 / 60 + (gradation * 3) / 60)}
        height={screenHeight * (5 / 50 + gradation / 50)}
        x={screenWidth * (9 / 120 - (gradation * 3) / 120)}
        y={screenHeight * (6 / 50 + (gradation * 6) / 50)}
        opacity={isTransparent ? 0 : card3word !== '' ? 0.8 + gradation * 0.2 : 0}
        fontColor={isCorrect ? '#bbffbb' : isWrong ? '#ffbbbb' : 'white'}
      />
      <WordCard
        word={card4word}
        kanaPast={card4kana}
        kanaNow={''}
        kanaFuture={''}
        keyPast={card4key}
        keyNow1={''}
        keyNow2={''}
        keyFuture={''}
        width={screenWidth * (2 / 3 - (gradation * 3) / 30)}
        height={screenHeight * (6 / 50 - gradation / 50)}
        x={screenWidth * (1 / 20 + gradation / 20)}
        y={screenHeight * (12 / 50 + (gradation * 7) / 50)}
        opacity={card4word !== '' ? 1 - gradation : 0}
      />
    </div>
  );
};
