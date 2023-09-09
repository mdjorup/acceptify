import { UserButton } from '@clerk/nextjs';

const Home = () => {
  return (
    <div>
      <p>This is a test of the dashboard page.</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Home;
