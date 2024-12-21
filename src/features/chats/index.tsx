import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CalendarHeatmap } from '@/components/ui/calendar-heatmap'

export default function Tasks() {
  // Local states
  return (
    <>
      <Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className='flex gap-2'>
            
            
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <CalendarHeatmap
  variantClassnames={[
    "text-white hover:text-white bg-green-400 hover:bg-green-400",
    "text-white hover:text-white bg-green-500 hover:bg-green-500",
    "text-white hover:text-white bg-green-700 hover:bg-green-700",
  ]}
  datesPerVariant={[
    [new Date('Jan 1, 2024'), new Date('Jan 15, 2024'), new Date('Feb 18, 2024')],
    [new Date('Jun 12, 2024'), new Date('July 1, 2024'), new Date('Feb 29, 2024'), new Date('May 4, 2024')],
    [new Date('Jan 19, 2024'), new Date('Apr 14, 2024')],
  ]}
/>
<div >
<CalendarHeatmap
  variantClassnames={[
    "text-white hover:text-white bg-green-400 hover:bg-green-400",
    "text-white hover:text-white bg-green-500 hover:bg-green-500",
    "text-white hover:text-white bg-green-700 hover:bg-green-700",
  ]}
  weightedDates={[
    { date: new Date('Jan 1, 2024'), weight: 2 }, { date : new Date('Jan 15, 2024'), weight: 1.5 },
    { date: new Date('Jun 12, 2024'), weight: 8 } , { date: new Date('July 1, 2024'), weight: 5 },
    { date: new Date('Jan 19, 2024'), weight: 6 }, { date: new Date('Apr 19, 2024'), weight: 13.5 }
  ]}
/></div>
        </div>
      </Main>


     
    </>
  )
}
