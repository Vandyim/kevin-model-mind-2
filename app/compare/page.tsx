"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { models, getTrustScoreBadge, type ModelData } from "@/lib/data"
import ComparisonRadarChart from "@/components/comparison-radar-chart"

export default function ComparePage() {
  const [modelA, setModelA] = useState<ModelData | null>(null)
  const [modelB, setModelB] = useState<ModelData | null>(null)

  const handleModelAChange = (slug: string) => {
    const model = models.find((m) => m.slug === slug)
    setModelA(model || null)
  }

  const handleModelBChange = (slug: string) => {
    const model = models.find((m) => m.slug === slug)
    setModelB(model || null)
  }

  const getWinner = () => {
    if (!modelA || !modelB) return null
    return modelA.trustScore > modelB.trustScore ? modelA : modelB
  }

  const winner = getWinner()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Compare Models</h1>
        <p className="text-gray-600">Select two AI models to compare their performance metrics side by side.</p>
      </div>

      {/* Model Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model A</label>
          <Select onValueChange={handleModelAChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select first model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.slug} value={model.slug}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model B</label>
          <Select onValueChange={handleModelBChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select second model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.slug} value={model.slug}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {modelA && modelB && (
        <>
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[modelA, modelB].map((model, index) => {
              const badge = getTrustScoreBadge(model.trustScore)
              const label = index === 0 ? "Model A" : "Model B"

              return (
                <Card key={model.slug} className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500 font-medium">{label}</div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                      </div>
                      <Badge className={badge.color}>{badge.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4">
                      <div className="text-3xl font-bold text-gray-900 mb-1">{model.trustScore.toFixed(1)}</div>
                      <div className="text-sm text-gray-600 font-medium">Trust Score</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                        <div className="font-semibold text-red-800">{model.hallucinationRate.toFixed(1)}%</div>
                        <div className="text-red-600 text-xs">Hallucination Rate</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                        <div className="font-semibold text-green-800">{model.factualConsistency.toFixed(1)}%</div>
                        <div className="text-green-600 text-xs">Factual Consistency</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <div className="font-semibold text-blue-800">{model.answerRate.toFixed(1)}%</div>
                        <div className="text-blue-600 text-xs">Answer Rate</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                        <div className="font-semibold text-purple-800">{model.avgSummaryLength.toFixed(0)}</div>
                        <div className="text-purple-600 text-xs">Avg Summary Length</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Radar Chart Comparison */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ComparisonRadarChart modelA={modelA} modelB={modelB} />
            </CardContent>
          </Card>

          {/* Winner Declaration */}
          {winner && (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="text-center py-8">
                <h3 className="text-2xl font-bold text-green-800 mb-2">Winner: {winner.name}</h3>
                <p className="text-green-700">
                  Based on Trust Score ({winner.trustScore.toFixed(1)} vs{" "}
                  {winner === modelA ? modelB.trustScore.toFixed(1) : modelA.trustScore.toFixed(1)})
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {(!modelA || !modelB) && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Select two models above to see their detailed comparison</p>
        </div>
      )}
    </div>
  )
}
