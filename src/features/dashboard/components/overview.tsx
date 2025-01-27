import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const generateYearlyData = () => {
  return Array.from({ length: 12 }, (_, index) => ({
    name: new Date(0, index).toLocaleString('en', { month: 'short' }),
    total: Math.floor(Math.random() * 5000) + 1000,
  }));
};

const yearlyData = {
  2021: generateYearlyData(),
  2022: generateYearlyData(),
  2023: generateYearlyData(),
  2024: generateYearlyData(),
  2025: generateYearlyData(),
};

export function Overview() {
  const [selectedYear, setSelectedYear] = useState<keyof typeof yearlyData>(2025);

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-start">
      {/* Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={yearlyData[selectedYear]}>
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
        {Object.keys(yearlyData).map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year as unknown as keyof typeof yearlyData)}
            className={`text-sm px-2 py-1 rounded-lg ${
              Number(year) === selectedYear
                ? 'bg-primary text-blue'
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
