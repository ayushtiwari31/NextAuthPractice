'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInSchema } from '@/schemas/signInSchema';
import {toast} from 'react-hot-toast'

export default function SignInForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log(result)

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast.error("Incorrect Username or password")
        // toast({
        //   title: 'Login Failed',
        //   description: 'Incorrect username or password',
        //   variant: 'destructive',
        // });
      } else {
        toast.error(result.error)
        // toast({
        //   title: 'Error',
        //   description: result.error,
        //   variant: 'destructive',
        // });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back 
          </h1>
          <p className="mb-4">Sign in to continue </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Identifier Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email/Username</label>
        <input
          {...register("email")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register("password")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Sign In
      </button>
    </form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}