'use client';

import { APP_NAME } from '@/shared/globals';
import { Database } from '@/shared/supabase';
import { Button, Input } from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setPassword('');
      setConfirmPassword('');
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setErrorMessage("We couldn't sign you up. Please try again.");
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      return;
    }
    router.replace('/confirm-email');
  };

  return (
    // tailwind for an auth card
    <div className="w-full max-w-md rounded-lg bg-white p-8 ">
      <h1 className="mb-6 text-2xl font-semibold text-gray-700">
        Create an Account with {APP_NAME}
      </h1>
      <div className="mb-4 flex w-full flex-wrap gap-4">
        <Input
          value={email}
          type="email"
          label="Email"
          variant="flat"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          fullWidth
        />
        <Input
          value={password}
          type="password"
          label="Password"
          variant="flat"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          fullWidth
        />
        <Input
          value={confirmPassword}
          type="password"
          label="Confirm Password"
          variant="flat"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          fullWidth
        />
      </div>
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
      <div className="flex flex-col items-center">
        <Button
          className="mb-4 transform rounded bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-white shadow transition hover:-translate-y-1 hover:cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"
          onClick={handleSignUp}
          disabled={!email || !password || !confirmPassword}
        >
          Sign Up
        </Button>
        <p className="text-gray-600">
          Have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Log in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
