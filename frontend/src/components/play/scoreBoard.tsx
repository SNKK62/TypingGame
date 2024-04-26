import { NumberDisplay } from '../utils/numberDisplay';

interface Props {
  score: number;
  combo: number;
  remTime: number;
  accurateCount: number;
  missCount: number;
  screenWidth: number;
  screenHeight: number;
  limitTime?: number;
}

export const ScoreBoard: React.FC<Props> = ({
  score,
  combo,
  remTime,
  accurateCount,
  missCount,
  screenWidth,
  screenHeight,
  limitTime = 0,
}) => {
  return (
    <div>
      <div
        style={
          !limitTime
            ? {
                position: 'absolute',
                left: (screenWidth * 3) / 4,
                top: screenHeight * 0.03,
                backgroundColor: 'rgba(20,108,10,0.7)',
                padding: '12px',
                borderRadius: '30px',
              }
            : {
                backgroundColor: 'rgba(20,108,10,0.7)',
                padding: '12px',
                borderRadius: '30px',
              }
        }
      >
        <NumberDisplay num={score} title='SCORE' digits={7}></NumberDisplay>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%', marginRight: '8px' }}>
            <NumberDisplay
              num={
                missCount
                  ? Math.floor((accurateCount * 1000) / (accurateCount + missCount)) / 10
                  : accurateCount
                  ? 100
                  : 0
              }
              title='正確性'
              digits={3}
              decimal
              small
              scale='%'
            ></NumberDisplay>
          </div>
          <div style={{ width: '50%' }}>
            <NumberDisplay num={combo} title='コンボ' digits={5} small></NumberDisplay>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%', marginRight: '8px' }}>
            <NumberDisplay num={accurateCount} title='正解' digits={5} small></NumberDisplay>
          </div>
          <div style={{ width: '50%' }}>
            <NumberDisplay num={missCount} title='ミス' digits={5} small></NumberDisplay>
          </div>
        </div>

        {limitTime === 0 ? (
          <NumberDisplay
            num={remTime > 0 ? remTime : 0}
            title='TIME'
            digits={3}
            decimal
            scale='s'
          ></NumberDisplay>
        ) : (
          <NumberDisplay
            num={(accurateCount * 10) / limitTime}
            title='SPEED'
            digits={2}
            decimal
            scale='type/s'
          ></NumberDisplay>
        )}
      </div>
    </div>
  );
};
