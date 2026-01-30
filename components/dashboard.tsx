'use client'

import { Input } from "@/components/ui/input"
import React from "react"
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AlertTriangle, TrendingUp, TrendingDown, Gauge, MapPin, Satellite, BarChart3, Download, Settings, LogOut, AlertCircle, CheckCircle, Plus } from 'lucide-react'
import { CentralAsiaMap } from '@/components/central-asia-map'
import { ProfilePopup } from '@/components/profile-popup'

const sampleNDVIData = [
  { month: 'Jan', ndvi: 0.3, expected: 0.35 },
  { month: 'Feb', ndvi: 0.42, expected: 0.45 },
  { month: 'Mar', ndvi: 0.55, expected: 0.58 },
  { month: 'Apr', ndvi: 0.68, expected: 0.65 },
  { month: 'May', ndvi: 0.75, expected: 0.74 },
  { month: 'Jun', ndvi: 0.78, expected: 0.76 },
  { month: 'Jul', ndvi: 0.72, expected: 0.77 },
]

const sampleYieldData = [
  { year: '2019', yield: 45 },
  { year: '2020', yield: 48 },
  { year: '2021', yield: 52 },
  { year: '2022', yield: 50 },
  { year: '2023', yield: 55 },
  { year: '2024', yield: 53 },
]

const sampleAssets = [
  { id: 'A001', name: 'Asset 001', crop: 'Wheat', location: 'Punjab, India', risk: 'Low', confidence: 92, lastAnalysis: '2024-01-15' },
  { id: 'A002', name: 'Asset 002', crop: 'Cotton', location: 'Sindh, Pakistan', risk: 'Moderate', confidence: 85, lastAnalysis: '2024-01-14' },
  { id: 'A003', name: 'Asset 003', crop: 'Rice', location: 'Andhra Pradesh, India', risk: 'High', confidence: 78, lastAnalysis: '2024-01-10' },
  { id: 'A004', name: 'Asset 004', crop: 'Cotton', location: 'Kunduz, Tajikistan', risk: 'Low', confidence: 88, lastAnalysis: '2024-01-12' },
]

const portfolioStats = {
  totalAssets: 4,
  cropsDistribution: { Wheat: 1, Cotton: 2, Rice: 1 },
  avgYieldAnomaly: -2.1,
  assetsAtHighRisk: 1,
  lastUpdate: '2024-01-15 14:32 UTC',
}

const alerts = [
  { id: 1, type: 'drought', field: 'Andhra Pradesh, India', message: 'District X crossed drought threshold. Crop failure probability: 32%', severity: 'high' },
  { id: 2, type: 'yield', field: 'Sindh, Pakistan', message: 'Yield anomaly detected: -4.2% vs 5-year average. NDVI trending below baseline', severity: 'medium' },
  { id: 3, type: 'health', field: 'Punjab, India', message: 'NDVI peaked early → early harvest expected. Monitor maturity dates.', severity: 'low' },
]

const sampleFields = [
  { id: 'F001', location: 'Kunduz, Tajikistan', crop: 'Cotton', risk: 'Moderate', lastAnalysis: '2024-01-15' },
  { id: 'F002', location: 'Punjab, India', crop: 'Wheat', risk: 'Low', lastAnalysis: '2024-01-14' },
  { id: 'F003', location: 'Sindh, Pakistan', crop: 'Cotton', risk: 'Moderate', lastAnalysis: '2024-01-10' },
  { id: 'F004', location: 'Andhra Pradesh, India', crop: 'Rice', risk: 'High', lastAnalysis: '2024-01-12' },
]

