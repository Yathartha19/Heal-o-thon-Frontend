"use client"

import { useState } from "react"
import Link from "next/link"
import { Activity, Calendar, FileText, MessageSquare, Bell, BarChart, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChatInterface } from "@/components/chat-interface"
import { FileUploader } from "@/components/file-uploader"
import { ReportComparison } from "@/components/report-comparison"
import { Reminders } from "@/components/reminders"
import { Chat } from "@/components/Chat"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [dashboard, setDashboard] = useState(true)
  const [files, setFiles] = useState(false)
  const [chat, setChat] = useState(false)

  const handleDashboard = (value: boolean) => {
    setDashboard(true)
    setFiles(false)
    setChat(false)
  }

  const handleFiles = (value: boolean) => {
    setFiles(true)
    setDashboard(false)
    setChat(false)
  }

  const handleChat = (value: boolean) => {
    setFiles(false)
    setDashboard(false)
    setChat(true)
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="rounded-full">
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-card border-r lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-4 py-6 border-b">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <h1 className="text-xl font-bold">MediAI</h1>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              <Link
                href="#"
                onClick={() => handleDashboard(true)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  dashboard ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
                }`}                
              >
                <Activity className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                onClick={() => handleFiles(true)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  files ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
                }`}   
              >
                <FileText className="mr-3 h-5 w-5" />
                Medical Reports
              </Link>
              <Link
                href="#"
                onClick={() => handleChat(true)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  chat ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
                }`}   
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Chat with AI
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
              >
                <BarChart className="mr-3 h-5 w-5" />
                Health Analytics
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
              >
                <Calendar className="mr-3 h-5 w-5" />
                Appointments
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
              >
                <Bell className="mr-3 h-5 w-5" />
                Reminders
              </Link>
            </nav>
          </div>

          <div className="border-t p-4">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">Aditi H</p>
                <p className="text-xs text-muted-foreground">Patient</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-4 bg-background border-b">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>



        { dashboard ? (
          
          <main className="p-4 md:p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78/100</div>
                <Progress value={78} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground mt-2">Next: Dr. Smith on May 15</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Medication Adherence</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <Progress value={92} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Good adherence rate</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="reports" className="mt-6">
            <TabsContent value="reports" className="mt-6">
              <FileUploader />
            </TabsContent>
            <TabsContent value="chat" className="mt-6">
              <ChatInterface />
            </TabsContent>
            <TabsContent value="compare" className="mt-6">
              <ReportComparison />
            </TabsContent>
            <TabsContent value="reminders" className="mt-6">
              <Reminders />
            </TabsContent>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Your latest medical reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Blood Test Results</p>
                      <p className="text-xs text-muted-foreground">Uploaded on May 1, 2023</p>
                    </div>
                    <Badge className="ml-auto">New</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Cholesterol Panel</p>
                      <p className="text-xs text-muted-foreground">Uploaded on Apr 15, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Annual Physical</p>
                      <p className="text-xs text-muted-foreground">Uploaded on Mar 22, 2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Trends</CardTitle>
                <CardDescription>Your health metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Blood Pressure</p>
                      <span className="text-sm text-green-500">Improving</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Blood Sugar</p>
                      <span className="text-sm text-amber-500">Stable</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Cholesterol</p>
                      <span className="text-sm text-red-500">Needs Attention</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Weight</p>
                      <span className="text-sm text-green-500">On Target</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Diet Recommendations</CardTitle>
                <CardDescription>Based on your latest reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Increase Omega-3 Intake</p>
                      <p className="text-xs text-muted-foreground">
                        Add more fish, flaxseeds, and walnuts to your diet
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-red-100 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-600"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Reduce Sodium</p>
                      <p className="text-xs text-muted-foreground">Limit processed foods and added salt</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Stay Hydrated</p>
                      <p className="text-xs text-muted-foreground">Aim for 8 glasses of water daily</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        ) : (<></>)}

        { files ? (
          <main className="px-6">
            <Tabs defaultValue="reports" className="mt-6">
              <TabsContent value="reports" className="mt-6">
                <FileUploader />
              </TabsContent>
            </Tabs>
            <div></div>
          </main>
        ) : (<></>)}

        { chat ? (
          <Chat />
        ) : (<></>)}

      </div>
    </div>
  )
}

