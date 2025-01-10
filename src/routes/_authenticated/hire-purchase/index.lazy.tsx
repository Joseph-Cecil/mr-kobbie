import { createLazyFileRoute } from '@tanstack/react-router'
import Users from '@/features/hire-purchase'

export const Route = createLazyFileRoute('/_authenticated/hire-purchase/')({
  component: Users,
})
