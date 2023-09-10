import { UserButton } from '@clerk/nextjs';

// in the style of a form

const ReviewPage = () => {
  return (
    <div>
      <p>This is a test of the review page.</p>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default ReviewPage;
