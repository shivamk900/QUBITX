import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const ConductAdmin = () => {
  const [guidelines, setGuidelines] = useState([]);
  const [newGuideline, setNewGuideline] = useState({
    icon: "",
    color: "",
    title: "",
    description: "",
  });

  const API_URL = "https://qubitx-backend.onrender.com/api/codeofconduct";

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const fetchGuidelines = async () => {
    try {
      const res = await axios.get(API_URL);
      setGuidelines(res.data);
    } catch (err) {
      console.error("Error fetching guidelines", err);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(API_URL, newGuideline);
      setGuidelines([...guidelines, res.data]);
      setNewGuideline({ icon: "", color: "", title: "", description: "" });
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const handleUpdate = async (id, updated) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updated);
      setGuidelines(guidelines.map((item) => (item._id === id ? res.data : item)));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setGuidelines(guidelines.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleFieldChange = (id, field, value) => {
    setGuidelines((prev) =>
      prev.map((item) => (item._id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold">Code of Conduct Admin Panel</h2>

      <Card>
        <CardContent className="p-4 space-y-2">
          <h3 className="text-lg font-medium">Add New Guideline</h3>
          <Input
            placeholder="Icon name (e.g., Shield)"
            value={newGuideline.icon}
            onChange={(e) =>
              setNewGuideline({ ...newGuideline, icon: e.target.value })
            }
          />
          <Input
            placeholder="Title"
            value={newGuideline.title}
            onChange={(e) =>
              setNewGuideline({ ...newGuideline, title: e.target.value })
            }
          />
          <Textarea
            placeholder="Description"
            value={newGuideline.description}
            onChange={(e) =>
              setNewGuideline({ ...newGuideline, description: e.target.value })
            }
          />
          <Button onClick={handleAdd}>Add Guideline</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {guidelines.map((g) => (
          <Card key={g._id}>
            <CardContent className="p-4 space-y-2">
              <Input
                value={g.icon}
                onChange={(e) => handleFieldChange(g._id, "icon", e.target.value)}
              />
              <Input
                value={g.title}
                onChange={(e) => handleFieldChange(g._id, "title", e.target.value)}
              />
              <Textarea
                value={g.description}
                onChange={(e) =>
                  handleFieldChange(g._id, "description", e.target.value)
                }
              />
              <div className="flex gap-2">
                <Button
                  variant="default"
                  onClick={() => handleUpdate(g._id, g)}
                >
                  Save
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(g._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConductAdmin;
