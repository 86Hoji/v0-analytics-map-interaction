'use client'

import { Card } from '@/components/ui/card'
import { AlertTriangle, TrendingDown } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface DashboardKPIProps {
  portfolioVaR?: number
  onRegionSelected?: (region: string) => void
}

export function DashboardKPI({ portfolioVaR = 2500000 }: DashboardKPIProps) {
  const { t } = useLanguage()

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value}`
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* KPI Card 1 - Portfolio VaR */}
      <Card className="bg-gradient-to-br from-red-50/50 to-red-50/25 border-red-200/30 p-6 hover:shadow-md transition-shadow">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Portfolio Value at Risk
            </h3>
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">{formatCurrency(portfolioVaR)}</p>
            <p className="text-xs text-muted-foreground">Estimated loss in worst-case (P10 stress test)</p>
          </div>

          <div className="pt-3 border-t border-red-200/30">
            <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50/50 rounded p-2">
              <TrendingDown className="w-3 h-3" />
              <span>Based on loans located in high-risk regions</span>
            </div>
          </div>
        </div>
      </Card>

      {/* KPI Card 2 - Mock */}
      <Card className="bg-muted/40 border-border p-6 hover:shadow-md transition-shadow flex flex-col justify-center">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Future KPI
          </h3>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-muted-foreground/50">—</p>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </div>
        </div>
      </Card>

      {/* KPI Card 3 - Mock */}
      <Card className="bg-muted/40 border-border p-6 hover:shadow-md transition-shadow flex flex-col justify-center">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Future KPI
          </h3>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-muted-foreground/50">—</p>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