function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Global Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Overall Risk Score</p>
              <h3 className="text-4xl font-bold text-foreground mt-2">Moderate</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Gauge className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <p className="text-sm text-muted-foreground">Portfolio contains {portfolioStats.totalAssets} assets</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Confidence Level</p>
              <h3 className="text-4xl font-bold text-foreground mt-2">86%</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-sm text-muted-foreground">Based on 47 satellite observations</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Status Indicator</p>
              <h3 className="text-2xl font-bold text-foreground mt-2 flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-orange-500" />
                Monitoring
              </h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <Satellite className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Last updated: {portfolioStats.lastUpdate}</p>
          </div>
        </Card>
      </div>

      {/* Portfolio Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border p-4">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Assets</p>
          <p className="text-3xl font-bold text-foreground mt-2">{portfolioStats.totalAssets}</p>
          <p className="text-xs text-muted-foreground mt-1">Under active monitoring</p>
        </Card>

        <Card className="border-border p-4">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Portfolio Value</p>
          <p className="text-3xl font-bold text-foreground mt-2">$2.4M</p>
          <p className="text-xs text-muted-foreground mt-1">Total exposure</p>
        </Card>

        <Card className="border-border p-4">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Value at Risk</p>
          <div className="flex items-center gap-1 mt-2">
            <AlertTriangle className="w-5 h-5 text-accent" />
            <p className="text-3xl font-bold text-accent">$340K</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{portfolioStats.assetsAtHighRisk} high-risk assets</p>
        </Card>

        <Card className="border-border p-4">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Risk Distribution</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-green-600 font-semibold">45%</span>
            <span className="text-xs text-orange-600 font-semibold">41%</span>
            <span className="text-xs text-red-600 font-semibold">14%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Low / Moderate / High</p>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="bg-background border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Risk Alerts (Last 7 Days)</h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border flex gap-3 ${
                alert.severity === 'high'
                  ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50'
                  : alert.severity === 'medium'
                    ? 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900/50'
                    : 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/50'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {alert.severity === 'high' ? (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                ) : alert.severity === 'medium' ? (
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-foreground">{alert.field}</p>
                <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function PortfolioSection() {
  const [filterRisk, setFilterRisk] = useState<string>('all')
  const [filterCrop, setFilterCrop] = useState<string>('all')
  const [csvUploadMode, setCsvUploadMode] = useState(false)

  const filteredAssets = sampleAssets.filter(
    (asset) =>
      (filterRisk === 'all' || asset.risk.toLowerCase() === filterRisk) &&
      (filterCrop === 'all' || asset.crop.toLowerCase() === filterCrop),
  )

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('[v0] CSV file uploaded:', file.name)
      setCsvUploadMode(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Asset Portfolio</h2>
          <p className="text-sm text-muted-foreground mt-1">Regional risk assessment and exposure management</p>
        </div>
        <Button 
          onClick={() => setCsvUploadMode(!csvUploadMode)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        >
          <Download className="w-4 h-4" />
          Import CSV
        </Button>
      </div>

      {/* CSV Upload Mode */}
      {csvUploadMode && (
        <Card className="bg-background border-border p-6 border-primary/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Import Assets from CSV</h3>
          <p className="text-sm text-muted-foreground mb-4">Expected columns: Region, Crop, Exposure (USD), Maturity Date (optional)</p>
          <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <p className="text-foreground font-medium">Click to upload CSV</p>
              <p className="text-sm text-muted-foreground mt-1">or drag and drop</p>
            </label>
          </div>
          <Button 
            onClick={() => setCsvUploadMode(false)}
            variant="outline"
            className="mt-4 w-full"
          >
            Cancel
          </Button>
        </Card>
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Filter by Risk Level</label>
          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Filter by Crop Type</label>
          <Select value={filterCrop} onValueChange={setFilterCrop}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Crops</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="corn">Corn</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="cotton">Cotton</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Assets Grid */}
      {filteredAssets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((field, idx) => (
            <Card key={field.id} className="bg-background border-border p-6 hover:border-primary/50 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{field.location}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{field.crop}</p>
                </div>
                <Badge
                  className={
                    field.risk === 'Low'
                      ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                      : field.risk === 'Moderate'
                        ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                  }
                >
                  {field.risk} Risk
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Exposure</span>
                  <span className="font-mono text-foreground font-semibold">${(300 + idx * 50).toLocaleString()}K</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Yield Anomaly</span>
                  <div className="flex items-center gap-1">
                    {field.risk === 'High' ? (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    )}
                    <span className="font-mono text-foreground">{field.risk === 'High' ? '-5.2' : '-2.1'}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">District Level</span>
                  <span className="text-foreground font-medium">Admin-2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Analysis Date</span>
                  <span className="text-foreground text-xs">{field.lastAnalysis}</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full border-border text-primary hover:bg-primary/10 bg-transparent">
                View Details
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-background border-border p-12 text-center">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium">No assets match your filters</p>
          <p className="text-muted-foreground text-sm">Create your first asset by analyzing a location in the Analytics tab or importing a CSV</p>
        </Card>
      )}
    </div>
  )
}

