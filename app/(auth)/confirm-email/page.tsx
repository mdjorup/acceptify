import Link from 'next/link';

const ConfirmEmail = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-96 rounded bg-white p-8 text-center">
        <h1 className="mb-4 text-2xl font-semibold">Almost there!</h1>
        <p className="mb-4 text-gray-700">
          Please check your inbox and confirm your email address to continue.
        </p>
        <Link href="/">Landing Page</Link>
      </div>
    </div>
  );
};

export default ConfirmEmail;
