import { Divider } from '@mui/material';

import { Button } from '../utils/button';

interface Props {
  word: string;
  kana: string;
  onClick: () => void;
  key: number;
}

export const WordEditCard: React.FC<Props> = ({ word, kana, onClick, key }) => {
  return (
    <div
      key={key}
      style={{
        backgroundColor: 'rgba(64,64,256,0.7)',
        width: '90%',
        height: '7.2vh',
        padding: '4px 8px',
        margin: '8px',
        whiteSpace: 'nowrap',
        overflowX: 'auto',
      }}
    >
      <div style={{ float: 'left', marginTop: '0.7vh', marginRight: '8px' }}>
        <Button onClick={onClick}>編集</Button>
      </div>
      <div>
        <div style={{ lineHeight: '3.5vh', verticalAlign: 'middle', display: 'flex' }}>
          <p>単語</p>
          <p style={{ fontSize: '2.5vh', marginLeft: '16px' }}>{word}</p>
        </div>
        <Divider sx={{ backgroundColor: 'gray' }}></Divider>
        <div style={{ lineHeight: '2.5vh', verticalAlign: 'middle', display: 'flex' }}>
          <p>読み</p>
          <p style={{ fontSize: '1.5vh', marginLeft: '16px' }}>{kana}</p>
        </div>
      </div>
    </div>
  );
};
