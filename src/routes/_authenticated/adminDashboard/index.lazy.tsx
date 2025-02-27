import { createLazyFileRoute } from '@tanstack/react-router'
import AdminDashboard from '@/features/adminDashboard'

export const Route = createLazyFileRoute('/_authenticated/adminDashboard/')({
  component: AdminDashboard,
})
