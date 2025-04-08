import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const initialAbout = [
  {
    title: "Cutting-Edge Challenges",
    description:
      "Tackle real-world problems with the latest technologies in AI, blockchain, and more.",
  },
  {
    title: "24-Hour Sprint",
    description:
      "Push your creative limits in this intense coding marathon designed to spark innovation.",
  },
  {
    title: "Mentorship & Support",
    description:
      "Get guidance from industry experts to help bring your ideas to life.",
  },
  {
    title: "Networking Opportunities",
    description:
      "Connect with fellow tech enthusiasts, sponsors, and potential employers.",
  },
];

const initialRounds = [
  {
    title: "Ideation & Team Formation",
    description:
      "Submit your innovative project idea and form your dream team. Present your concept to mentors for initial feedback.",
    timeline: "48 Hours",
  },
  {
    title: "Development & Mentorship",
    description:
      "Build your prototype with continuous support from industry experts. Regular checkpoints to ensure you're on track.",
    timeline: "72 Hours",
  },
  {
    title: "Final Presentation & Judging",
    description:
      "Showcase your solution to our panel of judges. Demonstrate the impact and innovation of your project.",
    timeline: "24 Hours",
  },
];

const initialProblemStatements = [
  { title: "Open Innovation", description: "Create groundbreaking solutions that push technological boundaries across any domain." },
  { title: "AI & Machine Learning", description: "Develop intelligent systems that can learn, adapt, and solve complex problems." },
  { title: "Health-Tech", description: "Transform healthcare with innovative technological solutions." },
  { title: "Mid-Tech", description: "Bridge traditional industries with cutting-edge technology solutions." },
  { title: "Edu-Tech", description: "Revolutionize learning through innovative educational technology." },
  { title: "Fin-Tech", description: "Innovate financial services with next-generation technology." },
];

const initialSchedule = [
  { title: "Registration & Coffee", description: "Check-in and get your welcome package" },
  { title: "Opening Ceremony", description: "Welcome address and introduction to challenges" },
  { title: "Team Formation", description: "Find teammates and brainstorm project ideas" },
  { title: "Lunch Break", description: "Fuel up for the hackathon" },
  { title: "AI in 2025: Future Trends", description: "Exploring cutting-edge AI technologies" },
  { title: "Hacking Begins!", description: "Start working on your projects" },
  { title: "Hacking Continues", description: "Continue working on your projects" },
  { title: "Workshop: Web3 Technologies", description: "Learn about blockchain and decentralized apps" },
  { title: "Workshop: Rapid Prototyping", description: "Techniques for rapid MVP development" },
  { title: "Dinner & Networking", description: "Take a break and connect with others" },
  { title: "Coding Stops", description: "Finish your projects and prepare presentations" },
  { title: "Project Presentations", description: "Present your solutions to the judges" },
  { title: "Judges Deliberation", description: "Judges evaluate the projects" },
  { title: "Awards Ceremony", description: "Winners announcement and prizes" },
  { title: "Closing Remarks & Afterparty", description: "Celebrate the end of a successful hackathon" },
];

const initialSpeakers = [
  { title: "Dr. Sarah Chen", description: "AI Research Lead at TechNova Labs" },
  { title: "Marcus Lee", description: "Blockchain Expert at CryptoFuture" },
  { title: "Alex Morgan", description: "VR/AR Specialist at Dimension XR" },
  { title: "Zoe Williams", description: "Product Designer at Neomorphic UI" },
];

const initialOrganizers = [
  { title: "Dr. Sarah Chens", description: "Event Director at TechNova Labs" },
  { title: "Marcus Lee", description: "Technical Lead at CryptoFuture" },
  { title: "Alex Morgan", description: "Operations Manager at Dimension XR" },
  { title: "Zoe Williams", description: "Partnerships Lead at Neomorphic UI" },
];

const initialSponsors = [
  { title: "TechNova", description: "Diamond Sponsor" },
  { title: "CyberSys", description: "Diamond Sponsor" },
  { title: "FutureStack", description: "Gold Sponsor" },
  { title: "Quantum Labs", description: "Gold Sponsor" },
  { title: "NeoCode", description: "Silver Sponsor" },
  { title: "Digital Pulse", description: "Silver Sponsor" },
  { title: "ByteWorks", description: "Bronze Sponsor" },
  { title: "CodeSphere", description: "Bronze Sponsor" },
];

export default function EventAdminPanel() {
  const [about, setAbout] = useState(initialAbout);
  const [rounds, setRounds] = useState(initialRounds);
  const [problems, setProblems] = useState(initialProblemStatements);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [speakers, setSpeakers] = useState(initialSpeakers);
  const [organizers, setOrganizers] = useState(initialOrganizers);
  const [sponsors, setSponsors] = useState(initialSponsors);

  const handleChange = (data, setData, index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  const handleAdd = (data, setData, emptyObj) => {
    setData([...data, { ...emptyObj }]);
  };

  const handleRemove = (data, setData, index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  const handleSave = (dataType, data) => {
    console.log(`Saved ${dataType}:`, data);
    alert(`${dataType} saved successfully (check console).`);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Event Admin Panel</h1>

      <Tabs defaultValue="about">
        <TabsList className="flex space-x-2 justify-center mb-6">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="rounds">Rounds</TabsTrigger>
          <TabsTrigger value="problems">Problem Statements</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="speakers">Speakers</TabsTrigger>
          <TabsTrigger value="organizers">Organizers</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
        </TabsList>

        {[{
          value: 'about', label: 'About', state: about, setState: setAbout, addLabel: 'Add About Section'
        }, {
          value: 'rounds', label: 'Rounds', state: rounds, setState: setRounds, addLabel: 'Add Round'
        }, {
          value: 'problems', label: 'Problem Statements', state: problems, setState: setProblems, addLabel: 'Add Problem Statement'
        }, {
          value: 'schedule', label: 'Schedule', state: schedule, setState: setSchedule, addLabel: 'Add Schedule Item'
        }, {
          value: 'speakers', label: 'Speakers', state: speakers, setState: setSpeakers, addLabel: 'Add Speaker'
        }, {
          value: 'organizers', label: 'Organizers', state: organizers, setState: setOrganizers, addLabel: 'Add Organizer'
        }, {
          value: 'sponsors', label: 'Sponsors', state: sponsors, setState: setSponsors, addLabel: 'Add Sponsor'
        }].map(section => (
          <TabsContent value={section.value} key={section.value}>
            <div className="space-y-6">
              {section.state.map((item, index) => (
                <Card key={index} className="shadow-md border border-gray-200">
                  <CardContent className="space-y-4 p-4">
                    <Input
                      value={item.title || ''}
                      onChange={(e) => handleChange(section.state, section.setState, index, "title", e.target.value)}
                      placeholder="Title"
                    />
                    <Textarea
                      value={item.description || ''}
                      onChange={(e) => handleChange(section.state, section.setState, index, "description", e.target.value)}
                      placeholder="Description"
                    />
                    <div className="flex justify-end">
                      <Button variant="destructive" onClick={() => handleRemove(section.state, section.setState, index)}>
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-center">
                <Button onClick={() => handleAdd(section.state, section.setState, { title: "", description: "" })}>{section.addLabel}</Button>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button onClick={() => handleSave(section.label, section.state)} className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl">
                Save Changes
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
