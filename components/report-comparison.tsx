"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"

type MetricChange = {
  name: string
  current: number
  previous: number
  unit: string
  normalRange: string
  status: "improved" | "declined" | "stable"
}

export function ReportComparison() {
  const [selectedReport1, setSelectedReport1] = useState("may2023")
  const [selectedReport2, setSelectedReport2] = useState("april2023")

  // Sample data for demonstration
  const metrics: Record<string, MetricChange[]> = {
    bloodwork: [
      {
        name: "Hemoglobin",
        current: 14.2,
        previous: 13.8,
        unit: "g/dL",
        normalRange: "13.5-17.5",
        status: "improved",
      },
      {
        name: "White Blood Cells",
        current: 7.2,
        previous: 7.5,
        unit: "K/uL",
        normalRange: "4.5-11.0",
        status: "stable",
      },
      {
        name: "Platelets",
        current: 210,
        previous: 230,
        unit: "K/uL",
        normalRange: "150-450",
        status: "stable",
      },
      {
        name: "Glucose (Fasting)",
        current: 105,
        previous: 115,
        unit: "mg/dL",
        normalRange: "70-99",
        status: "improved",
      },
    ],
    cholesterol: [
      {
        name: "Total Cholesterol",
        current: 195,
        previous: 210,
        unit: "mg/dL",
        normalRange: "<200",
        status: "improved",
      },
      {
        name: "LDL",
        current: 130,
        previous: 140,
        unit: "mg/dL",
        normalRange: "<100",
        status: "improved",
      },
      {
        name: "HDL",
        current: 45,
        previous: 42,
        unit: "mg/dL",
        normalRange: ">40",
        status: "improved",
      },
      {
        name: "Triglycerides",
        current: 160,
        previous: 150,
        unit: "mg/dL",
        normalRange: "<150",
        status: "declined",
      },
    ],
    vitals: [
      {
        name: "Blood Pressure (Systolic)",
        current: 128,
        previous: 135,
        unit: "mmHg",
        normalRange: "<120",
        status: "improved",
      },
      {
        name: "Blood Pressure (Diastolic)",
        current: 82,
        previous: 85,
        unit: "mmHg",
        normalRange: "<80",
        status: "improved",
      },
      {
        name: "Heart Rate",
        current: 72,
        previous: 75,
        unit: "bpm",
        normalRange: "60-100",
        status: "stable",
      },
      {
        name: "Weight",
        current: 78,
        previous: 80,
        unit: "kg",
        normalRange: "N/A",
        status: "improved",
      },
    ],
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "improved":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "declined":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      case "stable":
        return <Minus className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  const getPercentChange = (current: number, previous: number) => {
    if (previous === 0) return "N/A"
    const change = ((current - previous) / previous) * 100
    return change.toFixed(1) + "%"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Comparison</CardTitle>
        <CardDescription>Compare your health metrics between different reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">First Report</label>
            <Select value={selectedReport1} onValueChange={setSelectedReport1}>
              <SelectTrigger>
                <SelectValue placeholder="Select a report" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="may2023">May 2023 Report</SelectItem>
                <SelectItem value="april2023">April 2023 Report</SelectItem>
                <SelectItem value="march2023">March 2023 Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Second Report</label>
            <Select value={selectedReport2} onValueChange={setSelectedReport2}>
              <SelectTrigger>
                <SelectValue placeholder="Select a report" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="may2023">May 2023 Report</SelectItem>
                <SelectItem value="april2023">April 2023 Report</SelectItem>
                <SelectItem value="march2023">March 2023 Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="bloodwork">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="bloodwork">Bloodwork</TabsTrigger>
            <TabsTrigger value="cholesterol">Cholesterol</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
          </TabsList>

          {Object.entries(metrics).map(([category, metricsList]) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Metric</th>
                      <th className="px-4 py-3 text-left font-medium">Current</th>
                      <th className="px-4 py-3 text-left font-medium">Previous</th>
                      <th className="px-4 py-3 text-left font-medium">Change</th>
                      <th className="px-4 py-3 text-left font-medium">Normal Range</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metricsList.map((metric, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                        <td className="px-4 py-3 font-medium">{metric.name}</td>
                        <td className="px-4 py-3">
                          {metric.current} {metric.unit}
                        </td>
                        <td className="px-4 py-3">
                          {metric.previous} {metric.unit}
                        </td>
                        <td className="px-4 py-3">{getPercentChange(metric.current, metric.previous)}</td>
                        <td className="px-4 py-3">{metric.normalRange}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {getStatusIcon(metric.status)}
                            <span className="ml-1 capitalize">{metric.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

