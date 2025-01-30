import { useState } from "react";
import { IconAlertTriangle } from '@tabler/icons-react';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { User } from '../data/schema';
import { deleteUser } from "../../../api/adminApi"; // Import deleteUser from API client

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User;
  refetchUsers: () => void; // Add refetchUsers to refresh user list after deletion
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow, refetchUsers }: Props) {
  const [value, setValue] = useState('');

  const handleDelete = async () => {
    if (value.trim() !== currentRow.staffId) return;

    try {
      // Delete the user by calling the deleteUser API function
      await deleteUser(currentRow._id);
      
      // Close the dialog
      onOpenChange(false);

      // Toast notification
      toast({
        title: 'Success!',
        description: `User ${currentRow.firstName} ${currentRow.lastName} has been deleted.`,
      });

      // Refetch users to update the UI
      refetchUsers();
    } catch (error) {
      // Handle error
      // eslint-disable-next-line no-console
      console.log(error);
      toast({
        title: 'Error!',
        description: 'Failed to delete user.',
        variant: 'destructive',
      });
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.staffId}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete User
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.firstName} {currentRow.lastName}</span>?
            <br />
            This action will permanently remove the user with the role of{' '}
            <span className='font-bold'>
              {currentRow.role.toUpperCase()}
            </span>{' '}
            from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter username to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation cannot be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  );
}
