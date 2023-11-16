import { WordCard } from '@/components/wordCard';

interface Props {
  height: number;
  width: number;
  words: string[];
  japaneseArray: string[];
  keyArray: string[];
  countS: number;
  countW: number;
  pastInput: string[];
  entered: string;
  allPattern: string[];
}

export const Presenter = ({
  height,
  width,
  words,
  japaneseArray,
  keyArray,
  countS,
  countW,
  pastInput,
  entered,
  allPattern,
}: Props) => {
  return (
    <main style={{ backgroundColor: 'white', padding: '20px' }}>
      <h1>this is app/play/page.tsx</h1>
      <WordCard
        word={words[countW]}
        kanaPast={japaneseArray.slice(0, countS).join('')}
        kanaNow={japaneseArray[countS]}
        kanaFuture={japaneseArray.slice(countS + 1).join('')}
        keyPast={pastInput.join('')}
        keyNow1={entered}
        keyNow2={allPattern[0]?.slice(entered.length)}
        keyFuture={keyArray.slice(countS + 1).join('')}
        width={width}
        height={height}
      />
      <br />
    </main>
  );
};
