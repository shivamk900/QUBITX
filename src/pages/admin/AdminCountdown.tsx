import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"; // Added useToast

const API_URL = "https://qubitx-backend.onrender.com/api/countdown";

const AdminCountdown = () => {
  const [date, setDate] = useState(""); // format: YYYY-MM-DD
  const [time, setTime] = useState(""); // format: HH:MM
  const { toast } = useToast(); // Destructure toast

  useEffect(() => {
    const fetchCountdown = async () => {
      try {
        const res = await axios.get(API_URL);
        const dateObj = new Date(res.data.endDate);
        setDate(dateObj.toISOString().slice(0, 10)); // YYYY-MM-DD
        setTime(dateObj.toISOString().slice(11, 16)); // HH:MM
      } catch (err) {
        console.error("Failed to fetch countdown date", err);
      }
    };
    fetchCountdown();
  }, []);

  const handleSave = async () => {
    const iso = new Date(`${date}T${time}:00Z`).toISOString(); // Combine & save as ISO
    try {
      await axios.put(API_URL, { endDate: iso });
      toast({
        title: "Success",
        description: "Countdown end date updated successfully!",
      }); // Replaced alert with toast
    } catch (err) {
      console.error("Failed to update countdown date", err);
      toast({
        title: "Error",
        description: "Failed to save countdown end date.",
      }); // Replaced alert with toast
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin - Edit Countdown</h1>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm text-gray-500">Date:</span>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm text-gray-500">Time:</span>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminCountdown;
