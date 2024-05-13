'use client';
import { Divider } from '@mui/material';
import Image from 'next/image';
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
    <div>
      <Image
        className='picture'
        src='/backgroundImage.png'
        alt='picture'
        layout='fill'
        objectFit='cover'
        style={{ zIndex: -1 }}
      />
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
        {/* <div style={{ height: `${data ? 18 * data.length : 18}vh` }}></div> */}
      </div>
    </div>
  );
};
