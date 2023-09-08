import { UserButton } from '@clerk/nextjs';

const Home = () => {
  return (
    <div>
      <h1>This is a test of the dashboard page.</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Home;
