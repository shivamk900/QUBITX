import { organizersData } from '@/utils/data';
import { useState, useEffect } from "react";
import axios from "axios";
import { LinkedinIcon, TwitterIcon, GlobeIcon } from 'lucide-react';

interface Social {
  linkedin?: string;
  twitter?: string;
  website?: string;
}

interface OrganizerProps {
  name: string;
  role: string;
  image: string;
  socials: Social;
}

const OrganizerCard = ({ name, role, image, socials }: OrganizerProps) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg mb-4 cyberpunk-border">
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 to-transparent z-10 opacity-75 group-hover:opacity-90 transition-opacity"></div>
        <img 
          src={image} 
          alt={name} 
          className="w-full aspect-[3/4]  object-center transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-neon-cyan">{role}</p>
          <div className="flex space-x-3 mt-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
            {socials.linkedin && (
              <a href={socials.linkedin} className="text-white hover:text-neon-blue transition-colors">
                <LinkedinIcon size={18} />
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} className="text-white hover:text-neon-purple transition-colors">
                <TwitterIcon size={18} />
              </a>
            )}
            {socials.website && (
              <a href={socials.website} className="text-white hover:text-neon-pink transition-colors">
                <GlobeIcon size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const OrganizersSection = () => {
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    // Fetch organizers data from the API
    axios
      .get("https://qubitx-backend.onrender.com/api/organizers") // update the URL if hosted
      .then((res) => setOrganizers(res.data))
      .catch((err) => console.error("Error fetching organizers:", err));
  }, []);

  return (
    <section id="organizers" className="py-20 relative overflow-hidden">
      {/* Tech-themed background elements */}
      <div className="circuit-board absolute inset-0 opacity-10 z-0"></div>
      <div className="ai-pattern absolute inset-0 opacity-15 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-neon-pink/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-neon-blue/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Event Organizers
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated team behind QUBITX, working tirelessly to create an unforgettable hackathon experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizers.map((organizer, index) => (
            <OrganizerCard key={index} {...organizer} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-neon-cyan mb-4">
            Our team is committed to making this event a success!
          </p>
          <a href="#contact" className="text-white hover:text-neon-purple transition-all border-b border-neon-purple pb-1">
            Connect With Our Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default OrganizersSection;