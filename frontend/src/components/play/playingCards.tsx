/*import { useState, useState, useEffect } from 'react';
import { SpringValue, useSpring, animated, useSpring } from 'react-spring';

import { Button } from '@/components/utils/button';
import { WordCard } from '@/components/wordCard';
// interface Props {
//   height: SpringValue<number>;
//   width: SpringValue<number>;
//   words: string[];
//   japaneseArray: string[];
//   keyArray: string[];
//   countS: number;
//   countW: number;
//   pastInput: string[];
//   entered: string;
//   allPattern: string[];
//   x: SpringValue<number>;
//   y: SpringValue<number>;
//   ws: SpringValue<number>;
//   ks: SpringValue<number>;
//   funct: () => void;
// }

export const PlayingCards = () => {
  const [moveDown, setMoveDown] = useState<boolean>(false);
  const width = 1000;
  const height = 500;

  //   const { x1, y1, w1, h1, ws1, ks1 } = useSpring({
  //     from: { x1: 100, y1: 100, w1: 1000, h1: 100, ws1: 50, ks1: 50 },
  //     to: {
  //       x1: moveDown ? 100 : 100,
  //       y1: moveDown ? 500 : 100,
  //       w1: moveDown ? 900 : 1000,
  //       h1: moveDown ? 160 : 100,
  //       ws1: moveDown ? 26 : 50,
  //       ks1: moveDown ? 13 : 50,
  //     },
  //     config: { duration: moveDown ? 500 : 0 },
  //   });
  //setTimeout
  const onButtonPushed = () => {
    setMoveDown(!moveDown);
  };

  return (
    <main
      style={{ backgroundColor: 'white', padding: '20px', height: '1000px' }}
    >
      <h1>this is app/play/page.tsx</h1>
      <Button onClick={onButtonPushed}>ボタン</Button>
      <animated.div
        style={{
          height: h1.to((value) => `${value}px`),
          width: w1.to((value) => `${value}px`),
          position: 'relative',
          left: x1,
          top: y1?.to((value) => `${value}px`),
        }}
      >
        <WordCard
          word={'a'}
          kanaPast={'a'}
          kanaNow={'a'}
          kanaFuture={'a'}
          keyPast={'a'}
          keyNow1={'a'}
          keyNow2={'a'}
          keyFuture={'a'}
          //   width={width}
          //   height={height}
          //   x={x1}
          //   y={y1}
          //   wordSize={ws1}
          //   kanaSize={ks1}
        />
      </animated.div>

      <br />
    </main>
  );
};
*/
'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/utils/button';
import { loading, loadGoal, judge } from '@/utils/judgement';

import { WordCard } from '../wordCard';

export const PlayingCards = () => {
  const [gradation, setGradation] = useState<number>(1);
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
    '#This is the last index#',
    '#This is the last index#',
    '#This is the last index#',
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
    '-',
    '-',
    '-',
  ]);
  const [japaneseArray, setJapaneseArray] = useState<string[]>(['']);
  const [keyArray, setKeyArray] = useState<string[]>(['']);
  const [countW, setCountW] = useState<number>(0);
  const [countS, setCountS] = useState<number>(0);
  const [entered, setEntered] = useState<string>('');
  const [pastInput, setPastInput] = useState<string[]>([]);
  const [allPattern, setAllPattern] = useState<string[]>(['']);
  const [moveDown, setMoveDown] = useState<boolean>(true);
  const [nextKey1, setNextKey1] = useState<string[]>([]);
  const [nextKey2, setNextKey2] = useState<string[]>([]);
  const [inputs, setInputs] = useState<string[]>([]);
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
    const [tempJapaneseArray, tempKeyArray, tempAllPattern] = loading(
      kanas[countW] as string,
    );
    setJapaneseArray(tempJapaneseArray);
    setKeyArray(tempKeyArray);
    setAllPattern(tempAllPattern);
    if (countW === 0) {
      setNextKey1(loadGoal(kanas[1]));
      setNextKey2(loadGoal(kanas[2]));
    }
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
        setInputs(
          inputs.concat(pastInput.concat([newEntered as string]).join('')),
        );
        setMoveDown(false);
        // setCountW(countW + 1);
        // setCountS(0);
        // setPastInput([]);
        // setEntered('');
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
  }, [countS, allPattern, entered, pastInput, countW, japaneseArray, inputs]);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    // const conut: number = 0;
    if (!moveDown) {
      setNextKey1(nextKey2);
      setGradation(0);
      setCountW(countW + 1);
      setNextKey2(loadGoal(kanas[countW + 3]));
      setCountS(0);
      setPastInput([]);
      setEntered('');

      intervalId = setInterval(() => {
        setGradation((prevGrad) => {
          const newGrad = prevGrad + 0.04;
          if (newGrad >= 1) {
            clearInterval(intervalId);
            setMoveDown(true);
            return 1;
          }
          return newGrad;
        });
      }, 10);
    } else {
      // setGradation(0);
      // setMoveDown(true);
    }
    return () => clearInterval(intervalId);
  }, [moveDown]);
  return (
    <div style={{ height: screenHeight, width: screenWidth }}>
      <Button onClick={onButtonPushed}>Rotate!</Button>
      <WordCard
        word={words[countW + 2]}
        kanaPast={''}
        kanaNow={''}
        kanaFuture={kanas[countW + 2]}
        keyPast={''}
        keyNow1={''}
        keyNow2={''}
        keyFuture={nextKey2.join('')}
        width={screenWidth * (31 / 60 + (gradation * 3) / 60)}
        height={screenHeight * (3 / 50 + gradation / 50)}
        x={screenWidth * (15 / 120 - (gradation * 3) / 120)}
        y={screenHeight * (-3 / 50 + (gradation * 4) / 50)}
      />
      <WordCard
        word={words[countW + 1]}
        kanaPast={''}
        kanaNow={''}
        kanaFuture={kanas[countW + 1]}
        keyPast={''}
        keyNow1={''}
        keyNow2={''}
        keyFuture={nextKey1.join('')}
        width={screenWidth * (34 / 60 + (gradation * 3) / 60)}
        height={screenHeight * (4 / 50 + gradation / 50)}
        x={screenWidth * (12 / 120 - (gradation * 3) / 120)}
        y={screenHeight * (1 / 50 + (gradation * 5) / 50)}
      />
      <WordCard
        word={words[countW]}
        kanaPast={japaneseArray.slice(0, countS).join('')}
        kanaNow={japaneseArray[countS]}
        kanaFuture={japaneseArray.slice(countS + 1).join('')}
        keyPast={pastInput.join('')}
        keyNow1={entered}
        keyNow2={allPattern[0]?.slice(entered.length)}
        keyFuture={keyArray.slice(countS + 1).join('')}
        width={screenWidth * (37 / 60 + (gradation * 3) / 60)}
        height={screenHeight * (5 / 50 + gradation / 50)}
        x={screenWidth * (9 / 120 - (gradation * 3) / 120)}
        y={screenHeight * (6 / 50 + (gradation * 6) / 50)}
      />
      <WordCard
        word={words[countW - 1] ? words[countW - 1] : '.'}
        kanaPast={kanas[countW - 1] ? kanas[countW - 1] : '.'}
        kanaNow={''}
        kanaFuture={''}
        keyPast={inputs[countW - 1] ? inputs[countW - 1] : '-'}
        keyNow1={''}
        keyNow2={''}
        keyFuture={''}
        width={screenWidth * (2 / 3 - (gradation * 3) / 30)}
        height={screenHeight * (6 / 50 - gradation / 50)}
        x={screenWidth * (1 / 20 + gradation / 20)}
        y={screenHeight * (12 / 50 + (gradation * 7) / 50)}
      />
    </div>
  );
};
