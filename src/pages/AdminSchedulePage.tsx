import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  speaker?: string;
  location: string;
}

interface ScheduleData {
  day: string;
  events: ScheduleEvent[];
}

export default function ScheduleAdminPanel() {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

  const fetchSchedule = async () => {
    try {
      const res = await axios.get("http://192.168.186.252:5000/api/schedule");
      setScheduleData(res.data);
    } catch (err) {
      console.error("Error fetching schedule", err);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleChange = (
    dayIndex: number,
    eventIndex: number,
    field: keyof ScheduleEvent,
    value: string
  ) => {
    const newSchedule = [...scheduleData];
    newSchedule[dayIndex].events[eventIndex][field] = value;
    setScheduleData(newSchedule);
  };

  const handleAddEvent = (dayIndex: number) => {
    const newSchedule = [...scheduleData];
    newSchedule[dayIndex].events.push({
      time: "",
      title: "",
      description: "",
      location: "",
      speaker: "",
    });
    setScheduleData(newSchedule);
  };

  const handleRemoveEvent = (dayIndex: number, eventIndex: number) => {
    const newSchedule = [...scheduleData];
    newSchedule[dayIndex].events.splice(eventIndex, 1);
    setScheduleData(newSchedule);
  };

  const handleSaveDay = async (day: string, events: ScheduleEvent[]) => {
    try {
      await axios.put(`http://192.168.186.252:5000/api/schedule/${day}`, {
        events,
      });
      alert(`Schedule for ${day} updated successfully!`);
    } catch (err) {
      console.error("Error updating schedule", err);
      alert("Failed to update schedule.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Schedule Admin Panel</h1>

      <Tabs defaultValue={scheduleData[0]?.day || ""}>
        <TabsList className="flex justify-center mb-6 flex-wrap gap-2">
          {scheduleData.map((day) => (
            <TabsTrigger key={day.day} value={day.day}>
              {day.day.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {scheduleData.map((day, dayIndex) => (
          <TabsContent key={day.day} value={day.day}>
            <div className="space-y-6">
              {day.events.map((event, eventIndex) => (
                <Card key={eventIndex}>
                  <CardContent className="p-4 space-y-3">
                    <Input
                      placeholder="Time"
                      value={event.time}
                      onChange={(e) =>
                        handleChange(dayIndex, eventIndex, "time", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Title"
                      value={event.title}
                      onChange={(e) =>
                        handleChange(dayIndex, eventIndex, "title", e.target.value)
                      }
                    />
                    <Textarea
                      placeholder="Description"
                      value={event.description}
                      onChange={(e) =>
                        handleChange(dayIndex, eventIndex, "description", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Speaker (optional)"
                      value={event.speaker || ""}
                      onChange={(e) =>
                        handleChange(dayIndex, eventIndex, "speaker", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Location"
                      value={event.location}
                      onChange={(e) =>
                        handleChange(dayIndex, eventIndex, "location", e.target.value)
                      }
                    />
                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveEvent(dayIndex, eventIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-center">
                <Button onClick={() => handleAddEvent(dayIndex)}>Add Event</Button>
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl"
                  onClick={() => handleSaveDay(day.day, day.events)}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
