import { PlayContainer } from './container';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Typing Game',
  description: 'キー配置を覚えながら楽しくタイピングゲームを遊べます！',
};

const Page = () => (
  <>
    <PlayContainer />
  </>
);
export default Page;
