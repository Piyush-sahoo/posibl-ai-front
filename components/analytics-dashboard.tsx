"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import { MessageSquare, Phone, Clock, CheckCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler)

export function AnalyticsDashboard() {
  // Chart data for Total Campaign Performance
  const campaignPerformanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Successful Lead",
        data: [8, 15, 12, 28, 48, 50, 20, 25],
        backgroundColor: "#b5d333",
        borderColor: "#b5d333",
        borderWidth: 1,
      },
      {
        label: "Dialed Calls",
        data: [12, 25, 18, 35, 40, 45, 30, 35],
        backgroundColor: "#333333",
        borderColor: "#333333",
        borderWidth: 1,
      },
      {
        label: "Answered",
        data: [6, 18, 15, 22, 35, 38, 25, 28],
        backgroundColor: "#888888",
        borderColor: "#888888",
        borderWidth: 1,
      },
    ],
  }

  // Chart data for Call Insights
  const callInsightsData = {
    labels: ["May 1", "May 10", "May 20"],
    datasets: [
      {
        label: "Total Calls",
        data: [300, 400, 350],
        borderColor: "#333333",
        backgroundColor: "rgba(51, 51, 51, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Connected Call",
        data: [250, 350, 300],
        borderColor: "#b5d333",
        backgroundColor: "rgba(181, 211, 51, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f0f0f0",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Hello Suman 👋</h1>
          <div className="flex items-center text-gray-600">
            <span>Last 6 Months</span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </div>
        <Button className="bg-black text-[#b5d333] hover:bg-gray-900 font-medium">+ CREATE CAMPAIGN</Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Campaigns */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-600 font-medium">Total Campaigns</span>
          </div>
          <div className="text-3xl font-bold mb-4">67</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#b5d333] rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Running</span>
              </div>
              <span className="font-semibold">40</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Paused</span>
              </div>
              <span className="font-semibold">27</span>
            </div>
          </div>
        </div>

        {/* Calls Answered */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Phone className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-600 font-medium">Calls Answered</span>
          </div>
          <div className="text-3xl font-bold mb-4">84</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#b5d333] rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Dialed</span>
              </div>
              <span className="font-semibold">84</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Missed</span>
              </div>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>

        {/* Call Duration */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-600 font-medium">Call Duration</span>
          </div>
          <div className="text-3xl font-bold mb-4">
            104 <span className="text-lg text-gray-600">mins</span>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Avg. Call Duration</div>
            <div className="text-lg font-semibold">114.9 Secs</div>
          </div>
        </div>

        {/* Successful Prospects */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-600 font-medium">Successful Prospects</span>
          </div>
          <div className="text-3xl font-bold mb-4">19</div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Total Prospects</div>
            <div className="text-lg font-semibold">68</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Campaign Performance */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Total Campaign Performance</h3>
            <div className="flex items-center text-gray-600">
              <span>Last 6 Months</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </div>
          </div>
          <div className="h-80">
            <Bar data={campaignPerformanceData} options={chartOptions} />
          </div>
        </div>

        {/* Call Insights */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Call Insights</h3>
            <div className="flex items-center text-gray-600">
              <span>May</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </div>
          </div>
          <div className="h-80">
            <Line data={callInsightsData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Campaign Scoreboard */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Campaign Scoreboard</h3>
        <div className="space-y-4">
          {[
            { name: "01 Sales Campaign", outbound: 1200, connected: 840, engagement: "70%", color: "text-[#b5d333]" },
            {
              name: "02 Marketing Campaign",
              outbound: 1200,
              connected: 840,
              engagement: "60%",
              color: "text-orange-500",
            },
            { name: "03 Bank Campaign", outbound: 1200, connected: 840, engagement: "40%", color: "text-red-500" },
          ].map((campaign, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex-1">
                <h4 className="font-medium">{campaign.name}</h4>
                <div className="flex space-x-8 mt-1">
                  <div>
                    <div className="text-xs text-gray-500">Total Outbound Calls</div>
                    <div className="font-semibold">{campaign.outbound.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Total Connected</div>
                    <div className="font-semibold">{campaign.connected}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Engagement Rate</div>
                    <div className={`font-semibold ${campaign.color}`}>{campaign.engagement}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
