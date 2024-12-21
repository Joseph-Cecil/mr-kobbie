import { useState } from 'react'
import { IconDownload, IconPlus } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'

import { Button } from '@/components/ui/button'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { TasksImportDialog } from './components/tasks-import-dialog'
import { TasksMutateDrawer } from './components/tasks-mutate-drawer'
import TasksContextProvider, { TasksDialogType } from './context/tasks-context'
import { Task } from './data/schema'
import { tasks } from './data/tasks'

export default function Tasks() {
  // Local states
  const [currentRow, setCurrentRow] = useState<Task | null>(null)
  const [open, setOpen] = useDialogState<TasksDialogType>(null)

  return (
    <TasksContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {/* ===== Top Heading ===== */}
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
            <h2 className='text-2xl font-bold tracking-tight'>Track Loan</h2>
            <p className='text-muted-foreground'>
              Track All Your Loans
            </p>
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              className='space-x-1'
              onClick={() => setOpen('import')}
            >
              <span>Import</span> <IconDownload size={18} />
            </Button>
            <Button style={{color: 'whitesmoke'}} className='space-x-1' onClick={() => setOpen('create')}>
              <span>Create</span> <IconPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
      </Main>

      <TasksMutateDrawer
        key='task-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <TasksImportDialog
        key='tasks-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      

        
           
       
    </TasksContextProvider>
  )
}
