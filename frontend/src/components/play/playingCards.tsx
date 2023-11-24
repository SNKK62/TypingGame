'use client';

import { useState, useEffect } from 'react';

import { loading, loadGoal, judge, JUDGE_TYPE } from '@/utils/judgement';

import { WordCard } from '../wordCard';

const words: string[] = [
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
]; //必ず4つの番兵をつける
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

export const PlayingCards = () => {
  const [soundIndex, setSoundIndex] = useState<number>(0); //現在の音節番号
  const [entered, setEntered] = useState<string>(''); //現在の音節において今までに入力したキー
  const [pastInput, setPastInput] = useState<string[]>([]); //現在のwordにおいて過去の音節に入力したキー
  const [moveDown, setMoveDown] = useState<boolean>(true); //WordCardの動作の有無を指定する。falseにしたら上に移動して徐々に下に降りる
  const [inputs, setInputs] = useState<string[]>([]); //未来のwordsのお手本のキーを、過去のwordsの入力されたキーを格納する
  const [allPattern, setAllPattern] = useState<string[]>([]); //現在の音節において許容される入力パターンの全て
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
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const screenHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  useEffect(() => {
    if (values.wordIndex === 0) {
      const [tempJapaneseArray, tempKeyArray, tempAllPattern] = loading(
        kanas[0] as string,
      );
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
  useEffect(() => {
    // TODO：eventの型要修正
    const handleKeyDown = (event: unknown) => {
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
      } else if (judgeType === JUDGE_TYPE.endOfWord) {
        //音節の入力が完了した、かつWordが終了した場合
        const newInputs = [...inputs];
        newInputs[values.wordIndex] = pastInput.concat([newEntered]).join('');
        setInputs(newInputs);
        setMoveDown(false);
      } else if (judgeType === JUDGE_TYPE.midOfSyllable) {
        //音節の途中の場合
        setEntered(newEntered);
        setAllPattern(newAllPattern);
      } else if (judgeType === JUDGE_TYPE.correctN) {
        //前の音節が「ん」でnで入力を終わらせていて、次にnを入力した場合
        setPastInput(pastInput.slice(0, soundIndex - 1).concat(['nn']));
      }
    };

    window.addEventListener('keypress', handleKeyDown);
    return () => {
      window.removeEventListener('keypress', handleKeyDown);
    };
  }, [
    soundIndex,
    entered,
    pastInput,
    values.wordIndex,
    inputs,
    allPattern,
    values.japanesearray,
  ]);

  useEffect(() => {
    const delta = 0.04; //一度の更新でのgradationの変化量
    const intervalTime = 10; //更新間隔(ms)
    let intervalId: NodeJS.Timer;
    if (!moveDown) {
      const a = values.wordIndex + 1;
      let newGrad = -delta;
      const [tempJapaneseArray, tempKeyArray, tempAllPattern] = loading(
        kanas[values.wordIndex + 1] as string,
      );
      setSoundIndex(0);
      setPastInput([]);
      setEntered('');
      intervalId = setInterval(() => {
        setValues((prevValues) => {
          newGrad = newGrad + delta;
          if (newGrad >= 1) {
            clearInterval(intervalId);
            setMoveDown(true);
            setInputs(
              inputs.concat(
                loadGoal(kanas[values.wordIndex + 4] as string).join(''),
              ),
            );
            return { ...prevValues, gradation: 1 };
          }
          if (newGrad <= 0) {
            setAllPattern(tempAllPattern);
            return {
              wordIndex: a,
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
    <div>
      <WordCard
        word={words[values.wordIndex + 2]}
        kanaPast={''}
        kanaNow={''}
        kanaFuture={kanas[values.wordIndex + 2]}
        keyPast={''}
        keyNow1={''}
        keyNow2={''}
        keyFuture={
          inputs[values.wordIndex + 2] ? inputs[values.wordIndex + 2] : '.'
        }
        width={screenWidth * (31 / 60 + (values.gradation * 3) / 60)}
        height={screenHeight * (3 / 50 + values.gradation / 50)}
        x={screenWidth * (15 / 120 - (values.gradation * 3) / 120)}
        y={screenHeight * (-3 / 50 + (values.gradation * 4) / 50)}
        opacity={
          words[values.wordIndex + 2] !== '' ? 0.7 + values.gradation * 0.1 : 0
        }
      />
      <WordCard
        word={words[values.wordIndex + 1]}
        kanaPast={''}
        kanaNow={''}
        kanaFuture={kanas[values.wordIndex + 1]}
        keyPast={''}
        keyNow1={''}
        keyNow2={''}
        keyFuture={
          inputs[values.wordIndex + 1] ? inputs[values.wordIndex + 1] : '.'
        }
        width={screenWidth * (34 / 60 + (values.gradation * 3) / 60)}
        height={screenHeight * (4 / 50 + values.gradation / 50)}
        x={screenWidth * (12 / 120 - (values.gradation * 3) / 120)}
        y={screenHeight * (1 / 50 + (values.gradation * 5) / 50)}
        opacity={
          words[values.wordIndex + 1] !== '' ? 0.8 + values.gradation * 0.1 : 0
        }
      />
      <WordCard
        word={words[values.wordIndex]}
        kanaPast={values.japanesearray.slice(0, soundIndex).join('')}
        kanaNow={values.japanesearray[soundIndex]}
        kanaFuture={values.japanesearray.slice(soundIndex + 1).join('')}
        keyPast={pastInput.join('')}
        keyNow1={entered}
        keyNow2={allPattern[0]?.slice(entered.length)}
        keyFuture={values.keyarray.slice(soundIndex + 1).join('')}
        width={screenWidth * (37 / 60 + (values.gradation * 3) / 60)}
        height={screenHeight * (5 / 50 + values.gradation / 50)}
        x={screenWidth * (9 / 120 - (values.gradation * 3) / 120)}
        y={screenHeight * (6 / 50 + (values.gradation * 6) / 50)}
        opacity={
          words[values.wordIndex] !== '' ? 0.9 + values.gradation * 0.1 : 0
        }
      />
      <WordCard
        word={words[values.wordIndex - 1] ? words[values.wordIndex - 1] : '.'}
        kanaPast={
          kanas[values.wordIndex - 1] ? kanas[values.wordIndex - 1] : '.'
        }
        kanaNow={''}
        kanaFuture={''}
        keyPast={
          inputs[values.wordIndex - 1] ? inputs[values.wordIndex - 1] : '-'
        }
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
