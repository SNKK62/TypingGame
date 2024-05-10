import { A } from './a';
import { getWords } from './wordList';

const Page = async () => {
  const data = await getWords();
  return <A data={data} />;
};

export default Page;
