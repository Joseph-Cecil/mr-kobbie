/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchStaffData } from '@/api/userApi'; 
import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const months = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

export function Overview() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [staff, setStaff] = useState(null);
  const [yearlyData, setYearlyData] = useState<Record<number, { name: string; total: number }[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStaffData = async () => {
      try {
        const data = await fetchStaffData();
        setStaff(data);

        // Transform contributions into chart data
        const contributions = data?.contributions || {};
        const transformedData = months.map(month => ({
          name: month.slice(0, 3), // Shortened Month (e.g., "JAN")
          total: contributions[month] || 0, // Default to 0 if no data
        }));

        setYearlyData({ [selectedYear]: transformedData });
      } catch (err) {
        setError("Failed to load staff data.");
      } finally {
        setLoading(false);
      }
    };

    loadStaffData();
  }, [selectedYear]);

  if (loading) return <p>Loading staff data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-start">
      {/* Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={yearlyData[selectedYear] || []}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Year Selector */}
      <div className="sm:ml-4 mt-4 sm:mt-0 flex sm:flex-col sm:space-y-2 space-x-2 sm:space-x-0">
        {[selectedYear].map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`text-sm px-2 py-1 rounded-lg ${
              year === selectedYear
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-neutral-800 text-black dark:text-white'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}
