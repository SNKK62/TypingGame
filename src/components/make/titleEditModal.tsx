import { Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { Button } from '../utils/button';
import { TextField } from '../utils/input';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  handleEdit: (title: string, description: string) => void;
  handleCancel: () => void;
}

const maxTitleLength = 20;
const maxDescriptionLength = 100;

export const TitleEditModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  handleCancel,
  handleEdit,
}) => {
  const [inputT, setInputT] = useState<string>(title);
  const [inputD, setInputD] = useState<string>(description);
  const isVarid: boolean =
    inputT.length > 0 &&
    inputT.length <= maxTitleLength &&
    inputD.length > 0 &&
    inputD.length <= maxDescriptionLength;
  useEffect(() => {
    setInputD(description);
    setInputT(title);
  }, [isOpen]);
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
      <p style={{ textAlign: 'center', fontSize: '30px' }}>問題の情報を編集中</p>
      <Divider style={{ backgroundColor: 'purple' }} />
      <p>
        ★タイトルを入力してください。({maxTitleLength}文字以内) 現在:{inputT.length}文字
      </p>
      <TextField
        onChange={(e) => {
          setInputT(e.target.value);
        }}
        label='タイトル'
        width='680px'
        value={inputT}
      ></TextField>
      {inputT.length === 0 ? (
        <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.3)' }}>
          タイトルを1文字以上入力してください
        </p>
      ) : inputT.length > maxTitleLength ? (
        <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.3)' }}>
          タイトルを{maxTitleLength}文字以下入力してください
        </p>
      ) : (
        <p style={{ color: 'green', backgroundColor: 'rgba(0,255,0,0.3)' }}>OKです</p>
      )}
      <Divider style={{ backgroundColor: 'purple' }} />
      <p>
        ★説明を入力してください。({maxDescriptionLength}文字以内) 現在:{inputD.length}文字
      </p>
      <TextField
        onChange={(e) => {
          setInputD(e.target.value);
        }}
        label='説明'
        width='680px'
        value={inputD}
        height='100px'
        multiline
        maxRows={3}
      ></TextField>
      {inputD.length === 0 ? (
        <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.3)' }}>
          説明を1文字以上入力してください
        </p>
      ) : inputD.length > maxDescriptionLength ? (
        <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.3)' }}>
          説明を{maxDescriptionLength}文字以下入力してください
        </p>
      ) : (
        <p style={{ color: 'green', backgroundColor: 'rgba(0,255,0,0.3)' }}>OKです</p>
      )}
      <Divider style={{ backgroundColor: 'purple' }} />

      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <div style={{ margin: '0 40px' }}>
          <Button onClick={handleCancel}>キャンセル</Button>
        </div>

        <div style={{ margin: '0 40px' }}>
          <Button onClick={() => handleEdit(inputT, inputD)} disabled={!isVarid}>
            決定
          </Button>
        </div>
      </div>
    </Modal>
  );
};
