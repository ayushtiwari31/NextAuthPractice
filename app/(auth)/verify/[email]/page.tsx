'use client';
import React,{useState}  from 'react';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';
import {toast} from 'react-hot-toast'

export default function VerifyAccount() {
  const [message, setMessage] = React.useState("");
  const router = useRouter();
  const params = useParams<{ email: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      console.log(params,params.email)
      const safeEmail = encodeURIComponent(params.email);  
      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        email: safeEmail,
        code: data.code,
      });

   

    
    toast.success(response.data.message);

      router.replace('/sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
   

    toast.error( axiosError.response?.data.message ??'An error occurred. Please try again.')
}
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("code")}
            type="text"
            className={`w-full mt-1 p-2 border ${
              errors.code ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            placeholder="Enter your code"
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md disabled:bg-gray-400"
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </button>

        {message && <p className="text-green-500 mt-2">{message}</p>}
      </form>
      </div>
    </div>
  );
}