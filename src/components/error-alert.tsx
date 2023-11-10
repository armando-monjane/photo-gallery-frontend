import React from 'react';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorAlertProps {
  message?: string;
  description?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  description,
}) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{message || 'Error'}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
