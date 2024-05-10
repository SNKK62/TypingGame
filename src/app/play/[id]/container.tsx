import { getWords } from '../getWord';

import { Presenter } from './presenter';

interface Props {
  id: number;
}
export const PlayContainer = async ({ id }: Props) => {
  const data = await getWords(id);
  console.log('データ！！：' + data);
  if (data?.length !== 0) {
    return <Presenter data={data} />;
  }
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <h2>指定したidのグループが存在しません</h2>
    </div>
  );
};
