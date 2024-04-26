import React from 'react';
import Modal from 'react-modal';

import { Button } from '../utils/button';
import { ScoreBoard } from './scoreBoard';

interface Props {
  time: number;
  score: number;
  combo: number;
  accurateCount: number;
  missCount: number;
  screenHeight: number;
  screenWidth: number;
  limitTime: number;
}

export const FinishModal: React.FC<Props> = ({
  time,
  score,
  combo,
  accurateCount,
  missCount,
  screenHeight,
  screenWidth,
  limitTime,
}) => {
  return (
    <Modal
      isOpen={(time < 0) as boolean}
      style={{
        content: {
          width: '430px', // 幅を設定
          height: '430px', // 高さを設定
          background: 'white', // 背景色を設定
          borderRadius: '10px', // 角を丸くする
          padding: '20px', // 内側の余白を設定
          top: '50%', // 上部を中央に配置
          left: '50%', // 左を中央に配置
          transform: 'translate(-50%, -50%)', // 中央に移動
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.80)', // モーダル以外の背景色を設定
        },
      }}
    >
      <h2>Time is over! Here's your result!</h2>
      <ScoreBoard
        score={score}
        remTime={0}
        combo={combo}
        accurateCount={accurateCount}
        missCount={missCount}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        limitTime={limitTime}
      ></ScoreBoard>
      <div style={{ padding: '10px 140px' }}>
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          TRY AGAIN!
        </Button>
      </div>
    </Modal>
  );
};