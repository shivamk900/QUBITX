
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

const RegisterSection = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    role: '',
    experience: '',
    agreeTerms: false,
    loading: false
  });

  const handleChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formState.agreeTerms) {
      toast({
        title: "Please agree to terms",
        description: "You must agree to the terms and conditions to register.",
        variant: "destructive"
      });
      return;
    }
    
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Registration successful!",
        description: "Check your email for confirmation details.",
      });
      
      setFormState({
        name: '',
        email: '',
        role: '',
        experience: '',
        agreeTerms: false,
        loading: false
      });
    }, 1500);
  };

  return (
    <section id="register" className="py-16 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-cyber-dark to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="moving-light opacity-20 w-64 h-64 rounded-full bg-neon-blue absolute top-1/2 left-0"></div>
        <div className="moving-light opacity-20 w-96 h-96 rounded-full bg-neon-purple absolute top-1/3 right-0" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                Register for QUBITX-GLBM 2025
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mb-6"></div>
            <p className="text-lg text-muted-foreground mb-6">
              Secure your spot for the most anticipated hackathon of the year. Join fellow tech enthusiasts for a weekend of innovation, learning, and fun.
            </p>
            
            <div className="relative bg-cyber-dark/50 backdrop-blur-sm p-5 rounded-lg border-2 border-neon-blue/30 shadow-lg shadow-neon-blue/10 mb-6">
              {/* Frame corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-blue"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-blue"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-blue"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-blue"></div>
              
              <h4 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Event Details</h4>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="text-white font-medium">Dates:</span> May 9-10, 2025</p>
                <p><span className="text-white font-medium">Location:</span> GL BAJAJ GROUP OF INSTITUTIONS,MATHURA</p>
                <p><span className="text-white font-medium">Format:</span> In-person + Virtual Hybrid</p>
                <p><span className="text-white font-medium">Registration Fee:</span> <span className="text-neon-cyan">Free</span> (Limited spots available)</p>
              </div>
            </div>
          </div>
          
          {/* Poster image frame */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
            <div className="relative bg-cyber-dark rounded-lg p-4 overflow-hidden">
              {/* Frame corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-blue z-10"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-purple z-10"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-purple z-10"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-blue z-10"></div>
              
              <div className="relative aspect-square overflow-hidden rounded-md">
                <img 
                  src="public/QUBITX Logo.png" 
                  alt="QUBITX-GLBM 2025 Hackathon Poster" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x600.png?text=Hackathon+Poster";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">QUBITX-GLBM 2025</h3>
                  <p className="text-neon-cyan mb-3">The Future of Tech Awaits</p>
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
