'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/utils/button';
import { loading, loadGoal, judge } from '@/utils/judgement';

import { WordCard } from '../wordCard';

export const PlayingCards = () => {
  // const [gradation, setGradation] = useState<number>(1);
  const [words, setWords] = useState<string[]>([
    '朝鮮民主主義人民共和国',
    '中華人民共和国上海市',
    '東京特許許可局',
    '東京箱根間往復大学駅伝競走',
    '信仰心理学',
    '美容整形外科',
    '環境保護活動家',
    '経済学者協会',
    '地球環境問題',
    '科学技術振興機構',
    '平等院鳳凰堂',
    '',
    '',
    '',
    '',
  ]);
  const [kanas, setKanas] = useState<string[]>([
    'ちょうせんみんしゅしゅぎじんみんきょうわこく',
    'ちゅうかじんみんきょうわこくしゃんはいし',
    'とうきょうとっきょきょかきょく',
    'とうきょうはこねかんおうふくだいがくえきでんきょうそう',
    'しんこうしんりがく',
    'びようせいけいげか',
    'かんきょうほごかつどうか',
    'けいざいがくしゃきょうかい',
    'ちきゅうかんきょうもんだい',
    'かがくぎじゅつしんこうきこう',
    'びょうどういんほうおうどう',
    '-',
    '-',
    '-',
    '-',
  ]);
  const [countS, setCountS] = useState<number>(0);
  const [entered, setEntered] = useState<string>('');
  const [pastInput, setPastInput] = useState<string[]>([]);
  const [moveDown, setMoveDown] = useState<boolean>(true);
  const [inputs, setInputs] = useState<string[]>([]);
  const [allPattern, setAllPattern] = useState<string[]>([]);
  const [values, setValues] = useState<{
    countW: number;
    gradation: number;
    keyarray: string[];
    japanesearray: string[];
  }>({
    countW: 0,
    gradation: 1,
    japanesearray: [''],
    keyarray: [''],
  });
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const screenHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const onButtonPushed = () => {
    setMoveDown(!moveDown);
  };

  useEffect(() => {
    if (values.countW === 0) {
      const [tempJapaneseArray, tempKeyArray, tempAllPattern] = loading(
        kanas[0] as string,
      );
      setAllPattern(tempAllPattern);
      setValues({
        ...values,
        japanesearray: tempJapaneseArray,
        keyarray: tempKeyArray,
      });
      setInputs([
        '',
        loadGoal(kanas[1]).join(''),
        loadGoal(kanas[2]).join(''),
        loadGoal(kanas[3]).join(''),
      ]);
    }
  }, [kanas, values.countW]);
  useEffect(() => {
    const handleKeyDown = (event: unknown) => {
      console.log((event as React.KeyboardEvent).key);
      const [judgeType, newEntered, newAllPattern, newCount] = judge(
        (event as React.KeyboardEvent).key as string,
        values.japanesearray,
        countS,
        entered,
        allPattern,
        pastInput[countS - 1] as string,
      );
      if (judgeType === 1) {
        setCountS(newCount as number);
        // setValues({ ...values, allpattern: newAllPattern as string[] });
        setAllPattern(newAllPattern as string[]);
        setEntered('');
        setPastInput(pastInput.concat([newEntered as string]));
      } else if (judgeType === 2) {
        const newInputs = [...inputs];
        newInputs[values.countW] = pastInput
          .concat([newEntered as string])
          .join('');
        setInputs(newInputs);
        setMoveDown(false);
      } else if (judgeType === 3) {
        setEntered(newEntered as string);
        // setValues({ ...values, allpattern: newAllPattern as string[] });
        setAllPattern(newAllPattern as string[]);
      } else if (judgeType === 4) {
        setPastInput(pastInput.slice(0, countS - 1).concat(['nn']));
      }
    };

    window.addEventListener('keypress', handleKeyDown);
    return () => {
      window.removeEventListener('keypress', handleKeyDown);
    };
  }, [countS, entered, pastInput, values.countW, inputs]);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (!moveDown) {
      const a = values.countW + 1;
      let temp = -0.04;
      const [tempJapaneseArray, tempKeyArray, tempAllPattern] = loading(
        kanas[values.countW + 1] as string,
      );
      setCountS(0);
      setPastInput([]);
      setEntered('');
      intervalId = setInterval(() => {
        setValues((prevValues) => {
          temp = temp + 0.04;
          if (temp >= 1) {
            clearInterval(intervalId);
            setMoveDown(true);
            setInputs(
              inputs.concat(
                loadGoal(kanas[values.countW + 4] as string).join(''),
              ),
            );
            return { ...prevValues, gradation: 1 };
          }
          if (temp <= 0) {
            setAllPattern(tempAllPattern);
            return {
              countW: a,
              gradation: temp,
              japanesearray: tempJapaneseArray,
              keyarray: tempKeyArray,
            };
          }
          return { ...prevValues, gradation: temp };
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [moveDown]);
  return (
    <div style={{ height: screenHeight, width: screenWidth }}>
      <Button onClick={onButtonPushed}>Rotate!</Button>
      <WordCard
        word={words[values.countW + 2]}
        kanaPast={''}
        kanaNow={''}
        kanaFuture={kanas[values.countW + 2]}
        keyPast={''}
        keyNow1={''}
        keyNow2={''}
        keyFuture={inputs[values.countW + 2] ? inputs[values.countW + 2] : '.'}
        width={screenWidth * (31 / 60 + (values.gradation * 3) / 60)}
        height={screenHeight * (3 / 50 + values.gradation / 50)}
        x={screenWidth * (15 / 120 - (values.gradation * 3) / 120)}
        y={screenHeight * (-3 / 50 + (values.gradation * 4) / 50)}
        opacity={
          words[values.countW + 2] !== '' ? 0.7 + values.gradation * 0.1 : 0
        }
      />
      <WordCard
        word={words[values.countW + 1]}
        kanaPast={''}
        kanaNow={''}
        kanaFuture={kanas[values.countW + 1]}
        keyPast={''}
        keyNow1={''}
        keyNow2={''}
        keyFuture={inputs[values.countW + 1] ? inputs[values.countW + 1] : '.'}
        width={screenWidth * (34 / 60 + (values.gradation * 3) / 60)}
        height={screenHeight * (4 / 50 + values.gradation / 50)}
        x={screenWidth * (12 / 120 - (values.gradation * 3) / 120)}
        y={screenHeight * (1 / 50 + (values.gradation * 5) / 50)}
        opacity={
          words[values.countW + 1] !== '' ? 0.8 + values.gradation * 0.1 : 0
        }
      />
      <WordCard
        word={words[values.countW]}
        kanaPast={values.japanesearray.slice(0, countS).join('')}
        kanaNow={values.japanesearray[countS]}
        kanaFuture={values.japanesearray.slice(countS + 1).join('')}
        keyPast={pastInput.join('')}
        keyNow1={entered}
        keyNow2={allPattern[0]?.slice(entered.length)}
        keyFuture={values.keyarray.slice(countS + 1).join('')}
        width={screenWidth * (37 / 60 + (values.gradation * 3) / 60)}
        height={screenHeight * (5 / 50 + values.gradation / 50)}
        x={screenWidth * (9 / 120 - (values.gradation * 3) / 120)}
        y={screenHeight * (6 / 50 + (values.gradation * 6) / 50)}
        opacity={words[values.countW] !== '' ? 0.9 + values.gradation * 0.1 : 0}
      />
      <WordCard
        word={words[values.countW - 1] ? words[values.countW - 1] : '.'}
        kanaPast={kanas[values.countW - 1] ? kanas[values.countW - 1] : '.'}
        kanaNow={''}
        kanaFuture={''}
        keyPast={inputs[values.countW - 1] ? inputs[values.countW - 1] : '-'}
        keyNow1={''}
        keyNow2={''}
        keyFuture={''}
        width={screenWidth * (2 / 3 - (values.gradation * 3) / 30)}
        height={screenHeight * (6 / 50 - values.gradation / 50)}
        x={screenWidth * (1 / 20 + values.gradation / 20)}
        y={screenHeight * (12 / 50 + (values.gradation * 7) / 50)}
        opacity={1 - values.gradation}
      />
    </div>
  );
};
