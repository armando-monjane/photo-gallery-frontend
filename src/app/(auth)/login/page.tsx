'use client';
import { redirect, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import LoginForm from './_components/login-form';
import { logout } from '@/redux/features/auth/auth-slice';
import { useLoginMutation } from '@/services/api/auth';
import { ErrorAlert } from '@/components/error-alert';
import { useState } from 'react';
import { getErrorMessages } from '@/app/helpers/error-message';

type LoginSubmitValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [login] = useLoginMutation();

  const [errors, setErrors] = useState<string[] | null>(null);

  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();

  const isAfterLogout = searchParams.has('afterLogout');

  if (isAfterLogout) {
    dispatch(logout({}));
    return redirect('/login');
  }

  if (isAuthenticated) {
    return redirect('/profile');
  }

  const onSubmit = async (values: LoginSubmitValues) => {
    await login(values)
      .unwrap()
      .catch((err) => setErrors(getErrorMessages(err)));
  };

  return (
    <div className="min-h-full flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center gap-y-8 flex-1 px-6 pb-10">
        {errors && (
          <div className="w-[450px] flex flex-col gap-y-3">
            {errors.map((error, index) => (
              <ErrorAlert key={index} description={error} />
            ))}
          </div>
        )}
        <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default LoginPage;
