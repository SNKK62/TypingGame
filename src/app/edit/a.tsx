'use client';
import { Divider } from '@mui/material';
import React from 'react';

import { Header } from '@/components/header';
import { WordEditCard } from '@/components/make/wordEditCard';

// import { Button } from '@/components/utils/button';

interface Props {
  data:
    | { id: number; created_at: string; word: string; kana: string; group_id: number | null }[]
    | null;
}

export const A: React.FC<Props> = ({ data }) => {
  return (
    <div
      style={{
        height: '100vh',
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
          padding: '50px 15px',
        }}
      >
        <Header />
        <h2 style={{ fontWeight: 300 }}>words一覧</h2>

        <Divider sx={{ backgroundColor: '#ff32ff' }}></Divider>
        <h3 style={{ fontWeight: 300 }}>出題内容一覧</h3>
        {data?.map((item) => (
          <WordEditCard
            word={item.word}
            kana={item.kana}
            onClick={() => {}}
            key={item.id}
          ></WordEditCard>
        ))}
      </div>
    </div>
  );
};
