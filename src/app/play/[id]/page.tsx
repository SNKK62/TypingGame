import { PlayContainer } from './container';

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const numericId = parseInt(id.replace('/', ''), 10);
  return <PlayContainer id={Number(numericId)} />;
};
export default Page;
