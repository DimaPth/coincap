import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Chart = () => {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart data={data}>
        <Area dataKey='uv'/>
        <XAxis dataKey='name' />
        <YAxis dataKey='uv' />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export {Chart}