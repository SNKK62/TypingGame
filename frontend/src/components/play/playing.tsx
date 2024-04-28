'use client';

import React, { useState, useEffect, useCallback } from 'react';

import { loading, loadGoal, judge, JUDGE_TYPE } from '@/utils/judgement';

import { Cards } from './cards';
import { FinishModal } from './finishModal';
import { Keyboard } from './keyboard';
import { ScoreBoard } from './scoreBoard';
import { WaitingModal } from './waitingModal';

const words: string[] = [
  //必ず後ろに4つの番兵をつける
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
];
const kanas: string[] = [
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
];

const limitTime = 100; //制限時間(秒×10)

const calcScore = (combo: number) => {
  if (combo >= 90) return 100;
  return (Math.floor(combo / 10) + 1) * 10;
};

export const Playing = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [soundIndex, setSoundIndex] = useState<number>(0); //現在の音節番号
  const [entered, setEntered] = useState<string>(''); //現在の音節において今までに入力したキー
  const [pastInput, setPastInput] = useState<string[]>([]); //現在のwordにおいて過去の音節に入力したキー
  const [moveDown, setMoveDown] = useState<boolean>(true); //WordCardの動作の有無を指定する。falseにしたら上に移動して徐々に下に降りる
  const [inputs, setInputs] = useState<string[]>([]); //未来のwordsのお手本のキーと、過去のwordsの入力されたキーを格納する
  const [allPattern, setAllPattern] = useState<string[]>([]); //現在の音節において許容される入力パターンの全て
  const [isCorrect, setIsCorrect] = useState<string>(''); //正解したフラグ(キーボードが緑に光る)
  const [isWrong, setIsWrong] = useState<string>(''); //不正解したフラグ(キーボードが赤に光る)
  const [score, setScore] = useState<number>(0); //現在の得点
  const [combo, setCombo] = useState<number>(0); //連続して正解した数
  const [accurateCount, setAccurateCount] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);
  const [time, setTime] = useState<number>(limitTime);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  //   document.documentElement.clientWidth || document.body.clientWidth,
  // );
  const [screenHeight, setScreenHeight] = useState<number | undefined>(undefined);
  //   document.documentElement.clientHeight || document.body.clientHeight,
  // );
  const [values, setValues] = useState<{
    wordIndex: number; //現在のwordsのインデックス
    gradation: number; //0→1の値を取り、wordCardの位置や不透明度はこの変数に依存する
    keyarray: string[]; //現在のwordにおいて音節に分けたお手本キーの配列を入れる
    japanesearray: string[]; //現在のwordにおいて音節に分けた平仮名の配列を入れる
  }>({
    wordIndex: 0,
    gradation: 1,
    japanesearray: [''],
    keyarray: [''],
  });

  const handleStart = () => {
    setIsProcessing(true);
  };

  useEffect(() => {
    let id: NodeJS.Timeout | null = null;
    if (isProcessing && time > 0) {
      id = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 100);
      setIntervalId(id);
    } else if (time <= 0 && isProcessing) {
      clearInterval(intervalId as NodeJS.Timeout);
      //終了操作
    }
    return () => {
      if (id) clearInterval(id);
    };
  }, [isProcessing, time]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isCorrect || isWrong) {
      const timer = setTimeout(() => {
        setIsCorrect('');
        setIsWrong('');
      }, 80); // 80ms後にfalseに変更
      return () => clearTimeout(timer); // タイマークリア
    }
    return;
  }, [isCorrect, isWrong]);

  useEffect(() => {
    if (values.wordIndex === 0) {
      const [tempJapaneseArray, tempKeyArray, tempAllPattern] = loading(kanas[0] as string);
      setAllPattern(tempAllPattern);
      setValues((prev) => ({
        ...prev,
        japanesearray: tempJapaneseArray,
        keyarray: tempKeyArray,
      }));
      setInputs([
        '',
        loadGoal(kanas[1] as string).join(''),
        loadGoal(kanas[2] as string).join(''),
        loadGoal(kanas[3] as string).join(''),
      ]);
    }
  }, [values.wordIndex]);

  const handleKeyDown = useCallback(
    (event: unknown) => {
      if (time < 0) return; // 時間外では操作不能にする
      if (time >= limitTime) {
        if ((event as React.KeyboardEvent).key === ' ') {
          handleStart();
          return;
        } else return;
      }
      const [judgeType, newEntered, newAllPattern, newCount] = judge(
        (event as React.KeyboardEvent).key,
        values.japanesearray,
        soundIndex,
        entered,
        allPattern,
        pastInput[soundIndex - 1] as string,
      );
      if (judgeType === JUDGE_TYPE.endOfSyllable) {
        //音節の入力が完了した、かつWordの終わりではない場合
        setSoundIndex(newCount);
        setAllPattern(newAllPattern);
        setEntered('');
        setPastInput(pastInput.concat([newEntered]));
        setIsCorrect((event as React.KeyboardEvent).key);
        setScore((prevScore) => prevScore + calcScore(combo));
        setCombo((prevCombo) => {
          return prevCombo + 1;
        });
        setAccurateCount((prevCount) => {
          return prevCount + 1;
        });
      } else if (judgeType === JUDGE_TYPE.endOfWord) {
        //音節の入力が完了した、かつWordが終了した場合
        const newInputs = [...inputs];
        newInputs[values.wordIndex] = pastInput.concat([newEntered]).join('');
        setInputs(newInputs);
        setMoveDown(false);
        setIsCorrect((event as React.KeyboardEvent).key);
        setScore((prevScore) => prevScore + calcScore(combo));
        setCombo((prevCombo) => {
          return prevCombo + 1;
        });
        setAccurateCount((prevCount) => {
          return prevCount + 1;
        });
      } else if (judgeType === JUDGE_TYPE.midOfSyllable) {
        //音節の途中の場合
        setEntered(newEntered);
        setAllPattern(newAllPattern);
        setIsCorrect((event as React.KeyboardEvent).key);
        setScore((prevScore) => prevScore + calcScore(combo));
        setCombo((prevCombo) => {
          return prevCombo + 1;
        });
        setAccurateCount((prevCount) => {
          return prevCount + 1;
        });
      } else if (judgeType === JUDGE_TYPE.correctN) {
        //前の音節が「ん」でnで入力を終わらせていて、次にnを入力した場合
        setPastInput(pastInput.slice(0, soundIndex - 1).concat(['nn']));
        setIsCorrect((event as React.KeyboardEvent).key);
        setScore((prevScore) => prevScore + calcScore(combo));
        setCombo((prevCombo) => {
          return prevCombo + 1;
        });
        setAccurateCount((prevCount) => {
          return prevCount + 1;
        });
      } else {
        setIsWrong((event as React.KeyboardEvent).key);
        setCombo(0);
        setMissCount((prevCount) => {
          return prevCount + 1;
        });
      }
    },
    [
      soundIndex,
      entered,
      pastInput,
      values.wordIndex,
      inputs,
      allPattern,
      values.japanesearray,
      time,
      combo,
    ],
  );

  useEffect(() => {
    window.addEventListener('keypress', handleKeyDown);
    return () => {
      window.removeEventListener('keypress', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }; // リアルタイムでのスクリーンの広さ情報の更新
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const delta = 0.04; //一度の更新でのgradationの変化量
    const intervalTime = 10; //更新間隔(ms)
    let intervalId: NodeJS.Timer;
    if (!moveDown) {
      let newGrad = -delta;
      setSoundIndex(0);
      setPastInput([]);
      setEntered('');
      intervalId = setInterval(() => {
        setValues((prevValues) => {
          const [tempJapaneseArray, tempKeyArray, tempAllPattern] = loading(
            kanas[prevValues.wordIndex + 1] as string,
          );
          newGrad = newGrad + delta;
          if (newGrad >= 1) {
            clearInterval(intervalId);
            setMoveDown(true);
            setInputs((prevInputs) => {
              return prevInputs.concat(
                loadGoal(kanas[prevValues.wordIndex + 3] as string).join(''),
              );
            });
            return { ...prevValues, gradation: 1 };
          }
          if (newGrad <= 0) {
            setAllPattern(tempAllPattern);
            return {
              wordIndex: prevValues.wordIndex + 1,
              gradation: newGrad,
              japanesearray: tempJapaneseArray,
              keyarray: tempKeyArray,
            };
          }
          return { ...prevValues, gradation: newGrad };
        });
      }, intervalTime);
    }
    return () => clearInterval(intervalId);
  }, [moveDown]);

  return (
    <div
      style={{
        backgroundImage: 'url("backgroundImage.png")',
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Cards
        card1word={words[values.wordIndex + 2]}
        card1kana={kanas[values.wordIndex + 2]}
        card1key={inputs[values.wordIndex + 2] ? inputs[values.wordIndex + 2] : '.'}
        card2word={words[values.wordIndex + 1]}
        card2kana={kanas[values.wordIndex + 1]}
        card2key={inputs[values.wordIndex + 1] ? inputs[values.wordIndex + 1] : '.'}
        card3word={words[values.wordIndex]}
        card3kanaFuture={values.japanesearray.slice(soundIndex + 1).join('')}
        card3kanaNow={values.japanesearray[soundIndex]}
        card3kanaPast={values.japanesearray.slice(0, soundIndex).join('')}
        card3keyFuture={values.keyarray.slice(soundIndex + 1).join('')}
        card3keyNow1={entered}
        card3keyNow2={allPattern[0]?.slice(entered.length)}
        card3keyPast={pastInput.join('')}
        card4word={words[values.wordIndex - 1] ? words[values.wordIndex - 1] : '.'}
        card4kana={kanas[values.wordIndex - 1] ? kanas[values.wordIndex - 1] : '.'}
        card4key={inputs[values.wordIndex - 1] ? inputs[values.wordIndex - 1] : '-'}
        screenHeight={screenHeight as number}
        screenWidth={screenWidth as number}
        gradation={values.gradation}
        isCorrect={isCorrect}
        isWrong={isWrong}
        isTransparent={time >= limitTime}
      ></Cards>
      {!isLoading && (
        <div>
          <Keyboard
            screenWidth={screenWidth as number}
            screenHeight={screenHeight as number}
            correct={isCorrect}
            wrong={isWrong}
            candidate={allPattern.map((str) => str.charAt(entered.length))}
            shiftPressed={false}
          ></Keyboard>
          <ScoreBoard
            score={score}
            remTime={time / 10}
            combo={combo}
            accurateCount={accurateCount}
            missCount={missCount}
            screenHeight={screenHeight as number}
            screenWidth={screenWidth as number}
          ></ScoreBoard>
        </div>
      )}

      <WaitingModal isOpen={time >= limitTime} funct={handleStart}></WaitingModal>
      <FinishModal
        time={time}
        score={score}
        combo={combo}
        accurateCount={accurateCount}
        missCount={missCount}
        screenHeight={screenHeight as number}
        screenWidth={screenWidth as number}
        limitTime={limitTime}
      ></FinishModal>
    </div>
  );
};
