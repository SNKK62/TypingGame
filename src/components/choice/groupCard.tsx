import { Divider } from '@mui/material';

import { Button } from '../utils/button';

interface Props {
  title: string;
  description: string;
  time: string;
  like: number;
  play: number;
  key: number;
  id: number;
}

export const GroupCard: React.FC<Props> = ({ title, description, time, like, play, key, id }) => {
  return (
    <div
      key={key}
      style={{
        backgroundColor: 'rgba(64,128,64,0.7)',
        width: '30rem',
        height: '16vh',
        padding: '4px 8px',
        margin: '8px',
        float: 'left',
        textShadow: '1px 1px 2px black',
        borderRadius: '1rem',
        boxShadow: '3px 3px black',
      }}
    >
      <div>
        <div style={{ lineHeight: '3.5vh', verticalAlign: 'middle' }}>
          <p style={{ fontSize: '2.5vh', marginLeft: '16px' }}>{title}</p>
        </div>
        <Divider sx={{ backgroundColor: 'gray' }}></Divider>
        <div
          style={{ lineHeight: '2vh', verticalAlign: 'middle', height: '7vh', marginTop: '0.5vh' }}
        >
          <p style={{ fontSize: '1.5vh', marginLeft: '16px' }}>{description}</p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '0.7vh',
          marginRight: '8px',
          verticalAlign: 'middle',
          height: '4vh',
        }}
      >
        <Button onClick={() => {}} height='3vh' href={`/play/${id}`}>
          PLAY
        </Button>
        <p style={{ marginLeft: '12px' }}>
          created: {time} like: {like} play: {play}
        </p>
      </div>
    </div>
  );
};
