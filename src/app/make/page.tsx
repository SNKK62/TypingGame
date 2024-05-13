'use client';
import { Divider } from '@mui/material';
import React, { useState } from 'react';

import { Header } from '@/components/header';
import { EditModal } from '@/components/make/editModal';
import { FinishSubmitModal } from '@/components/make/finishSubmitModal';
import { TitleEditModal } from '@/components/make/titleEditModal';
import { WordEditCard } from '@/components/make/wordEditCard';
import { Button } from '@/components/utils/button';
import { DataOfWords } from '@/types/type';

import { submitData } from './actions';

const isEmpty = (data: DataOfWords) => {
  return !data.some((item) => item.isActive);
};

const Page = () => {
  const [data, setData] = useState<DataOfWords>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [maxNumber, setMaxNumber] = useState<number>(0); //作成した最大のindex
  const [editingId, setEditingId] = useState<number>(-1); //編集中のwordのindexを示す
  const [isEdigintTitle, setIsEditingTitle] = useState<boolean>(false); //タイトルを編集中にtrue
  const [isIdle, setIsIdle] = useState<boolean>(true); //編集中のタイトル/ワードが存在しないならtrue
  const [isWaiting, setIsWaiting] = useState<boolean>(false); //投稿中の待ち時間かどうか
  const [isExistingError, setIsExistingError] = useState<boolean>(false); //提出したタイトルが被っていた際のステート
  const [isFinished, setIsFinished] = useState<boolean>(false); //正常に投稿が完了したことを示すステート
  const insertData = (word: string, kana: string) => {
    setData((prevData) => {
      return prevData.concat([{ id: maxNumber, word: word, kana: kana, isActive: true }]);
    });
    setMaxNumber((prevMaxNumber) => prevMaxNumber + 1);
    setIsIdle(true);
  };
  const deleteData = (id: number) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, isActive: false };
        }
        return item;
      });
    });
    setIsIdle(true);
  };
  const editData = (id: number, word: string, kana: string) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, word: word, kana: kana };
        }
        return item;
      });
    });
    setIsIdle(true);
  };
  const valid = title && description && !isEmpty(data) && !isExistingError;
  const handleSubmitData = async () => {
    setIsWaiting(true);
    const formData = new FormData();
    const stringData = JSON.stringify(data);
    console.log(stringData);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('data', stringData);
    if ((await submitData(formData)) === 1) {
      // タイトル被りエラーを検出した場合
      setIsExistingError(true);
      setIsWaiting(false);
    } else {
      // 正常に投稿できた場合
      setIsFinished(true);
    }
  };
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage:
          'linear-gradient(to bottom,rgba(32, 32, 0, 0.85),rgba(0, 0, 32, 0.85)), url("backgroundImage.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        style={{
          color: 'white',
          padding: '45px 15px',
        }}
      >
        <Header />
        <div style={{ padding: '4px' }}>
          <h2 style={{ fontWeight: 300, float: 'left' }}>{title}</h2>
          <Button onClick={() => setIsEditingTitle(true)}>タイトル・説明の編集</Button>
        </div>

        <Divider sx={{ backgroundColor: '#ff32ff' }}></Divider>
        <h3 style={{ fontWeight: 300 }}>説明</h3>
        <p>{description}</p>
        <Divider sx={{ backgroundColor: '#ff32ff' }}></Divider>
        <h3 style={{ fontWeight: 300 }}>出題内容一覧</h3>
        {data?.map(
          (item) =>
            item.isActive && (
              <WordEditCard
                word={item.word}
                kana={item.kana}
                onClick={() => {
                  setEditingId(item.id);
                  setIsIdle(false);
                }}
                key={item.id}
              ></WordEditCard>
            ),
        )}

        <div style={{ padding: '4px', justifyContent: 'center', display: 'flex' }}>
          <Button
            onClick={() => {
              setEditingId(maxNumber);
              setIsIdle(false);
            }}
          >
            単語を追加
          </Button>
        </div>
        <Divider sx={{ backgroundColor: '#ff32ff' }}></Divider>
        <div style={{ height: '4px' }}></div>
        <Divider sx={{ backgroundColor: '#ff32ff' }}></Divider>

        {valid ? (
          <p>内容に間違いがなければ下の送信ボタンを押してください</p>
        ) : (
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            <p>入力を修正してください：</p>
            {(!title || !description) && (
              <p>★タイトル・説明が入力されていません ページ上部のボタンから入力してください</p>
            )}
            {isEmpty(data) && (
              <p>★出題単語が存在しません 「単語を追加」ボタンから入力してください</p>
            )}
            {isExistingError && (
              <p>★入力したタイトルが既に存在しました。タイトルを変更してください</p>
            )}
          </div>
        )}
        <div style={{ padding: '4px', justifyContent: 'center', display: 'flex' }}>
          <Button
            onClick={() => handleSubmitData()}
            height='60px'
            width='160px'
            type='submit'
            disabled={!valid}
          >
            送信!
          </Button>
        </div>
        {isWaiting && (
          <div
            style={{
              height: '100px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <span style={{ paddingTop: '10px' }}>データ送信中...</span>
            <span className='loader'></span>
          </div>
        )}

        <EditModal
          isOpen={!isIdle}
          isNew={editingId >= maxNumber}
          word={data[editingId] ? (data[editingId]?.word as string) : ''}
          kana={data[editingId] ? (data[editingId]?.kana as string) : ''}
          id={editingId}
          handleEdit={editData}
          handleCreate={insertData}
          handleCancel={() => setIsIdle(true)}
          handleDelete={deleteData}
        ></EditModal>
        <TitleEditModal
          isOpen={isEdigintTitle}
          title={title}
          description={description}
          handleCancel={() => setIsEditingTitle(false)}
          handleEdit={(title, description) => {
            setTitle(title);
            setDescription(description);
            setIsEditingTitle(false);
            setIsExistingError(false);
          }}
        />
        <FinishSubmitModal isOpen={isFinished} handleClick={() => {}}></FinishSubmitModal>
      </div>
    </div>
  );
};

export default Page;
