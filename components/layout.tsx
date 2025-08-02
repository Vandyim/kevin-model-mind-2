"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Twitter } from "lucide-react"
import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div
      className="min-h-screen bg-white relative"
      style={{
        backgroundImage: "url(/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>

      <div className="relative z-10">
        <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-gray-900">
                ModelMind
              </Link>
              <div className="flex items-center space-x-8">
                <div className="flex space-x-8">
                  <Link
                    href="/"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/") ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/compare"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/compare")
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    Compare Models
                  </Link>
                  <Link
                    href="/models"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/models")
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    Full Dataset
                  </Link>
                </div>
                <img src="/mira-logo.png" alt="Mira" className="h-8 w-auto" />
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-white/95 backdrop-blur-sm border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-6">
                <a
                  href="https://x.com/Mira_Network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Mira Network</span>
                </a>
                <a
                  href="https://x.com/Vandyim1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Kevin</span>
                </a>
              </div>
              <p className="text-sm text-gray-500 text-center">© 2025 ModelMind. Info from Hugging Face.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
