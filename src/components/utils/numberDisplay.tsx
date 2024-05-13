import React from 'react';

interface Props {
  title: string;
  digits: number;
  num: number;
  decimal?: boolean;
  small?: boolean;
  scale?: string;
}

export const NumberDisplay: React.FC<Props> = ({
  title,
  digits,
  num,
  decimal = false,
  small = false,
  scale = '',
}) => {
  const iterator = Array.from({ length: digits }, (_, i) => i + 1);
  const width = small ? '14px' : '20px';
  const height = small ? '25px' : '35px';
  const fontSize = small ? '19px' : '30px';
  return (
    <div>
      {small ? (
        <h3 style={{ color: 'white', textShadow: 'black 1px 1px' }}>{title}</h3>
      ) : (
        <h2 style={{ color: 'white', textShadow: 'black 1px 1px' }}>{title}</h2>
      )}
      <div
        style={{
          display: 'flex',
          backgroundColor: 'burlywood',
          padding: '5px 12px',
          borderRadius: '4px',
        }}
      >
        {iterator.map((i) => (
          <p
            key={i}
            style={{
              color: 'black',
              backgroundColor: 'whitesmoke',
              height: height,
              width: width,
              fontSize: fontSize,
              justifyContent: 'center',
              fontWeight: 'bold',
              borderRadius: '4px',
              marginRight: '5px',
              textAlign: 'center',
            }}
          >
            {Math.floor(num / Math.pow(10, digits - i)) % 10}
          </p>
        ))}
        {decimal && (
          <p
            style={{
              color: 'black',
              backgroundColor: 'whitesmoke',
              height: height,
              width: '8px',
              fontSize: fontSize,
              justifyContent: 'center',
              fontWeight: 'bold',
              borderRadius: '4px',
              marginRight: '5px',
              textAlign: 'center',
            }}
          >
            .
          </p>
        )}
        {decimal && (
          <p
            style={{
              color: 'black',
              backgroundColor: 'whitesmoke',
              height: height,
              width: width,
              fontSize: fontSize,
              justifyContent: 'center',
              fontWeight: 'bold',
              borderRadius: '4px',
              marginRight: '5px',
              textAlign: 'center',
            }}
          >
            {Math.floor(num * 10) % 10}
          </p>
        )}
        {scale && (
          <p
            style={{
              color: 'black',
              backgroundColor: 'whitesmoke',
              height: height,
              width: scale.length === 1 ? width : 100,
              fontSize: fontSize,
              justifyContent: 'center',
              fontWeight: 'bold',
              borderRadius: '4px',
              marginRight: '5px',
              textAlign: 'center',
            }}
          >
            {scale}
          </p>
        )}
      </div>
    </div>
  );
};
