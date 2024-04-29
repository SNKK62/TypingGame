import React from 'react';
import Modal from 'react-modal';

import { Button } from '../utils/button';

interface Props {
  funct: () => void;
  isOpen: boolean;
}

export const WaitingModal: React.FC<Props> = ({ funct, isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          width: '40rem', // 幅を設定
          height: '350px', // 高さを設定
          background: 'white', // 背景色を設定
          borderRadius: '10px', // 角を丸くする
          padding: '20px', // 内側の余白を設定
          top: '50%', // 上部を中央に配置
          left: '50%', // 左を中央に配置
          transform: 'translate(-50%, -50%)', // 中央に移動
          maxWidth: '90dvw',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.80)', // モーダル以外の背景色を設定
        },
      }}
    >
      <h2>Click the button or press space key to start!!</h2>
      <Button onClick={funct} width='100%' height='220px'>
        START!
      </Button>
    </Modal>
  );
};
