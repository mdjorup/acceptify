/**
 * Contains basic information about the user.
 * Log of user's previous reviews
 * Subscription status (active or inactive)
 * Link to the review page
 *
 *
 */
import { SubmissionForm } from './SubmissionForm';

import { getSchools } from '@/app/api/schools/getSchools';

const Dashboard = async () => {
  const schools = await getSchools();

  return (
    <div>
      <SubmissionForm schools={schools} />
    </div>
  );
};

export default Dashboard;
