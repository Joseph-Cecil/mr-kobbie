/* eslint-disable no-console */
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/transaction-history'
import { useNavigate } from '@tanstack/react-router'
import { fetchStaffData, getInterest } from '@/api/userApi'

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalContributions, setTotalContributions] = useState(0);
  const [partialWithdrawal, setPartialWithdrawal] = useState(0);
  const [loanAccess, setLoanAccess] = useState(0);
  const [interestRate, setInterestRate] = useState<number | null>(null); // New state for interest rate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStaffData();

        if (data && data.contributions) {
          const total = data.totalContribution;
          setTotalContributions(total);
          setPartialWithdrawal(total * 0.5); // 50% of contributions
          setLoanAccess(total * 5); // 5 times total contributions
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    // Fetch the interest rate
    const fetchInterestRate = async () => {
      try {
        const interestData = await getInterest(); // Fetch interest rate
        if (interestData && interestData.interest) {
          setInterestRate(interestData.interest); // Update state
        }
      } catch (error) {
        console.error('Error fetching interest rate:', error);
      }
    };

    fetchData();
    fetchInterestRate(); // Fetch interest rate on mount
  }, []);

  return (
    <>
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 -mt-7 flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Staff Dashboard</h1>
          <div className="flex flex-wrap items-center space-x-2 sm:flex-nowrap">
            <Button style={{ color: 'whitesmoke' }} onClick={() => navigate({ to: "/report" })}>
              Go To Reports
            </Button>
          </div>
        </div>

        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>

              {/* Total Contributions */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'># Total Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>₵{totalContributions.toFixed(2)}</div>
                  <p className='text-xs text-muted-foreground'>Yearly Total Contribution.</p>
                </CardContent>
              </Card>

              {/* Partial Withdrawal */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'># Partial Withdrawal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>₵{partialWithdrawal.toFixed(2)}</div>
                  <p className='text-xs text-muted-foreground'>50% of Total Contributions</p>
                </CardContent>
              </Card>

              {/* Loan Access */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'># Loan Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>₵{loanAccess.toFixed(2)}</div>
                  <p className='text-xs text-muted-foreground'>5× Total Deposits</p>
                </CardContent>
              </Card>

              {/* Interest Rate */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'># Interest Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {interestRate !== null ? `${interestRate}%` : 'Loading...'}
                  </div>
                  <p className='text-xs text-muted-foreground'>Current Interest Rate</p>
                </CardContent>
              </Card>

            </div>

            {/* Monthly Contributions & Transaction History */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Monthly Contributions</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>History of every deposit you have made</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  );
}