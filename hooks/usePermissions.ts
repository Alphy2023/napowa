import { useUserStore } from '@/store/user.store';
import { useSession } from 'next-auth/react';

export function usePermissions() {
  const { data: session } = useSession();
  // const {user:currentUser} = useUserStore()
  
  const permissions: Record<string, string[]> = session?.user?.permissions ?? {};

  const hasPermission = (resource: string, action: string) => {
    return permissions[resource]?.includes(action);
  };

  return { permissions, hasPermission };
}
