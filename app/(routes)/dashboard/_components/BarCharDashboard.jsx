import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarCharDashboard = ({ budgetList }) => {
  return (
    <div className="bg-black rounded-lg p-5">
      <h2 className="text-lg font-bold text-white mb-3">Activity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={budgetList}
          margin={{ top: 8 }}
        >
          {/* Axes with white tick text */}
          <XAxis dataKey="name" tick={{ fill: '#fff' }} />
          <YAxis tick={{ fill: '#fff' }} />

          {/* Tooltip with custom styling */}
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />

          {/* Legend text color */}
          <Legend wrapperStyle={{ color: '#fff' }} />

          {/* Bars */}
          <Bar dataKey="totalSpend" stackId="a" fill="#4c1d95" />
          <Bar dataKey="amount" stackId="a" fill="#1e1b4b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarCharDashboard
