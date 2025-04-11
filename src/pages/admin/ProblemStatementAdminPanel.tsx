import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface ProblemStatement {
  _id?: string;
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const API_URL = "https://qubitx-backend.onrender.com/api/problemStates";

export default function ProblemStatementAdminPanel() {
  const [statements, setStatements] = useState<ProblemStatement[]>([]);

  useEffect(() => {
    fetchProblemStatements();
  }, []);

  const fetchProblemStatements = async () => {
    try {
      const res = await axios.get(API_URL);
      setStatements(res.data);
    } catch (err) {
      console.error("Error fetching problem statements", err);
    }
  };

  const handleChange = (
    index: number,
    field: keyof ProblemStatement,
    value: string
  ) => {
    const updated = [...statements];
    updated[index][field] = value;
    setStatements(updated);
  };

  const handleAddStatement = () => {
    setStatements((prev) => [
      ...prev,
      {
        id: "",
        title: "",
        description: "",
        icon: "",
        color: "",
      },
    ]);
  };

  const handleRemoveStatement = async (index: number) => {
    const statement = statements[index];
    if (statement._id) {
      try {
        await axios.delete(`${API_URL}/${statement._id}`);
      } catch (err) {
        console.error("Error deleting problem statement", err);
        alert("Failed to delete problem statement.");
        return;
      }
    }
    setStatements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveStatement = async (statement: ProblemStatement, index: number) => {
    try {
      if (statement._id) {
        await axios.put(`${API_URL}/${statement._id}`, statement);
      } else {
        const res = await axios.post(API_URL, statement);
        const updated = [...statements];
        updated[index]._id = res.data._id;
        setStatements(updated);
      }
      alert("Saved successfully!");
    } catch (err) {
      console.error("Error saving problem statement", err);
      alert("Failed to save.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Problem Statements Admin Panel
      </h1>

      <div className="flex justify-center mb-6">
        <Button onClick={handleAddStatement}>Add New Problem Statement</Button>
      </div>

      {statements.map((item, index) => (
        <Card key={item._id || index} className="mb-6">
          <CardContent className="p-4 space-y-3">
            <Input
              placeholder="ID (slug)"
              value={item.id}
              onChange={(e) => handleChange(index, "id", e.target.value)}
            />
            <Input
              placeholder="Title"
              value={item.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
            />
            <Input
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
            />
            <Input
              placeholder="Icon (emoji)"
              value={item.icon}
              onChange={(e) => handleChange(index, "icon", e.target.value)}
            />
            <Input
              placeholder="Color (Tailwind gradient)"
              value={item.color}
              onChange={(e) => handleChange(index, "color", e.target.value)}
            />
            <div className="flex justify-between pt-2">
              <Button
                variant="destructive"
                onClick={() => handleRemoveStatement(index)}
              >
                Remove
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => handleSaveStatement(item, index)}
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
