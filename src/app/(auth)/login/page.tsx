'use client';

import OAuth from '@/components/OAuth';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import userLogin from '../../../../declare/declare.interface';

export default function page() {
  const router = useRouter();
  const [formData, setFormData] = useState<userLogin[]>([]);
  const [error, setError] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  // handel handelFromSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    console.log(formData);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    if (result?.error) {
      setError('Invalid credentials'); // Redirect to dashboard after successful login
    } else {
      console.log(result);
      router.push('/');
    }
  };

  setTimeout(() => {
    setError('');
  }, 4000);
  return (
    <div className="">
      <div className="">
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 ">
          <div className="bg-white rounded-lg shadow-xl sm:w-[50%] md:w-[45%] xl:w-[30%] ">
            {/* Modal header with close button */}
            <div className="relative p-5">
              <button className="absolute right-5 top-5 text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => router.replace('/')}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal title and subtitle */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Sign in to LogoGenie</h2>
                <p className="text-gray-500 mt-1">Welcome back! Please sign in to continue</p>
              </div>

              {/* google login buttons */}
              <div className="cursor-pointer">
                <OAuth />
              </div>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="">
                <form onSubmit={handleSubmit}>
                  <div className=" mb-6 flex flex-col gap-2">
                    {/* Email input */}
                    <div className="">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                        placeholder="Enter your email address"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      />
                    </div>

                    {/* password input */}
                    <div className="">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                        placeholder="Enter your email address"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Continue button */}
                  <button
                    className="w-full bg-gray-800 text-white py-2.5 rounded-md hover:bg-gray-700 flex items-center justify-center cursor-pointer"
                    type="submit"
                  >
                    <span>Login</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            <div className="">{error && <div className=" text-sm text-center text-red-500 py-2">{error}</div>}</div>

            {/* Sign up link */}
            <div className="border-t border-gray-200 p-4 text-center">
              <p className="text-gray-600">
                Don't have an account?
                <Link href="/signup" className="text-gray-800 font-medium ml-1">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
