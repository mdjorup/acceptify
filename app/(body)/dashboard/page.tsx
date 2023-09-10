import { UserButton } from '@clerk/nextjs';
/**
 * Contains basic information about the user. 
 * Log of user's previous reviews
 * Subscription status (active or inactive)
 * Link to the review page
 * 
 * 
 */


const Dashboard = () => {
  return (
    <div>
      <p>This is a test of the dashboard page.</p>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Dashboard;
