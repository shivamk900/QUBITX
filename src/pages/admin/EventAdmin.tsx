import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const API_URL = "https://qubitx-backend.onrender.com/api/event"; // Update if needed

const EventAdmin = () => {
  const { toast } = useToast();
  const [event, setEvent] = useState({
    title: "",
    tagline: "",
    dates: "",
    location: "",
    format: "",
    fee: "",
    poster: "",
    fallbackPoster: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvent(res.data);
    } catch (err) {
      console.error("Error fetching event info", err);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const handleChange = (key, value) => {
    setEvent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(API_URL, event);
      setEvent(res.data);
      toast({ title: "Saved", description: "Event info updated successfully" });
    } catch (err) {
      console.error("Save failed", err);
      toast({ title: "Error", description: "Failed to update", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">Event Info Admin Panel</h2>

      <Card>
        <CardContent className="p-4 space-y-4">
          <Input
            placeholder="Event Title"
            value={event.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            placeholder="Tagline"
            value={event.tagline}
            onChange={(e) => handleChange("tagline", e.target.value)}
          />
          <Input
            placeholder="Dates (e.g. May 9-10, 2025)"
            value={event.dates}
            onChange={(e) => handleChange("dates", e.target.value)}
          />
          <Input
            placeholder="Location"
            value={event.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
          <Input
            placeholder="Format (e.g. In-person + Virtual Hybrid)"
            value={event.format}
            onChange={(e) => handleChange("format", e.target.value)}
          />
          <Input
            placeholder="Fee (e.g. Free)"
            value={event.fee}
            onChange={(e) => handleChange("fee", e.target.value)}
          />
          <Input
            placeholder="Poster URL"
            value={event.poster}
            onChange={(e) => handleChange("poster", e.target.value)}
          />
          <Input
            placeholder="Fallback Poster URL"
            value={event.fallbackPoster}
            onChange={(e) => handleChange("fallbackPoster", e.target.value)}
          />
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Event Info"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventAdmin;
