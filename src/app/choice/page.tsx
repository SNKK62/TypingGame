import { getGroups } from './actions';
import { Container } from './container';

const Page = async () => {
  const data = await getGroups();
  return <Container data={data} />;
};

export default Page;
