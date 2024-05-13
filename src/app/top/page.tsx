'use client';
import { Header } from '@/components/header';
import { Button } from '@/components/utils/button';

const Page = () => (
  <div
    style={{
      // height: '100vh',
      width: '100vw',
      backgroundImage:
        // 'linear-gradient(to bottom,rgba(32, 32, 0, 0.85),rgba(0, 0, 32, 0.85)), url("backgroundImage.png")',
        'url("backgroundImage.png")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}
  >
    <div
      style={{
        color: 'white',
        paddingTop: '100px',
      }}
    >
      <Header />
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'rgba(0,0,20,0.5)',
          fontSize: '80px',
          lineHeight: '300px',
          marginBottom: '100px',
          letterSpacing: '5px',
        }}
      >
        <p>Typing Game</p>
      </div>

      <div style={{ textAlign: 'center', letterSpacing: '3px', textShadow: '2px 2px 3px black' }}>
        <p>ようこそ</p>
        <p>タイピングゲームを遊んでみましょう！</p>
        <p>難しいタイピングをすることで実力を上げることができるでしょう。</p>
        <div style={{ height: '50px' }}></div>
        <p>プレイはこちらから</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => {
            return;
          }}
          href='/choice'
        >
          プレイ！
        </Button>
      </div>
      <div style={{ height: '50px' }}></div>
      <div style={{ textAlign: 'center', letterSpacing: '3px', textShadow: '2px 2px 3px black' }}>
        <p>作問はこちらから</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => {
            return;
          }}
          href='/make'
        >
          作問画面へ
        </Button>
      </div>
      <div style={{ height: '300px' }}></div>
      <div>制作 : Yusuke</div>
    </div>
  </div>
);
export default Page;
