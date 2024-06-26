'use client';

import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

import { loading, loadGoal, judge, JUDGE_TYPE } from '@/utils/judgement';

import { Cards } from './cards';
import { FinishModal } from './finishModal';
import { Keyboard } from './keyboard';
import { ScoreBoard } from './scoreBoard';
import { WaitingModal } from './waitingModal';

interface Props {
  words: string[];
  kanas: string[];
}

const limitTime = 300; //制限時間(秒×10)
const maxPointAtOneType = 200;
const calcScore = (combo: number) => {
  return Math.min(maxPointAtOneType, (Math.floor(combo / 10) + 1) * 10);
};

export const Playing = ({ words, kanas }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [soundIndex, setSoundIndex] = useState<number>(0); //現在の音節番号
  const [entered, setEntered] = useState<string>(''); //現在の音節において今までに入力したキー
  const [pastInput, setPastInput] = useState<string[]>([]); //現在のwordにおいて過去の音節に入力したキー
  const [moveDown, setMoveDown] = useState<boolean>(true); //WordCardの動作の有無を指定する。falseにしたら上に移動して徐々に下に降りる
  const [inputs, setInputs] = useState<string[]>([]); //未来のwordsのお手本のキーと、過去のwordsの入力されたキーを格納する
  const [allPattern, setAllPattern] = useState<string[]>([]); //現在の音節において許容される入力パターンの全て
  const [isCorrect, setIsCorrect] = useState<string>(''); //正解したフラグ(キーボードが緑に光る)
  const [isWrong, setIsWrong] = useState<string>(''); //不正解したフラグ(キーボードが赤に光る)
  const [nIsOk, setNIsOk] = useState<boolean>(false); //次にnを打っても正解となる場合(nが青く光る)
  const [score, setScore] = useState<number>(0); //現在の得点
  const [combo, setCombo] = useState<number>(0); //連続して正解した数
  const [accurateCount, setAccurateCount] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);
  const [time, setTime] = useState<number>(limitTime);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  const [screenHeight, setScreenHeight] = useState<number | undefined>(undefined);
  const [values, setValues] = useState<{
    wordIndex: number; //現在のwordsのインデックス
    keyarray: string[]; //現在のwordにおいて音節に分けたお手本キーの配列を入れる
    japanesearray: string[]; //現在のwordにおいて音節に分けた平仮名の配列を入れる
  }>({
    wordIndex: 0,
    japanesearray: [''],
    keyarray: [''],
  });
  const [gradation, setGradation] = useState<number>(1); //0→1の値を取り、wordCardの位置や不透明度はこの変数に依存する

  const handleStart = () => {
    setIsProcessing(true);
  };

  useEffect(() => {
    if (isProcessing && values.wordIndex <= words.length - 5 && time > 0) {
      const id: NodeJS.Timeout = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 100);
      return () => {
        if (id) clearInterval(id);
      };
    }
    return;
  }, [isProcessing, time, values.wordIndex]);

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
      if (time <= 0) return; // 時間外では操作不能にする
      if (time >= limitTime) {
        if ((event as React.KeyboardEvent).key === ' ') {
          handleStart();
          return;
        } else return;
      }
      const offset = 4; //ワードの最後に付け足す番兵の分の数字
      if (values.wordIndex >= words.length - offset) return;
      const [judgeType, newEntered, newAllPattern, newCount] = judge(
        (event as React.KeyboardEvent).key,
        values.japanesearray,
        soundIndex,
        entered,
        allPattern,
        pastInput[soundIndex - 1] as string,
      ); //次のstate更新に必要な情報を取得
      const plusPoint = (k: string) => {
        setIsCorrect(k);
        setScore((prevScore) => prevScore + calcScore(combo));
        setCombo((prevCombo) => {
          return prevCombo + 1;
        });
        setAccurateCount((prevCount) => {
          return prevCount + 1;
        });
      }; //正解した際の処理

      if (judgeType === JUDGE_TYPE.endOfSyllable) {
        //音節の入力が完了した、かつWordの終わりではない場合
        if (newEntered === 'n' && values.japanesearray[soundIndex] === 'ん') {
          setNIsOk(true);
        } else setNIsOk(false);
        setSoundIndex(newCount);
        setAllPattern(newAllPattern);
        setEntered('');
        setPastInput(pastInput.concat([newEntered]));
        plusPoint((event as React.KeyboardEvent).key);
      } else if (judgeType === JUDGE_TYPE.endOfWord) {
        //音節の入力が完了した、かつWordが終了した場合
        const newInputs = [...inputs];
        newInputs[values.wordIndex] = pastInput.concat([newEntered]).join('');
        setInputs(newInputs);
        setMoveDown(false);
        plusPoint((event as React.KeyboardEvent).key);
        setNIsOk(false);
      } else if (judgeType === JUDGE_TYPE.midOfSyllable) {
        //音節の途中の場合
        setEntered(newEntered);
        setAllPattern(newAllPattern);
        plusPoint((event as React.KeyboardEvent).key);
        setNIsOk(false);
      } else if (judgeType === JUDGE_TYPE.correctN) {
        //前の音節が「ん」でnで入力を終わらせていて、次にnを入力した場合
        setPastInput(pastInput.slice(0, soundIndex - 1).concat(['nn']));
        plusPoint('n');
        setNIsOk(false);
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
      const [tempJapaneseArray, tempKeyArray, tempAllPattern] = loading(
        kanas[values.wordIndex + 1] as string,
      );
      intervalId = setInterval(() => {
        newGrad = newGrad + delta;
        if (newGrad >= 1) {
          clearInterval(intervalId);
          setMoveDown(true);
          setInputs((prevInputs) => {
            return prevInputs.concat(loadGoal(kanas[values.wordIndex + 4] as string).join(''));
          });
          setGradation(1);
        } else if (newGrad <= 0) {
          setAllPattern(tempAllPattern);
          setValues((prevValues) => {
            return {
              wordIndex: prevValues.wordIndex + 1,
              japanesearray: tempJapaneseArray,
              keyarray: tempKeyArray,
            };
          });
          setGradation(newGrad);
        } else {
          setGradation(newGrad);
        }
      }, intervalTime);
    }
    return () => clearInterval(intervalId);
  }, [moveDown]);

  return (
    <div>
      <Image src='/backgroundImage.png' alt='picture' fill={true} style={{ objectFit: 'cover' }} />
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
        gradation={gradation}
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
            nIsOk={nIsOk}
            shiftPressed={false}
          ></Keyboard>
          <ScoreBoard
            score={values.wordIndex}
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
        finished={values.wordIndex >= words.length - 4}
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
