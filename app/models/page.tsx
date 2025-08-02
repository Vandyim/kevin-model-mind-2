"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { models, getTrustScoreBadge } from "@/lib/data"
import { ChevronUp, ChevronDown } from "lucide-react"

type SortField = "name" | "hallucinationRate" | "factualConsistency" | "answerRate" | "avgSummaryLength" | "trustScore"
type SortDirection = "asc" | "desc"

export default function ModelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("trustScore")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const filteredAndSortedModels = useMemo(() => {
    const filtered = models.filter((model) => model.name.toLowerCase().includes(searchTerm.toLowerCase()))

    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [searchTerm, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Full Dataset</h1>
        <p className="text-gray-600 mb-6">Complete list of AI models with their trust metrics and performance data.</p>

        <div className="max-w-md">
          <Input
            type="text"
            placeholder="Search models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="font-semibold text-gray-900 hover:bg-gray-100 -ml-4"
                  >
                    Name <SortIcon field="name" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("hallucinationRate")}
                    className="font-semibold text-gray-900 hover:bg-gray-100 -ml-4"
                  >
                    Hallucination Rate <SortIcon field="hallucinationRate" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("factualConsistency")}
                    className="font-semibold text-gray-900 hover:bg-gray-100 -ml-4"
                  >
                    Factual Consistency <SortIcon field="factualConsistency" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("answerRate")}
                    className="font-semibold text-gray-900 hover:bg-gray-100 -ml-4"
                  >
                    Answer Rate <SortIcon field="answerRate" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("avgSummaryLength")}
                    className="font-semibold text-gray-900 hover:bg-gray-100 -ml-4"
                  >
                    Avg Summary Length <SortIcon field="avgSummaryLength" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("trustScore")}
                    className="font-semibold text-gray-900 hover:bg-gray-100 -ml-4"
                  >
                    Trust Score <SortIcon field="trustScore" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedModels.map((model) => {
                const badge = getTrustScoreBadge(model.trustScore)
                return (
                  <tr key={model.slug} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{model.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {model.hallucinationRate.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {model.factualConsistency.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      {model.answerRate.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {model.avgSummaryLength.toFixed(0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{model.trustScore.toFixed(1)}</span>
                        <Badge className={badge.color}>{badge.label}</Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/models/${model.slug}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAndSortedModels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No models found matching your search.</p>
        </div>
      )}
    </div>
  )
}
