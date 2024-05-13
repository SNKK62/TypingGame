import { Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { loadGoal } from '@/utils/judgement';

import { Button } from '../utils/button';
import { TextField } from '../utils/input';
import { WordCard } from '../wordCard';

interface ModalProps {
  isOpen: boolean;
  isNew: boolean;
  id: number;
  word: string;
  kana: string;
  handleCreate: (word: string, key: string) => void;
  handleEdit: (id: number, word: string, kana: string) => void;
  handleDelete: (id: number) => void;
  handleCancel: () => void;
}

const maxWordLength = 20;
const maxKanaLength = 35;

export const EditModal: React.FC<ModalProps> = ({
  isOpen,
  isNew,
  id,
  word,
  kana,
  handleCreate,
  handleCancel,
  handleDelete,
  handleEdit,
}) => {
  const [inputW, setInputW] = useState<string>('');
  const [inputK, setInputK] = useState<string>('');
  const [key, setKey] = useState<string>('');
  function containsOnlyHiraganaAndSimpleCharacters(str: string) {
    try {
      // 正規表現でひらがなと英数字(半角)と簡単な記号以外の文字をマッチングします
      const regex =
        /[^\u3040-\u309F\uFF21-\uFF3A\uFF41-\uFF5A、。ー0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
      // マッチング結果がnullでない場合はひらがなや英数字(半角)と簡単な記号以外の文字が含まれているのでfalseを返します
      return !regex.test(str.replace(/[\s\u{3000}]/gu, ''));
    } catch (error) {
      return false;
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text: string = event.target.value;
    setInputW(text);
    if (containsOnlyHiraganaAndSimpleCharacters(text)) {
      setInputK(text.replace(/[\s\u{3000}]/gu, '').replace(/[Ａ-Ｚａ-ｚ]/g, ''));
    }
  };
  useEffect(() => {
    setKey(loadGoal(inputK).join(''));
  }, [inputK]);
  const isVarid: boolean =
    inputK.length > 0 &&
    inputK.length <= maxKanaLength &&
    inputW.length > 0 &&
    inputW.length <= maxWordLength &&
    key.length > 0;
  useEffect(() => {
    setInputW(word);
    setInputK(kana);
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
      <p style={{ textAlign: 'center', fontSize: '30px' }}>
        {isNew ? '単語を新規作成' : '単語を編集中'}
      </p>
      <Divider style={{ backgroundColor: 'purple' }} />
      <p>
        ★単語を入力してください。({maxWordLength}文字以内) 現在:{inputW.length}文字
      </p>
      <TextField
        onChange={(e) => {
          handleInputChange(e);
        }}
        label='単語'
        width='680px'
        value={inputW}
      ></TextField>
      {inputW.length === 0 ? (
        <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.3)' }}>
          単語を1文字以上入力してください
        </p>
      ) : inputW.length > maxWordLength ? (
        <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.3)' }}>
          単語を{maxWordLength}文字以下入力してください
        </p>
      ) : (
        <p style={{ color: 'green', backgroundColor: 'rgba(0,255,0,0.3)' }}>OKです</p>
      )}
      <Divider style={{ backgroundColor: 'purple' }} />
      <p>
        ★読みを入力してください。({maxKanaLength}文字以内) 現在:{inputK.length}文字
      </p>
      <TextField
        onChange={(e) => {
          setInputK(e.target.value);
        }}
        label='読み'
        width='680px'
        value={inputK}
      ></TextField>
      {inputK.length === 0 ? (
        <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.3)' }}>
          読みを1文字以上入力してください
        </p>
      ) : key.length === 0 ? (
        <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.3)' }}>
          読みに使用できない文字が含まれています
        </p>
      ) : inputK.length > maxKanaLength ? (
        <p style={{ color: 'red', backgroundColor: 'rgba(255,0,0,0.3)' }}>
          読みを{maxKanaLength}文字以下入力してください
        </p>
      ) : (
        <p style={{ color: 'green', backgroundColor: 'rgba(0,255,0,0.3)' }}>OKです</p>
      )}
      <Divider style={{ backgroundColor: 'purple' }} />

      <p>★正常に表示されているか確認してください。</p>
      <WordCard
        word={inputW}
        kanaFuture={inputK}
        kanaNow=''
        kanaPast=''
        keyFuture={key}
        keyNow1=''
        keyNow2=''
        keyPast=''
        width={700}
        height={100}
        x={25}
        y={340}
        opacity={1}
      />
      <div style={{ height: '120px' }}></div>
      <Divider style={{ backgroundColor: 'purple' }} />
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        {!isNew && (
          <div style={{ margin: '0 40px' }}>
            <Button onClick={() => handleDelete(id)} color='error'>
              削除
            </Button>
          </div>
        )}
        <div style={{ margin: '0 40px' }}>
          <Button onClick={handleCancel}>キャンセル</Button>
        </div>
        {isNew ? (
          <div style={{ margin: '0 40px' }}>
            <Button onClick={() => handleCreate(inputW, inputK)} disabled={!isVarid}>
              作成
            </Button>
          </div>
        ) : (
          <div style={{ margin: '0 40px' }}>
            <Button onClick={() => handleEdit(id, inputW, inputK)} disabled={!isVarid}>
              更新
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
