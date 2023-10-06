import Link from 'next/link';

const Page = async () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Acceptify
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16 text-center">
        <h2 className="mb-4 text-4xl font-bold">Elevate Your College Essays</h2>
        <p className="mb-8 text-xl">
          {/* Fill in the description here */}
          Get AI-powered feedback on your essays to enhance your chances of
          college acceptance.
        </p>
        <Link
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          href="/login"
        >
          Try Acceptify Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          How Acceptify Works
        </h2>
        <div className="flex justify-around">
          {/* Feature 1 */}
          <div>
            <h3 className="mb-4 text-xl font-bold">Submit Your Essay</h3>
            <p>
              {/* Fill in the description here */}
              Upload your draft and let our AI evaluate its content.
            </p>
          </div>
          {/* Feature 2 */}
          <div>
            <h3 className="mb-4 text-xl font-bold">Receive AI Feedback</h3>
            <p>
              {/* Fill in the description here */}
              Get insights on your essay's structure, tone, and content.
            </p>
          </div>
          {/* Feature 3 */}
          <div>
            <h3 className="mb-4 text-xl font-bold">Fine-Tuned By Experts</h3>
            <p>
              {/* Fill in the description here */}
              Our AI model is trained based on feedback from actual college
              counselors.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-500 py-16 text-center text-white">
        <h2 className="mb-8 text-3xl font-bold">
          Ready to Transform Your Essays?
        </h2>
        <button className="rounded bg-white px-4 py-2 font-bold text-blue-500 hover:text-blue-600">
          Start with Acceptify
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p>© 2023 Acceptify. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
