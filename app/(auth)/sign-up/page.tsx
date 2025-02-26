'use client';

import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';


import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import {toast} from 'react-hot-toast'


import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email,setEmail]=useState("");
  

  const router = useRouter();

  
 
// Initialize React Hook Form
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);

      toast.success(response.data.message);
      
      router.replace(`/verify/${email}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your sign-up. Please try again.');

      toast.error(errorMessage?errorMessage:"There was a problem with your sign-up. Please try again.");

      setIsSubmitting(false);
    }
  };

  return (

    <Card color="transparent" shadow={false} className="p-6 mt-16 max-w-md mx-auto">
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal" >
        Nice to meet you! Enter your details to register.
      </Typography>

      <form className="mt-8 mb-2 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div>
          <Typography variant="h6" color="blue-gray" >
            Full Name
          </Typography>
          <Input size="lg" {...register("fullname")} placeholder="Your Name" />
          {errors.fullname && (
            <Typography color="red" variant="small" >
              {errors.fullname.message}
            </Typography>
          )}
        </div>

        {/* Email */}
        <div>
          <Typography variant="h6" color="blue-gray" >
            Email
          </Typography>
          <Input size="lg" {...register("email")} placeholder="name@mail.com"  onChange={(e) => { setEmail(e.target.value);}}  />
          {errors.email && (
            <Typography color="red" variant="small" >
              {errors.email.message}
            </Typography>
          )}
        </div>

        {/* Password */}
        <div>
          <Typography variant="h6" color="blue-gray">
            Password
          </Typography>
          <Input type="password" size="lg" {...register("password")} placeholder="********"  />
          {errors.password && (
            <Typography color="red" variant="small" >
              {errors.password.message}
            </Typography>
          )}
        </div>


        {/* Submit Button */}
        <Button type="submit" className="mt-4" fullWidth disabled={isSubmitting} >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>

      <Typography color="gray" className="mt-4 text-center font-normal" >
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
            Sign in
        </Link>
      </Typography>
    </Card>
  );
}
 