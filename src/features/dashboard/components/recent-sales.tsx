import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>28th Decemeber, 2024</p>
            <p className='text-sm text-muted-foreground'>
              Transaction id: 24887236092 - Congratulations, you've deposited ...
            </p>
          </div>
          <div className='font-medium'>+$1,999.00</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarImage src='/avatars/02.png' alt='Avatar' />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
          <p className='text-sm font-medium leading-none'>4th January, 2024 - 9:00 AM</p>
            <p className='text-sm text-muted-foreground'>
              Transaction id: 24887236092 - Congratulations, you've deposited ...
            </p>
          </div>
          <div className='font-medium'>+$39.00</div>
        </div>
      </div>
      

      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
          <p className='text-sm font-medium leading-none'>2nd January, 2024 - 1:45 PM</p>
            <p className='text-sm text-muted-foreground'>
              Transaction id: 24887236092 - Congratulations, you've deposited ...
            </p>
          </div>
          <div className='font-medium'>+$99.00</div>
        </div>
      </div>

      
      
    </div>
  )
}
