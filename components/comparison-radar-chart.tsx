"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts"
import type { ModelData } from "@/lib/data"

interface ComparisonRadarChartProps {
  modelA: ModelData
  modelB: ModelData
}

export default function ComparisonRadarChart({ modelA, modelB }: ComparisonRadarChartProps) {
  const chartData = [
    {
      metric: "Factual Consistency",
      modelA: modelA.factualConsistency,
      modelB: modelB.factualConsistency,
    },
    {
      metric: "Answer Rate",
      modelA: modelA.answerRate,
      modelB: modelB.answerRate,
    },
    {
      metric: "Summary Length",
      modelA: Math.min(modelA.avgSummaryLength, 100),
      modelB: Math.min(modelB.avgSummaryLength, 100),
    },
    {
      metric: "Low Hallucination",
      modelA: 100 - modelA.hallucinationRate,
      modelB: 100 - modelB.hallucinationRate,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" className="text-sm" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
        <Radar name={modelA.name} dataKey="modelA" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
        <Radar name={modelB.name} dataKey="modelB" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}
