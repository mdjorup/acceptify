'use client';

import { Database } from '@/types/supabase';
import { Button, Input } from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage("We couldn't log you in. Please try again.");
      setEmail('');
      setPassword('');
      return;
    }
    router.refresh();
  };

  return (
    // tailwind for an auth card
    <div className="w-full max-w-md rounded-lg bg-white p-8 ">
      <h1 className="mb-6 text-2xl font-semibold text-gray-700">Login</h1>
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
      </div>
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
      <Button onClick={handleLogin}>Log In</Button>
    </div>
  );
};

export default Login;
