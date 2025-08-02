import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { getModelBySlug, getTrustScoreBadge } from "@/lib/data"
import ModelRadarChart from "@/components/radar-chart"

interface ModelProfilePageProps {
  params: {
    slug: string
  }
}

export default function ModelProfilePage({ params }: ModelProfilePageProps) {
  const model = getModelBySlug(params.slug)

  if (!model) {
    notFound()
  }

  const badge = getTrustScoreBadge(model.trustScore)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link href="/models">
        <Button variant="ghost" className="mb-6 -ml-4">
          <ArrowLeft className="w-4 h-4 mr-2" />← Back to Dataset
        </Button>
      </Link>

      {/* Model Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{model.name}</h1>
          <Badge className={badge.color}>{badge.label}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Trust Score - Large Display */}
            <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="text-4xl font-bold text-gray-900 mb-1">{model.trustScore.toFixed(1)}</div>
              <div className="text-sm text-gray-600 font-medium">Trust Score</div>
            </div>

            {/* Detailed Metrics */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-100">
                <div>
                  <div className="font-semibold text-red-800">Hallucination Rate</div>
                  <div className="text-sm text-red-600">Lower is better</div>
                </div>
                <div className="text-2xl font-bold text-red-800">{model.hallucinationRate.toFixed(1)}%</div>
              </div>

              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-100">
                <div>
                  <div className="font-semibold text-green-800">Factual Consistency</div>
                  <div className="text-sm text-green-600">Higher is better</div>
                </div>
                <div className="text-2xl font-bold text-green-800">{model.factualConsistency.toFixed(1)}%</div>
              </div>

              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div>
                  <div className="font-semibold text-blue-800">Answer Rate</div>
                  <div className="text-sm text-blue-600">Response completion rate</div>
                </div>
                <div className="text-2xl font-bold text-blue-800">{model.answerRate.toFixed(1)}%</div>
              </div>

              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div>
                  <div className="font-semibold text-purple-800">Avg Summary Length</div>
                  <div className="text-sm text-purple-600">Words per response</div>
                </div>
                <div className="text-2xl font-bold text-purple-800">{model.avgSummaryLength.toFixed(0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <ModelRadarChart data={model} />
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card className="mt-8">
        <CardContent className="pt-6">
          <p className="text-gray-700 leading-relaxed">
            {model.name} demonstrates a Trust Score of {model.trustScore.toFixed(1)}, calculated by subtracting the
            hallucination rate ({model.hallucinationRate.toFixed(1)}%) from the factual consistency rate (
            {model.factualConsistency.toFixed(1)}%). This model shows {model.answerRate.toFixed(1)}% answer completion
            rate and generates responses with an average length of {model.avgSummaryLength.toFixed(0)} words.
            {model.trustScore > 90 &&
              " This model demonstrates excellent trustworthiness with very low hallucination rates and high factual accuracy."}
            {model.trustScore >= 70 &&
              model.trustScore <= 90 &&
              " This model shows good performance with moderate trustworthiness metrics."}
            {model.trustScore < 70 &&
              " This model may require careful consideration due to higher hallucination rates or lower factual consistency."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
