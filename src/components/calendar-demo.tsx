'use client'

import { useState } from 'react'
import Calendar from './calendar/calendar'
import { CalendarEvent, Mode } from './calendar/calendar-types'
import { generateMockEvents } from '@/lib/mock-calendar-events'
import { Header } from './layout/header'
import { Search } from './search'
import { ThemeSwitch } from './theme-switch'
import { ProfileDropdown } from './profile-dropdown'
import { Main } from './layout/main'

export default function CalendarDemo() {
  const [events, setEvents] = useState<CalendarEvent[]>(generateMockEvents())
  const [mode, setMode] = useState<Mode>('month')
  const [date, setDate] = useState<Date>(new Date())

  return (<>    <Header sticky>
            <Search />
            <div className='ml-auto flex items-center space-x-4'>
              <ThemeSwitch />
              <ProfileDropdown />
            </div>
          </Header>
          <Main>
    <Calendar
      events={events}
      setEvents={setEvents}
      mode={mode}
      setMode={setMode}
      date={date}
      setDate={setDate}
    />
    </Main>
    </>

  )
}
