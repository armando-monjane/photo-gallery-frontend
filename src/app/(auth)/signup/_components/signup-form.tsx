'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
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
import { Spinner } from '@/components/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImagePreview from './image-preview';
import { FileWithPreview } from '@/types/file-with-preview';
import { FormSchema } from './_validations/form-schema';

interface SignupFormFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const SignupForm: React.FC<SignupFormFormProps> = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData();

    for (const key in data) {
      formData.set(key, data[key as keyof typeof data]);
    }

    for (const file of files) {
      formData.append('files', file);
    }

    onSubmit(formData);
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-md mx-auto"
          >
            <div className="mb-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Last name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="E-mail address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
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
                          onClick={() =>
                            setShowPassword((previousValue) => !previousValue)
                          }
                        >
                          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="flex flex-row gap-x-2">
                        <Input
                          placeholder="Confirm password"
                          {...field}
                          type={showConfirmPassword ? 'text' : 'password'}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setShowConfirmPassword(
                              (previousValue) => !previousValue,
                            )
                          }
                        >
                          {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <ImagePreview onSetFiles={setFiles} files={files} />
            </div>

            <div className="mt-3">
              <div>
                <span>Already have an account? </span>
                <Link href="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </div>
            </div>

            <div className="mt-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {!isLoading && <span>Submit</span>}
                {isLoading && <Spinner />}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
