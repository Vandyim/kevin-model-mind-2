"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

interface RadarChartProps {
  data: {
    hallucinationRate: number
    factualConsistency: number
    answerRate: number
    avgSummaryLength: number
  }
  color?: string
}

export default function ModelRadarChart({ data, color = "#3b82f6" }: RadarChartProps) {
  const chartData = [
    {
      metric: "Factual Consistency",
      value: data.factualConsistency,
    },
    {
      metric: "Answer Rate",
      value: data.answerRate,
    },
    {
      metric: "Summary Length",
      value: Math.min(data.avgSummaryLength, 100), // Cap at 100 for visualization
    },
    {
      metric: "Low Hallucination",
      value: 100 - data.hallucinationRate, // Invert so higher is better
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" className="text-sm" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
        <Radar name="Score" dataKey="value" stroke={color} fill={color} fillOpacity={0.1} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
