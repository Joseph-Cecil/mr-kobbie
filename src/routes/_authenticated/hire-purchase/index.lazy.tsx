import { createLazyFileRoute } from '@tanstack/react-router'
import { HirePurchase } from '@/features/hire-purchase'

export const Route = createLazyFileRoute('/_authenticated/hire-purchase/')({
  component: HirePurchase,
})
