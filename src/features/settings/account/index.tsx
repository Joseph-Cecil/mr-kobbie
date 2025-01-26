import ContentSection from '../components/content-section'
import { AccountForm } from './account-form'

export default function SettingsAccount() {
  return (
    <ContentSection
      title='Account'
      desc='Find your account Details. You cannot update, Kindly contact administrator to make any changes.'
    >
      <AccountForm />
    </ContentSection>
  )
}
