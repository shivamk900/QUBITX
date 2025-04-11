import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast"; // Added useToast

interface Sponsor {
  _id?: string;
  name: string;
  src: string;
  alt: string;
  tier: string;
  order: number;
}

const API_URL = "https://qubitx-backend.onrender.com/api/sponsors"; // Replace with your actual backend

export default function SponsorAdminPanel() {
  const { toast } = useToast(); // Initialize useToast
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const res = await axios.get(API_URL); // removed /flat
      const flatSponsors: Sponsor[] = Object.values(
        res.data
      ).flat() as Sponsor[];
      setSponsors(flatSponsors);
      toast({ title: "Success", description: "Sponsors fetched successfully" }); // Success toast
    } catch (err) {
      console.error("Error fetching sponsors", err);
      toast({ title: "Error", description: "Failed to fetch sponsors", variant: "destructive" }); // Error toast
    }
  };

  const handleChange = (
    index: number,
    field: keyof Sponsor,
    value: string | number
  ) => {
    const updated = [...sponsors];
    updated[index][field as keyof Sponsor] = value as never;
    setSponsors(updated);
  };

  const handleAddSponsor = () => {
    setSponsors((prev) => [
      ...prev,
      {
        name: "",
        src: "",
        alt: "",
        tier: "",
        order: 0,
      },
    ]);
  };

  const handleRemoveSponsor = async (index: number) => {
    const sponsor = sponsors[index];
    if (sponsor._id) {
      try {
        await axios.delete(`${API_URL}/${sponsor._id}`);
        toast({ title: "Success", description: "Sponsor removed successfully" }); // Success toast
      } catch (err) {
        console.error("Error deleting sponsor", err);
        toast({ title: "Error", description: "Failed to delete sponsor", variant: "destructive" }); // Error toast
        return;
      }
    }
    setSponsors((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveSponsor = async (sponsor: Sponsor, index: number) => {
    try {
      if (sponsor._id) {
        await axios.put(`${API_URL}/${sponsor._id}`, sponsor);
      } else {
        const res = await axios.post(API_URL, sponsor);
        const updated = [...sponsors];
        updated[index]._id = res.data._id;
        setSponsors(updated);
      }
      toast({ title: "Success", description: "Sponsor saved successfully" }); // Success toast
    } catch (err: any) {
      console.error("Error saving sponsor", err);
      toast({ title: "Error", description: "Failed to save sponsor", variant: "destructive" }); // Error toast
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Sponsor Admin Panel
      </h1>

      <div className="flex justify-center mb-6">
        <Button onClick={handleAddSponsor}>Add New Sponsor</Button>
      </div>

      {sponsors.map((sponsor, index) => (
        <Card key={sponsor._id || index} className="mb-6">
          <CardContent className="p-4 space-y-3">
            <Input
              placeholder="Name"
              value={sponsor.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <Input
              placeholder="Image URL (src)"
              value={sponsor.src}
              onChange={(e) => handleChange(index, "src", e.target.value)}
            />
            <Input
              placeholder="Alt Text"
              value={sponsor.alt}
              onChange={(e) => handleChange(index, "alt", e.target.value)}
            />
            <Input
              placeholder="Tier (title, diamond, platinum, gold, silver, bronze)"
              value={sponsor.tier}
              onChange={(e) => handleChange(index, "tier", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Order"
              value={sponsor.order}
              onChange={(e) =>
                handleChange(index, "order", parseInt(e.target.value))
              }
            />

            <div className="flex justify-between pt-2">
              <Button
                variant="destructive"
                onClick={() => handleRemoveSponsor(index)}
              >
                Remove
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => handleSaveSponsor(sponsor, index)}
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
