import { Playing } from '@/components/play/playing';

const words: string[] = [
  //必ず後ろに4つの番兵をつける
  '朝鮮民主主義人民共和国',
  '中華人民共和国上海市',
  '東京特許許可局',
  '東京箱根間往復大学駅伝競走',
  '信仰心理学',
  '美容整形外科',
  '環境保護活動家',
  '経済学者協会',
  '地球環境問題',
  '科学技術振興機構',
  '平等院鳳凰堂',
  '',
  '',
  '',
  '',
];
const kanas: string[] = [
  'ちょうせんみんしゅしゅぎじんみんきょうわこく',
  'ちゅうかじんみんきょうわこくしゃんはいし',
  'とうきょうとっきょきょかきょく',
  'とうきょうはこねかんおうふくだいがくえきでんきょうそう',
  'しんこうしんりがく',
  'びようせいけいげか',
  'かんきょうほごかつどうか',
  'けいざいがくしゃきょうかい',
  'ちきゅうかんきょうもんだい',
  'かがくぎじゅつしんこうきこう',
  'びょうどういんほうおうどう',
  '-',
  '-',
  '-',
  '-',
];

const Presenter = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("backgroundImage.png")',
        height: '100vh',
        width: '100vw',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Playing words={words} kanas={kanas} />
    </div>
  );
};

export default Presenter;
