import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Speaker {
  _id?: string;
  name: string;
  role: string;
  company: string;
  image: string;
  socials: {
    linkedin: string;
    twitter: string;
    website: string;
  };
}

const API_URL = 'https://qubitx-backend.onrender.com/api/speakers';

export default function SpeakerAdminPanel() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  const fetchSpeakers = async () => {
    try {
      const res = await axios.get(API_URL);
      setSpeakers(res.data);
    } catch (err) {
      console.error("Error fetching speakers", err);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const handleChange = (
    index: number,
    field: keyof Speaker | keyof Speaker['socials'],
    value: string
  ) => {
    const updatedSpeakers = [...speakers];
    const socialFields: (keyof Speaker['socials'])[] = ["linkedin", "twitter", "website"];
  
    if (socialFields.includes(field as keyof Speaker['socials'])) {
      updatedSpeakers[index].socials = {
        ...updatedSpeakers[index].socials,
        [field]: value,
      };
    } else {
      updatedSpeakers[index] = {
        ...updatedSpeakers[index],
        [field as keyof Speaker]: value,
      };
    }
  
    setSpeakers(updatedSpeakers);
  };
  

  const handleAddSpeaker = () => {
    setSpeakers((prev) => [
      ...prev,
      {
        name: "",
        role: "",
        company: "",
        image: "",
        socials: {
          linkedin: "",
          twitter: "",
          website: "",
        },
      },
    ]);
  };

  const handleRemoveSpeaker = async (index: number) => {
    const speaker = speakers[index];
    if (speaker._id) {
      try {
        await axios.delete(`${API_URL}/${speaker._id}`);
      } catch (err) {
        console.error("Error deleting speaker", err);
        alert("Failed to delete speaker from server.");
        return;
      }
    }

    setSpeakers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveSpeaker = async (speaker: Speaker, index: number) => {
    try {
      if (speaker._id) {
        await axios.put(`${API_URL}/${speaker._id}`, speaker);
      } else {
        const res = await axios.post(API_URL, speaker);
        const updatedSpeakers = [...speakers];
        updatedSpeakers[index]._id = res.data._id;
        setSpeakers(updatedSpeakers);
      }
      alert("Speaker saved successfully!");
    } catch (err) {
      console.error("Error saving speaker", err);
      alert("Failed to save speaker.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Speaker Admin Panel
      </h1>

      <div className="flex justify-center mb-6">
        <Button onClick={handleAddSpeaker}>Add New Speaker</Button>
      </div>

      {speakers.map((speaker, index) => (
        <Card key={speaker._id || index} className="mb-6">
          <CardContent className="p-4 space-y-3">
            <Input
              placeholder="Name"
              value={speaker.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <Input
              placeholder="Role"
              value={speaker.role}
              onChange={(e) => handleChange(index, "role", e.target.value)}
            />
            <Input
              placeholder="Company"
              value={speaker.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
            />
            <Input
              placeholder="Image URL"
              value={speaker.image}
              onChange={(e) => handleChange(index, "image", e.target.value)}
            />
            <Input
              placeholder="LinkedIn"
              value={speaker.socials.linkedin}
              onChange={(e) => handleChange(index, "linkedin", e.target.value)}
            />
            <Input
              placeholder="Twitter"
              value={speaker.socials.twitter}
              onChange={(e) => handleChange(index, "twitter", e.target.value)}
            />
            <Input
              placeholder="Website"
              value={speaker.socials.website}
              onChange={(e) => handleChange(index, "website", e.target.value)}
            />
            <div className="flex justify-between pt-2">
              <Button
                variant="destructive"
                onClick={() => handleRemoveSpeaker(index)}
              >
                Remove
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => handleSaveSpeaker(speaker, index)}
              >
                Save Speaker
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
