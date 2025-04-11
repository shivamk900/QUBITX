import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const RegisterSection = () => {
  const { toast } = useToast();

  const [eventInfo, setEventInfo] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
    agreeTerms: false,
    loading: false,
  });

  useEffect(() => {
    // replace with your actual API if needed
    axios.get("https://qubitx-backend.onrender.com/api/event").then((res) => setEventInfo(res.data));
  }, []);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.agreeTerms) {
      toast({
        title: "Please agree to terms",
        description: "You must agree to the terms and conditions to register.",
        variant: "destructive",
      });
      return;
    }

    setFormState((prev) => ({ ...prev, loading: true }));

    setTimeout(() => {
      toast({
        title: "Registration successful!",
        description: "Check your email for confirmation details.",
      });

      setFormState({
        name: "",
        email: "",
        role: "",
        experience: "",
        agreeTerms: false,
        loading: false,
      });
    }, 1500);
  };

  if (!eventInfo) return <div className="text-center py-16">Loading event info...</div>;

  return (
    <section id="register" className="py-16 relative overflow-hidden">
      {/* animated background and blur elements... */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                Register for {eventInfo.title}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mb-6"></div>
            <p className="text-lg text-muted-foreground mb-6">
              Secure your spot for the most anticipated hackathon of the year. Join fellow tech enthusiasts for a weekend of innovation, learning, and fun.
            </p>

            <div className="relative bg-cyber-dark/50 backdrop-blur-sm p-5 rounded-lg border-2 border-neon-blue/30 shadow-lg shadow-neon-blue/10 mb-6">
              <h4 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                Event Details
              </h4>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="text-white font-medium">Dates:</span> {eventInfo.dates}</p>
                <p><span className="text-white font-medium">Location:</span> {eventInfo.location}</p>
                <p><span className="text-white font-medium">Format:</span> {eventInfo.format}</p>
                <p><span className="text-white font-medium">Registration Fee:</span> <span className="text-neon-cyan">{eventInfo.fee}</span></p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="relative bg-cyber-dark rounded-lg p-4 overflow-hidden">
              <div className="relative aspect-square overflow-hidden rounded-md">
                <img
                  src={eventInfo.poster}
                  alt="Hackathon Poster"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = eventInfo.fallbackPoster;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{eventInfo.title}</h3>
                  <p className="text-neon-cyan mb-3">{eventInfo.tagline}</p>
                  <a
                    href="/form"
                    className="px-5 py-2 bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue text-white font-bold rounded-md transition-all inline-block text-sm"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
