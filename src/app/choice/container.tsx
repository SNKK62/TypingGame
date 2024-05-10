'use client';
import { Divider } from '@mui/material';
import React from 'react';

import { GroupCard } from '@/components/choice/groupCard';
import { Header } from '@/components/header';

interface Props {
  data:
    | {
        created_at: string;
        id: number;
        title: string;
        description: string;
        like: number;
        play: number;
      }[]
    | null;
}

function truncateString(str: string): string {
  const periodIndex = str.indexOf('.');
  const colonIndex = str.indexOf('T');
  const minIndex = Math.min(
    periodIndex === -1 ? Infinity : periodIndex,
    colonIndex === -1 ? Infinity : colonIndex,
  );
  return minIndex === -1 ? str : str.slice(0, minIndex);
}

export const Container: React.FC<Props> = ({ data }) => {
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
          <h2 style={{ fontWeight: 300 }}>問題一覧</h2>
        </div>
        <Divider sx={{ backgroundColor: '#ff32ff' }}></Divider>
        {data?.map((item) => (
          <GroupCard
            title={item.title}
            description={item.description}
            key={item.id}
            id={item.id}
            time={truncateString(item.created_at)}
            like={item.like}
            play={item.play}
          ></GroupCard>
        ))}
      </div>
    </div>
  );
};
