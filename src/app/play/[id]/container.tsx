import { getWords } from '../getWord';

import { Presenter } from './presenter';

interface Props {
  id: number;
}
export const PlayContainer = async ({ id }: Props) => {
  const data = await getWords(id);
  return <Presenter data={data} />;
};
