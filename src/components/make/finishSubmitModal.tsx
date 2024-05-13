import { Divider } from '@mui/material';
import Modal from 'react-modal';

import { Button } from '../utils/button';

interface ModalProps {
  isOpen: boolean;
  handleClick: () => void;
}
export const FinishSubmitModal: React.FC<ModalProps> = ({ isOpen, handleClick }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          width: '750px', // 幅を設定
          height: '550px', // 高さを設定
          background: 'white', // 背景色を設定
          borderRadius: '10px', // 角を丸くする
          padding: '20px', // 内側の余白を設定
          top: '50%', // 上部を中央に配置
          left: '50%', // 左を中央に配置
          transform: 'translate(-50%, -50%)', // 中央に移動
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // モーダル以外の背景色を設定
        },
      }}
    >
      <p style={{ textAlign: 'center', fontSize: '30px' }}>問題の投稿が完了しました</p>
      <Divider style={{ backgroundColor: 'purple' }} />
      <p>今すぐプレイしますか？</p>
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <div style={{ margin: '0 40px' }}>
          <Button onClick={() => {}} href='/top'>
            トップ画面へ
          </Button>
        </div>

        <div style={{ margin: '0 40px' }}>
          <Button
            onClick={() => {
              handleClick();
            }}
            href='choice'
          >
            今すぐプレイ!
          </Button>
        </div>
      </div>
    </Modal>
  );
};
