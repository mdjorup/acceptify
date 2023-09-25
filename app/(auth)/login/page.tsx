const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-md space-y-8 rounded-xl p-8 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral">
            Sign in to your account
          </h2>
        </div>
        <form action="/auth/login" method="post" className="mt-8 space-y-6">
          {/* ... (same input fields as before) ... */}
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 relative block w-full appearance-none rounded-none rounded-t-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 relative block w-full appearance-none rounded-none rounded-b-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="border-gray-300 h-4 w-4 rounded text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember_me"
                className="text-gray-900 ml-2 block text-sm"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-secondary"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="border-transparent text-white flex w-1/2 justify-center rounded-md border bg-primary px-4 py-2 text-sm font-medium hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign In
            </button>
            <button
              formAction="/auth/sign-up"
              className="hover:bg-neutral-lighter hover:text-white flex w-1/2 justify-center rounded-md border border-neutral bg-base-100 px-4 py-2 text-sm font-medium text-neutral focus:outline-none focus:ring-2 focus:ring-neutral focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
