"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { CSVUploader } from "@/components/ui/csv-uploader"
import { CheckCircle, Play } from "lucide-react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"

// Sample voice agents data
const voiceAgents = [
  {
    id: "riya-wishfin",
    name: "Riya-Wishfin",
    description:
      "Riya is a conversational AI agent for Wishfin that chats in Indian English or Hinglish to offer pre-approved Tata Capital personal loans and assist with the application.",
    image: "/placeholder.svg?height=100&width=100&query=smiling woman with brown hair",
    language: "British",
  },
  {
    id: "john-phonepe",
    name: "John-phonepe",
    description:
      "John is a sales agent for Phone Pay. His task is to sell Phone Pay payment gateway to the user. He is a very friendly and engaging person and he is very good at selling.",
    image: "/placeholder.svg?height=100&width=100&query=serious man with dark hair",
    language: "British",
  },
  {
    id: "sarah-banking",
    name: "Sarah-Banking",
    description:
      "Sarah specializes in banking services. She helps customers understand different account options, credit cards, and investment opportunities with a friendly and professional approach.",
    image: "/placeholder.svg?height=100&width=100&query=professional woman with blonde hair",
    language: "American",
  },
  {
    id: "raj-insurance",
    name: "Raj-Insurance",
    description:
      "Raj is an insurance specialist who explains policy details, coverage options, and helps customers find the right insurance plan for their needs with clear and simple explanations.",
    image: "/placeholder.svg?height=100&width=100&query=indian man with glasses",
    language: "Indian",
  },
]

export default function CreateCampaignPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1 state
  const [campaignName, setCampaignName] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [concurrentCalls, setConcurrentCalls] = useState("0")

  // Step 2 state
  const [selectedAgent, setSelectedAgent] = useState("riya-wishfin")

  const handleClose = () => {
    router.push("/")
  }

  const handleSaveDraft = () => {
    // Save draft data to localStorage
    const draftData = {
      campaignName,
      selectedDate: selectedDate?.toISOString(),
      selectedTime,
      csvFileName: csvFile?.name,
      concurrentCalls,
      selectedAgent,
      currentStep,
      savedAt: new Date().toISOString(),
    }

    localStorage.setItem("campaignDraft", JSON.stringify(draftData))

    console.log("Draft saved:", draftData)
    router.push("/")
  }

  const handleContinue = () => {
    // Move to step 2
    setCurrentStep(2)
  }

  const handleTestCampaign = () => {
    // Test campaign logic would go here
    const campaignData = {
      campaignName,
      selectedDate: selectedDate?.toISOString(),
      selectedTime,
      csvFileName: csvFile?.name,
      concurrentCalls,
      selectedAgent,
      status: "testing",
      createdAt: new Date().toISOString(),
    }

    // Save as completed campaign
    localStorage.setItem("campaignData", JSON.stringify(campaignData))

    console.log("Campaign created:", campaignData)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex justify-end p-4">
        <button onClick={handleClose} className="text-black font-medium hover:text-gray-700">
          CLOSE
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl px-4">
          <h1 className="text-3xl font-bold mb-10 text-center">Create Campaign</h1>

          {/* Progress indicator - Styled to match the first image exactly */}
          <div className="flex items-center justify-center mb-10">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep > 1 ? "bg-black text-white" : "bg-black text-white"}`}
            >
              {currentStep > 1 ? <CheckCircle className="h-6 w-6 text-[#b5d333]" /> : "1"}
            </div>
            <div className="h-[2px] w-80 bg-gray-300 mx-4"></div>
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-medium
                ${currentStep === 2 ? "bg-black text-white" : "bg-gray-200 text-gray-600"}`}
            >
              2
            </div>
          </div>

          {currentStep === 1 ? (
            <>
              <p className="mb-6 text-gray-700">Add your campaign name, schedule the time, upload your CSV file.</p>

              <div className="space-y-6">
                <div>
                  <Input
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Campaign Name"
                    className="w-full h-12 px-4 rounded-md border border-gray-300 focus:border-gray-400 focus:ring-0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <DatePicker date={selectedDate} setDate={setSelectedDate} placeholder="Select Date" />
                  <TimePicker time={selectedTime} setTime={setSelectedTime} placeholder="Select Time" />
                </div>

                <CSVUploader onFileChange={setCsvFile} />

                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="concurrent-calls" className="font-medium">
                      Total Concurrent Calls (Max: 5)
                    </label>
                  </div>
                  <Input
                    id="concurrent-calls"
                    type="number"
                    min="0"
                    max="5"
                    value={concurrentCalls}
                    onChange={(e) => setConcurrentCalls(e.target.value)}
                    className="w-32 h-12 px-4 rounded-md border border-gray-300 focus:border-gray-400 focus:ring-0 text-center"
                  />
                </div>

                <div className="flex justify-between pt-4 gap-4">
                  <Button
                    variant="outline"
                    onClick={handleSaveDraft}
                    className="border-black text-black hover:bg-gray-100 hover:text-black rounded-md h-12 px-6 w-full font-medium"
                  >
                    SAVE DRAFT
                  </Button>
                  <Button
                    onClick={handleContinue}
                    className="bg-black text-[#b5d333] hover:bg-gray-900 rounded-md h-12 px-6 w-full font-medium"
                  >
                    CONTINUE
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="mb-6 text-gray-700">Choose your voice agent to get started.</p>

              {/* Scrollable container for voice agents */}
              <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2">
                {voiceAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`bg-gray-50 rounded-md p-4 ${selectedAgent === agent.id ? "ring-2 ring-[#b5d333]" : ""}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <Image
                          src={agent.image || "/placeholder.svg"}
                          alt={agent.name}
                          width={100}
                          height={100}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold">{agent.name}</h3>
                          <Checkbox
                            checked={selectedAgent === agent.id}
                            onCheckedChange={() => setSelectedAgent(agent.id)}
                            className="data-[state=checked]:bg-[#b5d333] data-[state=checked]:text-black data-[state=checked]:border-[#b5d333]"
                          />
                        </div>
                        <p className="text-gray-700 text-sm mt-1">{agent.description}</p>
                        <div className="flex items-center mt-4 justify-between">
                          <button className="flex items-center bg-black text-white rounded-full p-2">
                            <Play className="h-4 w-4" />
                          </button>
                          <div className="text-sm text-gray-600 ml-2">Voice Sample</div>
                          <div className="flex items-center ml-auto">
                            <Image
                              src={`/placeholder.svg?height=20&width=20&query=${agent.language} flag`}
                              alt={agent.language}
                              width={20}
                              height={20}
                              className="mr-1"
                            />
                            <span className="text-sm text-gray-600">{agent.language}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 gap-4">
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="border-black text-black hover:bg-gray-100 hover:text-black rounded-md h-12 px-6 w-full font-medium"
                >
                  SAVE DRAFT
                </Button>
                <Button
                  onClick={handleTestCampaign}
                  className="bg-black text-[#b5d333] hover:bg-gray-900 rounded-md h-12 px-6 w-full font-medium"
                >
                  TEST CAMPAIGN
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
