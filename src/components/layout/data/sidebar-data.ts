import {
  IconChecklist,
  IconLayoutDashboard,
  IconMessages,
  IconNotification,
  IconPalette,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Kobbie',
    email: 'kobbie@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Welfare Portal',
      plan: 'Organizational Welfare Portal',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Track Loan',
          url: '/track-loan',
          icon: IconChecklist,
        },
        {
          title: 'Repayment Schedule',
          url: '/repayment-schedule',
          icon: IconMessages,
        },
        {
          title: 'Hire Purchase',
          url: '/hire-purchase',
          icon: IconUsers,
        },
      ],
    },
    
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
        
          ],
        },
        
      ],
    },
  ],
}
