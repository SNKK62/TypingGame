import { PlayContainer } from './container';

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const numericId = parseInt(id.replace('/', ''), 10);
  return <PlayContainer id={numericId} />;
};
export default Page;
