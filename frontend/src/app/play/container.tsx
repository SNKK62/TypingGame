'use client';
import { useState, useEffect } from 'react';

import { Presenter } from '@/app/play/presenter';
import { loading, judge } from '@/utils/judgement';

export const PlayContainer = () => {
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
    const [tempJapaneseArray, tempKeyArray, tempAllPattern] = loading(
      kanas[countW] as string,
    );
    setJapaneseArray(tempJapaneseArray);
    setKeyArray(tempKeyArray);
    setAllPattern(tempAllPattern);
  }, [kanas, countW]);
  useEffect(() => {
    const handleKeyDown = (event: unknown) => {
      console.log((event as React.KeyboardEvent).key);
      const [judgeType, newEntered, newAllPattern, newCount] = judge(
        (event as React.KeyboardEvent).key as string,
        japaneseArray,
        countS,
        entered,
        allPattern,
        pastInput[countS - 1] as string,
      );
      if (judgeType === 1) {
        setCountS(newCount as number);
        setAllPattern(newAllPattern as string[]);
        setEntered('');
        setPastInput(pastInput.concat([newEntered as string]));
      } else if (judgeType === 2) {
        setPastInput(pastInput.concat([newEntered as string]));
        setCountW(countW + 1);
        setCountS(0);
        setPastInput([]);
        setEntered('');
      } else if (judgeType === 3) {
        setEntered(newEntered as string);
        setAllPattern(newAllPattern as string[]);
      } else if (judgeType === 4) {
        setPastInput(pastInput.slice(0, countS - 1).concat(['nn']));
      }
    };

    window.addEventListener('keypress', handleKeyDown);
    return () => {
      window.removeEventListener('keypress', handleKeyDown);
    };
  }, [countS, allPattern, entered, pastInput, countW, japaneseArray]);
  return (
    <Presenter
      height={height}
      width={width}
      words={words}
      japaneseArray={japaneseArray}
      keyArray={keyArray}
      countS={countS}
      countW={countW}
      pastInput={pastInput}
      entered={entered}
      allPattern={allPattern}
    />
  );
};
