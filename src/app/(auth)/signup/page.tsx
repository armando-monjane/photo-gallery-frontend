'use client';
import { useSignupMutation } from '@/services/api/auth';
import SignupForm from './_components/signup-form';
import { useState } from 'react';
import { getErrorMessages } from '@/app/helpers/error-message';
import { ErrorAlert } from '@/components/error-alert';
import { useAppSelector } from '@/redux/store';
import { redirect } from 'next/navigation';

const SignupFormPage = () => {
  const [signup] = useSignupMutation();
  const [errors, setErrors] = useState<string[] | null>(null);
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return redirect('/profile');
  }

  const onSubmit = (data: FormData) => {
    signup(data)
      .unwrap()
      .catch((err) => setErrors(getErrorMessages(err)));
  };

  return (
    <div className="min-h-full flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center flex-1 px-6 pb-10">
        <SignupForm onSubmit={onSubmit} isLoading={isLoading} />
        {errors && (
          <div className="w-[500px] flex flex-col gap-y-3 mt-3">
            {errors.map((error, index) => (
              <ErrorAlert key={index} description={error} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupFormPage;
