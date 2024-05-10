'use client';
import { Divider } from '@mui/material';
import React, { useState } from 'react';

import { Header } from '@/components/header';
import { EditModal } from '@/components/make/editModal';
import { TitleEditModal } from '@/components/make/titleEditModal';
import { WordEditCard } from '@/components/make/wordEditCard';
import { Button } from '@/components/utils/button';

import { submitData } from './actions';

const Page = () => {
  const [data, setData] = useState<{ id: number; word: string; kana: string; isActive: boolean }[]>(
    [],
  );
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [maxNumber, setMaxNumber] = useState<number>(0);
  const [EditingNumber, setEditingNumber] = useState<number>(-1);
  const insertData = (word: string, kana: string) => {
    setData((prevData) => {
      return prevData.concat([{ id: maxNumber, word: word, kana: kana, isActive: true }]);
    });
    setMaxNumber((prevMaxNumber) => prevMaxNumber + 1);
    setEditingNumber(-1);
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
    setEditingNumber(-1);
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
    setEditingNumber(-1);
  };
  const isNotEmpty = () => {
    let empty = true;
    data.map((item) => {
      if (item.isActive) empty = false;
    });
    return !empty;
  };
  const valid = title && description && isNotEmpty();
  const handleSubmitData = async () => {
    const formData = new FormData();
    const stringData = JSON.stringify(data);
    console.log(stringData);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('data', stringData);
    await submitData(formData);
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
          <Button onClick={() => setEditingNumber(-2)}>タイトル・説明の編集</Button>
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
                  setEditingNumber(item.id);
                }}
                key={item.id}
              ></WordEditCard>
            ),
        )}

        <div style={{ padding: '4px', justifyContent: 'center', display: 'flex' }}>
          <Button onClick={() => setEditingNumber(maxNumber)}>単語を追加</Button>
        </div>
        <Divider sx={{ backgroundColor: '#ff32ff' }}></Divider>
        <div style={{ height: '4px' }}></div>
        <Divider sx={{ backgroundColor: '#ff32ff' }}></Divider>

        {valid ? (
          <p>内容に間違いがなければ下の送信ボタンを押してください</p>
        ) : (
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            <p>入力が不足しています：</p>
            {(!title || !description) && (
              <p>★タイトル・説明が入力されていません ページ上部のボタンから入力してください</p>
            )}
            {!isNotEmpty() && (
              <p>★出題単語が存在しません 「単語を追加」ボタンから入力してください</p>
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
            href='/choice'
          >
            送信!
          </Button>
        </div>

        <EditModal
          isOpen={EditingNumber > -1}
          isNew={EditingNumber >= maxNumber}
          word={data[EditingNumber] ? (data[EditingNumber]?.word as string) : ''}
          kana={data[EditingNumber] ? (data[EditingNumber]?.kana as string) : ''}
          id={EditingNumber}
          handleEdit={editData}
          handleCreate={insertData}
          handleCancel={() => setEditingNumber(-1)}
          handleDelete={deleteData}
        ></EditModal>
        <TitleEditModal
          isOpen={EditingNumber === -2}
          title={title}
          description={description}
          handleCancel={() => setEditingNumber(-1)}
          handleEdit={(title, description) => {
            setTitle(title);
            setDescription(description);
            setEditingNumber(-1);
          }}
        />
      </div>
    </div>
  );
};

export default Page;
