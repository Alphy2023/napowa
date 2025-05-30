import { useSession } from 'next-auth/react';
import React from 'react';

interface CanAccessProps {
  resource: string;
  action: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const CanAccess: React.FC<CanAccessProps> = ({ resource, action, children, fallback = null }) => {
  const { data: session } = useSession();

  const permissions: Record<string, string[]> = session?.user?.role?.permissions ?? {};

  const isAllowed = permissions[resource]?.includes(action);

  return <>{isAllowed ? children : fallback}</>;
};

export default CanAccess;
