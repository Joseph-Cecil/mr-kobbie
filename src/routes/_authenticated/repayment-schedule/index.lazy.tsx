import { createLazyFileRoute } from '@tanstack/react-router'
import Chats from '@/features/repayment-schedule'

export const Route = createLazyFileRoute('/_authenticated/repayment-schedule/')(
  {
    component: Chats,
  },
)
