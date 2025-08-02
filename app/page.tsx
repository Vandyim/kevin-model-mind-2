import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { models, getTrustScoreBadge } from "@/lib/data"

export default function HomePage() {
  const topSixModels = models.slice(0, 6)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">The Trust Index for AI</h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Explore hallucination risk, factual accuracy & answer quality across today's top language models.
        </p>
      </div>

      {/* Mira Description Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 mb-16 shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <img src="/mira-logo.png" alt="Mira" className="h-12 w-auto mr-4" />
          <h2 className="text-2xl font-bold text-gray-900">About Mira</h2>
        </div>
        <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-4">
          <p>
            Mira is a decentralized trust layer for AI that ensures the accuracy and reliability of AI outputs. It
            tackles core issues like hallucinations and bias by using a consensus mechanism across multiple verifier
            models, boosting output accuracy from ~70% to ~97%. This eliminates the need for constant human oversight
            and allows AI to operate autonomously with verified results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Features:</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  • <strong>Decentralized Verification:</strong> Independent AI models validate outputs
                </li>
                <li>
                  • <strong>High-Stakes Use Cases:</strong> Critical sectors like healthcare, law, and finance
                </li>
                <li>
                  • <strong>Economic Impact:</strong> Unlocks trillions in value by reducing errors
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Scale & Impact:</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  • <strong>Mass Adoption:</strong> Over 4 million users
                </li>
                <li>
                  • <strong>Daily Processing:</strong> 3B tokens processed daily
                </li>
                <li>
                  • <strong>Ecosystem Integration:</strong> Functions like Chainlink for trust
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center font-medium text-gray-900 mt-6">
            Mira redefines AI reliability, offering a scalable system to verify outputs in real time—making AI not just
            smarter, but trustworthy.
          </p>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {topSixModels.map((model) => {
          const badge = getTrustScoreBadge(model.trustScore)
          return (
            <Card
              key={model.slug}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">{model.name}</CardTitle>
                  <Badge className={badge.color}>{badge.label}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Trust Score - Large Display */}
                <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="text-4xl font-bold text-gray-900 mb-1">{model.trustScore.toFixed(1)}</div>
                  <div className="text-sm text-gray-600 font-medium">Trust Score</div>
                </div>

                {/* Metrics Grid */}
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

                {/* View Profile Button */}
                <Link href={`/models/${model.slug}`}>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Link href="/compare">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-medium transition-all duration-200 hover:shadow-lg"
          >
            🔍 Compare Models
          </Button>
        </Link>
        <Link href="/models">
          <Button
            size="lg"
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-10 py-4 text-lg font-medium transition-all duration-200 hover:shadow-lg bg-transparent"
          >
            📊 View Full Dataset
          </Button>
        </Link>
      </div>
    </div>
  )
}
