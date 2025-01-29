import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useUsers } from '../context/users-context'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  return (
    <div className='flex gap-2'>
      <Button
        style={{color:'whitesmoke'}}
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Set Interest</span> <IconMailPlus size={18} />
      </Button>
      <Button style={{color:'whitesmoke'}} className='space-x-1' onClick={() => setOpen('add')}>
        <span>Register Staff</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
