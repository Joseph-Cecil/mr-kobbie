import { createLazyFileRoute } from '@tanstack/react-router'
import ContributionDashboard from '@/features/contributionDashboard'

export const Route = createLazyFileRoute(
  '/_authenticated/contribution-dashboard/',
)({
  component: ContributionDashboard,
})
