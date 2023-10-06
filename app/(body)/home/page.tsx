/**
 * Contains basic information about the user.
 * Log of user's previous reviews
 * Subscription status (active or inactive)
 * Link to the review page
 *
 *
 */
import { Prompt, School } from '@/shared/types';
import { SubmissionForm } from './SubmissionForm';

const Dashboard = async () => {
  const schoolsResponsePromise = fetch('http://localhost:3000/api/schools', {
    method: 'GET',
    next: { revalidate: 3600 },
  });

  const promptsResponsePromise = fetch('http://localhost:3000/api/prompts', {
    method: 'GET',
    next: { revalidate: 3600 },
  });

  const [schoolsResponse, promptsResponse] = await Promise.all([
    schoolsResponsePromise,
    promptsResponsePromise,
  ]);

  let schools: School[] = [];
  let prompts: Prompt[] = [];

  schools = await schoolsResponse.json().then((response) => response.data);
  prompts = await promptsResponse.json().then((response) => response.data);

  return (
    <div>
      <SubmissionForm schools={schools} prompts={prompts} />
    </div>
  );
};

export default Dashboard;
