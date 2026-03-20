'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import CreateMemberDialog from '@/components/admin/create-member-dialog';

interface Member {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  isFirstLogin: boolean;
  twoFactorVerified: boolean;
  lastLoginAt: string | null;
  isLockedOut: boolean;
  createdAt: string;
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/members');

      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }

      const data = await response.json();
      setMembers(data.members);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleMemberCreated = () => {
    setShowCreateDialog(false);
    fetchMembers();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Members Management</h1>
          <p className="text-gray-600 mt-1">Manage organization members and their access</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>Create Member</Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
          <CardDescription>Total members: {members.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading members...</div>
          ) : members.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No members found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>2FA</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      {member.profile.firstName} {member.profile.lastName}
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Badge variant={member.isLockedOut ? 'destructive' : 'default'}>
                        {member.isLockedOut ? 'Locked' : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.twoFactorVerified ? 'default' : 'secondary'}>
                        {member.twoFactorVerified ? 'Verified' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {member.lastLoginAt
                        ? new Date(member.lastLoginAt).toLocaleDateString('en-KE')
                        : 'Never'}
                    </TableCell>
                    <TableCell>
                      {new Date(member.createdAt).toLocaleDateString('en-KE')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CreateMemberDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={handleMemberCreated}
      />
    </div>
  );
}