function AnalyticsSection() {
  const [lat, setLat] = useState('36.7372')
  const [lon, setLon] = useState('69.2081')
  const [crop, setCrop] = useState('cotton')
  const [season, setSeason] = useState('2024')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [assetAdded, setAssetAdded] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [mapClicked, setMapClicked] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('')

  const districtMap: Record<string, string> = {
    '36.7372,69.2081': 'Kunduz District, Tajikistan',
    '31.5497,74.3436': 'Lahore District, Pakistan',
    '28.6139,77.2090': 'Delhi District, India',
    '23.1815,79.9864': 'Indore District, India',
  }

  const handleMapClick = () => {
    setMapClicked(true)
    setTimeout(() => setMapClicked(false), 2000)
  }

  const handleLocationSelect = (selectedLat: string, selectedLon: string, location: string) => {
    setLat(selectedLat)
    setLon(selectedLon)
    setSelectedLocation(location)
    setShowMap(false)
    console.log('[v0] Location selected:', location, selectedLat, selectedLon)
  }

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsAnalyzing(false)
    const key = `${lat},${lon}`
    const district = districtMap[key] || `Location at ${lat}, ${lon}`
    setAnalysisResult({
      district,
      region: 'South Asia',
      riskCategory: 'Moderate',
      yieldAnomaly: -2.4,
      p50: 1850,
      p10: 1420,
      recommendation: 'Regional drought risk: 35%. Crop failure probability: 18%. Monitor precipitation patterns.',
    })
    setAnalysisComplete(true)
  }

  const handleAddAsset = async () => {
    setAssetAdded(true)
    setTimeout(() => {
      setAnalysisComplete(false)
      setAssetAdded(false)
      setLat('36.7372')
      setLon('69.2081')
      setCrop('cotton')
      setAnalysisResult(null)
    }, 1500)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Risk Analytics</h2>
        <p className="text-sm text-muted-foreground mt-2">Analyze regional risk and add assets to your portfolio</p>
      </div>

      {/* Map Selector Toggle */}
      {!showMap && (
        <Button 
          onClick={() => setShowMap(true)}
          className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 py-5 font-semibold rounded-lg mb-2 transition-all"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Open Interactive Map to Select Location
        </Button>
      )}

      {/* Interactive Map Section */}
      {showMap && (
        <Card className="bg-background border border-border/50 shadow-md p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Select Location from Map</h3>
              <p className="text-sm text-muted-foreground mt-1">Choose a country, region, and optional subregion</p>
            </div>
            <Button 
              onClick={() => setShowMap(false)}
              variant="outline"
              className="text-sm"
            >
              Close Map
            </Button>
          </div>
          <CentralAsiaMap onLocationSelect={handleLocationSelect} />
        </Card>
      )}

      {/* Location & Asset Details Input - Primary Focus */}
      <Card className="bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Location & Asset Details</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedLocation ? `Selected: ${selectedLocation}` : 'Enter coordinates and select crop parameters'}
            </p>
          </div>
          <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xs font-semibold text-primary">Step 1</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Latitude</label>
            <Input
              type="number"
              step="0.0001"
              placeholder="36.7372"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="bg-input/50 border-border text-foreground focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Longitude</label>
            <Input
              type="number"
              step="0.0001"
              placeholder="69.2081"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="bg-input/50 border-border text-foreground focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Crop Type</label>
            <Select value={crop} onValueChange={setCrop}>
              <SelectTrigger className="bg-input/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Season</label>
            <Select value={season} onValueChange={setSeason}>
              <SelectTrigger className="bg-input/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="2024">Current (2024)</SelectItem>
                <SelectItem value="2023">Historical (2023)</SelectItem>
                <SelectItem value="2022">Historical (2022)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing || !lat || !lon}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 font-semibold rounded-lg text-base shadow-sm hover:shadow-md transition-all"
        >
          {isAnalyzing ? 'Running Analysis...' : 'Analyze Risk'}
        </Button>
      </Card>

      {/* Analysis Results & Interactive Map Grid */}
      {analysisComplete && analysisResult && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Results Summary */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/0 border border-primary/20 shadow-sm p-8 lg:col-span-1">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Analysis Results</h3>
              <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="text-xs font-semibold text-green-600">Complete</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card/50 rounded-lg p-3 border border-border/50">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">District</p>
                <p className="font-semibold text-foreground text-sm">{analysisResult.district}</p>
              </div>

              <div className="bg-card/50 rounded-lg p-3 border border-border/50">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Risk Level</p>
                <Badge className="mt-1 bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                  {analysisResult.riskCategory}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-card/50 rounded-lg p-3 border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Yield Anomaly</p>
                  <p className="font-mono text-foreground font-semibold text-sm">{analysisResult.yieldAnomaly}%</p>
                </div>
                <div className="bg-card/50 rounded-lg p-3 border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground mb-1">p50 Yield</p>
                  <p className="font-mono text-foreground font-semibold text-sm">{analysisResult.p50}</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/50 rounded-lg p-4 mt-4">
                <p className="text-xs font-semibold text-foreground mb-2">AI Recommendation</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{analysisResult.recommendation}</p>
              </div>

              <Button
                onClick={handleAddAsset}
                disabled={assetAdded}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 mt-6 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all"
              >
                {assetAdded ? '✓ Saved to Portfolio' : 'Add to Portfolio'}
              </Button>
            </div>
          </Card>

          {/* Right: Interactive Map */}
          <Card className="lg:col-span-2 border border-border/50 shadow-sm overflow-hidden bg-background p-0">
            <div 
              onClick={handleMapClick}
              className="h-96 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-primary/3 transition bg-gradient-to-br from-primary/3 to-secondary/3"
            >
              <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(90, 140, 79, 0.1) 0%, transparent 50%)'}} />
              <div className="relative text-center space-y-4 z-10">
                <MapPin className="w-16 h-16 text-primary mx-auto opacity-50" />
                <div>
                  <p className="text-foreground font-semibold">
                    {mapClicked ? 'Location Confirmed' : 'Interactive Map View'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {mapClicked ? '✓ Pin placed on map' : 'Location: ' + lat + ', ' + lon}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Initial State - Map Placeholder */}
      {!analysisComplete && (
        <Card className="border border-border/50 shadow-sm overflow-hidden bg-background p-0">
          <div 
            onClick={handleMapClick}
            className="h-96 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-primary/3 transition bg-gradient-to-br from-primary/3 to-secondary/3"
          >
            <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(90, 140, 79, 0.1) 0%, transparent 50%)'}} />
            <div className="relative text-center space-y-4 z-10">
              <MapPin className="w-16 h-16 text-primary mx-auto opacity-50" />
              <div>
                <p className="text-foreground font-semibold">Interactive Map</p>
                <p className="text-sm text-muted-foreground mt-2">Click here or run analysis above to view location on map</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export function Dashboard({ onNavigateToLanding }: { onNavigateToLanding?: () => void }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { user, logout } = useAuth()

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email[0].toUpperCase() || 'U'

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button 
              onClick={onNavigateToLanding}
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Satellite className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">AgroRisk</h1>
            </button>

  <ProfilePopup 
    user={{
      name: user?.name || user?.email.split('@')[0] || 'User',
      email: user?.email || '',
      organization: 'AgroRisk Platform',
      role: 'Risk Analyst'
    }}
    onLogout={logout}
  />
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-b-0 rounded-none h-auto gap-4 p-0 w-full justify-start">
  <TabsTrigger
  value="dashboard"
  className="rounded-lg px-4 py-2 text-muted-foreground data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium text-sm transition-all duration-200 hover:text-foreground hover:bg-muted/50 border-0 shadow-none"
  >
  Dashboard
  </TabsTrigger>
  <TabsTrigger
  value="portfolio"
  className="rounded-lg px-4 py-2 text-muted-foreground data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium text-sm transition-all duration-200 hover:text-foreground hover:bg-muted/50 border-0 shadow-none"
  >
  Portfolio
  </TabsTrigger>
  <TabsTrigger
  value="analytics"
  className="rounded-lg px-4 py-2 text-muted-foreground data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium text-sm transition-all duration-200 hover:text-foreground hover:bg-muted/50 border-0 shadow-none"
  >
  Analytics
  </TabsTrigger>
  <TabsTrigger
  value="fields"
  className="rounded-lg px-4 py-2 text-muted-foreground data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium text-sm transition-all duration-200 hover:text-foreground hover:bg-muted/50 border-0 shadow-none"
  >
  Fields
  </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'portfolio' && <PortfolioSection />}
        {activeTab === 'analytics' && <AnalyticsSection />}
        {activeTab === 'fields' && <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Your Fields</h2>
            <p className="text-sm text-muted-foreground mt-2">Analyzed locations and their risk assessments</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sampleFields.map((field) => (
              <Card key={field.id} className="bg-background border border-border/50 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">Location</p>
                    <p className="font-semibold text-foreground">{field.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">{field.coordinates}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">Crop</p>
                      <p className="font-semibold text-foreground capitalize">{field.crop}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">Risk Level</p>
                      <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                        {field.risk}
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-5">
                    View on Map
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>}
      </main>
    </div>
  )
}
