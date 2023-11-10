import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserHeadingProps {
  fullName: string;
  avatar: string;
}

export const UserHeading: React.FC<UserHeadingProps> = ({
  fullName,
  avatar,
}) => {
  const nameInitials = fullName
    .split(' ')
    .map((name) => name[0])
    .join('');

  return (
    <div className="flex flex-row">
      <Avatar>
        <AvatarImage src={avatar} alt="@shadcn" />
        <AvatarFallback>{nameInitials}</AvatarFallback>
      </Avatar>
      <h1 className="ml-4 md:text-4xl sm:text-5xl">{fullName}</h1>
    </div>
  );
};
