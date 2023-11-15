'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/utils/button';
import { loading, judge } from '@/components/utils/judgement';
import { WordCard } from '@/components/wordCard';

export default function Home() {
  const [height, setHeight] = useState<number>(100);
  const [width, setWidth] = useState<number>(1000);
  const [words, setWords] = useState<string[]>([
    '朝鮮民主主義人民共和国',
    '中華人民共和国上海市',
    '#This is last index#',
  ]);
  const [kanas, setKanas] = useState<string[]>([
    'ちょうせんみんしゅしゅぎじんみんきょうわこく',
    'ちゅうかじんみんきょうわこくしゃんはいし',
    '-',
  ]);
  const [japaneseArray, setJapaneseArray] = useState<string[]>(['']);
  const [keyArray, setKeyArray] = useState<string[]>(['']);
  const [countW, setCountW] = useState<number>(0);
  const [countS, setCountS] = useState<number>(0);
  const [entered, setEntered] = useState<string>('');
  const [pastInput, setPastInput] = useState<string[]>([]);
  const [allPattern, setAllPattern] = useState<string[]>(['']);
  useEffect(() => {
    const [temp1, temp2, temp3] = loading(kanas[countW] as string);
    setJapaneseArray(temp1);
    setKeyArray(temp2);
    setAllPattern(temp3);
  }, [kanas, countW]);
  const handleKeyDown = (event: any) => {
    const temp = judge(
      event.key as string,
      japaneseArray,
      countS,
      entered,
      allPattern,
      pastInput[countS - 1],
    );
    if (temp[0] === 1) {
      setCountS(temp[2] as number);
      setAllPattern(temp[1] as string[]);
      setEntered('');
      setPastInput(pastInput.concat([temp[3] as string]));
    } else if (temp[0] === 2) {
      setPastInput(pastInput.concat([temp[1] as string]));
      setCountW(countW + 1);
      setCountS(0);
      setPastInput([]);
      setEntered('');
    } else if (temp[0] === 3) {
      setEntered(temp[1] as string);
      setAllPattern(temp[2] as string[]);
    } else if (temp[0] === 4) {
      setPastInput(pastInput.slice(0, countS - 1).concat(['nn']));
    }
  };

  return (
    <main style={{ backgroundColor: 'white', padding: '20px' }}>
      <h1>this is app/play/page.tsx</h1>
      <Button
        onClick={() => {
          setHeight(height * 1.1);
        }}
      >
        高さ1.1倍
      </Button>
      <Button
        onClick={() => {
          setWidth(width * 1.1);
        }}
      >
        幅1.1倍
      </Button>
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
      <p
        onKeyDown={handleKeyDown}
        // onKeyUp={handleKeyUp}
        tabIndex={0}
        style={{ outline: 'none' }}
      >
        ●CLICK HERE●
      </p>

      <br />
    </main>
  );
}
