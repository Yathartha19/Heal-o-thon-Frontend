"use client"

import { useState } from "react"
import { Bell, Calendar, Clock, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Reminder = {
  id: string
  title: string
  description: string
  date: string
  time: string
  type: "medication" | "appointment" | "test" | "other"
  active: boolean
}

export function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Take Blood Pressure Medication",
      description: "Take 1 tablet with water",
      date: "2023-05-15",
      time: "08:00",
      type: "medication",
      active: true,
    },
    {
      id: "2",
      title: "Dr. Smith Appointment",
      description: "Annual checkup",
      date: "2023-05-20",
      time: "14:30",
      type: "appointment",
      active: true,
    },
    {
      id: "3",
      title: "Blood Test",
      description: "Fasting required",
      date: "2023-05-25",
      time: "09:00",
      type: "test",
      active: true,
    },
  ])

  const [newReminder, setNewReminder] = useState<Omit<Reminder, "id" | "active">>({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "medication",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddReminder = () => {
    const reminder: Reminder = {
      ...newReminder,
      id: Math.random().toString(36).substring(2, 9),
      active: true,
    }

    setReminders([...reminders, reminder])
    setNewReminder({
      title: "",
      description: "",
      date: "",
      time: "",
      type: "medication",
    })
    setIsDialogOpen(false)
  }

  const toggleReminderActive = (id: string) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, active: !reminder.active } : reminder)),
    )
  }

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Bell className="h-4 w-4" />
      case "appointment":
        return <Calendar className="h-4 w-4" />
      case "test":
        return <Clock className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "medication":
        return "bg-blue-100 text-blue-800"
      case "appointment":
        return "bg-green-100 text-green-800"
      case "test":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Reminders</CardTitle>
          <CardDescription>Set reminders for medications, appointments, and tests</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Reminder</DialogTitle>
              <DialogDescription>Create a new reminder for your health activities</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Reminder title"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description"
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newReminder.date}
                    onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newReminder.type}
                  onValueChange={(value: "medication" | "appointment" | "test" | "other") =>
                    setNewReminder({ ...newReminder, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medication">Medication</SelectItem>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddReminder} disabled={!newReminder.title || !newReminder.date}>
                Add Reminder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reminders.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">No reminders set. Add your first reminder.</div>
          ) : (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  reminder.active ? "bg-background" : "bg-muted/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-2 ${getTypeColor(reminder.type)}`}>{getTypeIcon(reminder.type)}</div>
                  <div>
                    <h4 className={`font-medium ${!reminder.active && "text-muted-foreground"}`}>{reminder.title}</h4>
                    <p className="text-sm text-muted-foreground">{reminder.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(reminder.date).toLocaleDateString()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {reminder.time}
                      </Badge>
                      <Badge className="text-xs capitalize">{reminder.type}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={reminder.active} onCheckedChange={() => toggleReminderActive(reminder.id)} />
                  <Button variant="ghost" size="icon" onClick={() => deleteReminder(reminder.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

