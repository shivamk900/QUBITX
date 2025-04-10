import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Organizer {
  _id?: string;
  name: string;
  role: string;
  image: string;
  socials: {
    linkedin: string;
    twitter: string;
    website: string;
  };
}

const API_URL = 'https://qubitx-backend.onrender.com/api/organizers';

export default function OrganizerAdminPanel() {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);

  const fetchOrganizers = async () => {
    try {
      const res = await axios.get(API_URL);
      setOrganizers(res.data);
    } catch (err) {
      console.error("Error fetching organizers", err);
    }
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const handleChange = (
    index: number,
    field: keyof Organizer | keyof Organizer['socials'],
    value: string
  ) => {
    const updated = [...organizers];
    const socialFields: (keyof Organizer['socials'])[] = ["linkedin", "twitter", "website"];

    if (socialFields.includes(field as keyof Organizer['socials'])) {
      updated[index].socials = {
        ...updated[index].socials,
        [field]: value,
      };
    } else {
      updated[index] = {
        ...updated[index],
        [field as keyof Organizer]: value,
      };
    }

    setOrganizers(updated);
  };

  const handleAddOrganizer = () => {
    setOrganizers((prev) => [
      ...prev,
      {
        name: "",
        role: "",
        image: "",
        socials: {
          linkedin: "",
          twitter: "",
          website: "",
        },
      },
    ]);
  };

  const handleRemoveOrganizer = async (index: number) => {
    const org = organizers[index];
    if (org._id) {
      try {
        await axios.delete(`${API_URL}/${org._id}`);
      } catch (err) {
        console.error("Error deleting organizer", err);
        alert("Failed to delete organizer from server.");
        return;
      }
    }

    setOrganizers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveOrganizer = async (organizer: Organizer, index: number) => {
    try {
      if (organizer._id) {
        await axios.put(`${API_URL}/${organizer._id}`, organizer);
      } else {
        const res = await axios.post(API_URL, organizer);
        const updated = [...organizers];
        updated[index]._id = res.data._id;
        setOrganizers(updated);
      }
      alert("Organizer saved successfully!");
    } catch (err) {
      console.error("Error saving organizer", err);
      alert("Failed to save organizer.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Organizers Admin Panel
      </h1>

      <div className="flex justify-center mb-6">
        <Button onClick={handleAddOrganizer}>Add New Organizer</Button>
      </div>

      {organizers.map((org, index) => (
        <Card key={org._id || index} className="mb-6">
          <CardContent className="p-4 space-y-3">
            <Input
              placeholder="Name"
              value={org.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <Input
              placeholder="Role"
              value={org.role}
              onChange={(e) => handleChange(index, "role", e.target.value)}
            />
            <Input
              placeholder="Image URL"
              value={org.image}
              onChange={(e) => handleChange(index, "image", e.target.value)}
            />
            <Input
              placeholder="LinkedIn"
              value={org.socials.linkedin}
              onChange={(e) => handleChange(index, "linkedin", e.target.value)}
            />
            <Input
              placeholder="Twitter"
              value={org.socials.twitter}
              onChange={(e) => handleChange(index, "twitter", e.target.value)}
            />
            <Input
              placeholder="Website"
              value={org.socials.website}
              onChange={(e) => handleChange(index, "website", e.target.value)}
            />
            <div className="flex justify-between pt-2">
              <Button
                variant="destructive"
                onClick={() => handleRemoveOrganizer(index)}
              >
                Remove
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => handleSaveOrganizer(org, index)}
              >
                Save Organizer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
