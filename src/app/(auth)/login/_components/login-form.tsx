'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/spinner';

interface LoginFormProps {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  isLoading?: boolean;
}

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please provide a valid email.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((previousValue) => !previousValue);
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Input you email"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-x-2">
                      <Input
                        placeholder="Password"
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col">
              <Button disabled={isLoading} type="submit">
                {!isLoading && 'Login'}
                {isLoading && <Spinner />}
              </Button>
              <span className="my-2">
                Not account yet?{' '}
                <Link type="button" className="underline" href="/signup">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
