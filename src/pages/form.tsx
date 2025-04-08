import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

const problemStatements = [
  { id: 'ai-healthcare', name: 'AI in Healthcare' },
  { id: 'sustainable-tech', name: 'Sustainable Technology Solutions' },
  { id: 'fintech-innovation', name: 'FinTech Innovation' },
  { id: 'smart-cities', name: 'Smart Cities Infrastructure' },
  { id: 'cybersecurity', name: 'Cybersecurity Challenges' },
  { id: 'edtech', name: 'Educational Technology' },
  { id: 'open-innovation', name: 'Open Innovation Track' },
];

const RegistrationForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    teamName: '',
    problemStatement: '',
    projectIdea: '',
    agreeTerms: false,
    members: [
      { name: '', email: '', phone: '', college: '', linkedin: '', github: '' },
      { name: '', email: '', phone: '', college: '', linkedin: '', github: '' },
      { name: '', email: '', phone: '', college: '', linkedin: '', github: '' },
      { name: '', email: '', phone: '', college: '', linkedin: '', github: '' },
    ],
    loading: false
  });

  const handleChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleMemberChange = (index, field, value) => {
    setFormState(prev => {
      const updatedMembers = [...prev.members];
      updatedMembers[index] = { ...updatedMembers[index], [field]: value };
      return { ...prev, members: updatedMembers };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formState.teamName || !formState.problemStatement) {
      toast({
        title: "Missing information",
        description: "Please fill in all required team information.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate at least team leader info
    const leader = formState.members[0];
    if (!leader.name || !leader.email || !leader.phone || !leader.college) {
      toast({
        title: "Team leader information required",
        description: "Please complete all required fields for the team leader.",
        variant: "destructive"
      });
      return;
    }
    
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
        description: "Your team has been registered. Check your email for confirmation details.",
      });
      
      setFormState({
        teamName: '',
        problemStatement: '',
        projectIdea: '',
        agreeTerms: false,
        members: [
          { name: '', email: '', phone: '', college: '', linkedin: '', github: '' },
          { name: '', email: '', phone: '', college: '', linkedin: '', github: '' },
          { name: '', email: '', phone: '', college: '', linkedin: '', github: '' },
          { name: '', email: '', phone: '', college: '', linkedin: '', github: '' },
        ],
        loading: false
      });
      
      window.scrollTo(0, 0);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      <div className="py-16 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-cyber-dark to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="moving-light opacity-20 w-64 h-64 rounded-full bg-neon-blue absolute top-1/2 left-0"></div>
          <div className="moving-light opacity-20 w-96 h-96 rounded-full bg-neon-purple absolute top-1/3 right-0" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/" className="text-neon-blue hover:text-neon-purple transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Home
              </Link>
            </div>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                  Team Registration
                </span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Register your team for QUBITX-GLBM 2025. Each team can have up to 4 members.
              </p>
            </div>
            
            <div className="bg-cyber-darker rounded-lg p-8 cyberpunk-border">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Team Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Team Information</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="teamName">Team Name <span className="text-neon-pink">*</span></Label>
                      <Input 
                        id="teamName" 
                        placeholder="Enter your team name" 
                        value={formState.teamName}
                        onChange={(e) => handleChange('teamName', e.target.value)}
                        required
                        className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="problemStatement">Problem Statement <span className="text-neon-pink">*</span></Label>
                      <Select 
                        value={formState.problemStatement} 
                        onValueChange={(value) => handleChange('problemStatement', value)}
                        required
                      >
                        <SelectTrigger className="bg-cyber-dark border-neon-blue/30">
                          <SelectValue placeholder="Select a problem statement" />
                        </SelectTrigger>
                        <SelectContent className="bg-cyber-darker border-neon-blue/30">
                          {problemStatements.map(problem => (
                            <SelectItem key={problem.id} value={problem.id}>{problem.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="projectIdea">Project Idea (Brief Description)</Label>
                      <Textarea 
                        id="projectIdea" 
                        placeholder="Briefly describe your project idea (optional)" 
                        value={formState.projectIdea}
                        onChange={(e) => handleChange('projectIdea', e.target.value)}
                        className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue min-h-[120px]"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Team Leader (Member 1) */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Team Leader</h2>
                  
                  <div className="bg-cyber-dark/50 p-6 rounded-lg border border-neon-blue/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="leader-name">Full Name <span className="text-neon-pink">*</span></Label>
                        <Input 
                          id="leader-name" 
                          placeholder="Enter full name" 
                          value={formState.members[0].name}
                          onChange={(e) => handleMemberChange(0, 'name', e.target.value)}
                          required
                          className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="leader-email">Email Address <span className="text-neon-pink">*</span></Label>
                        <Input 
                          id="leader-email" 
                          type="email"
                          placeholder="Enter email address" 
                          value={formState.members[0].email}
                          onChange={(e) => handleMemberChange(0, 'email', e.target.value)}
                          required
                          className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="leader-phone">Phone Number <span className="text-neon-pink">*</span></Label>
                        <Input 
                          id="leader-phone" 
                          placeholder="Enter phone number" 
                          value={formState.members[0].phone}
                          onChange={(e) => handleMemberChange(0, 'phone', e.target.value)}
                          required
                          className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="leader-college">College/University <span className="text-neon-pink">*</span></Label>
                        <Input 
                          id="leader-college" 
                          placeholder="Enter college name" 
                          value={formState.members[0].college}
                          onChange={(e) => handleMemberChange(0, 'college', e.target.value)}
                          required
                          className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="leader-linkedin">LinkedIn Profile</Label>
                        <Input 
                          id="leader-linkedin" 
                          placeholder="LinkedIn URL (optional)" 
                          value={formState.members[0].linkedin}
                          onChange={(e) => handleMemberChange(0, 'linkedin', e.target.value)}
                          className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="leader-github">GitHub Profile</Label>
                        <Input 
                          id="leader-github" 
                          placeholder="GitHub URL (optional)" 
                          value={formState.members[0].github}
                          onChange={(e) => handleMemberChange(0, 'github', e.target.value)}
                          className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Team Members */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Team Members</h2>
                  
                  {[1, 2, 3].map((memberIndex) => (
                    <div key={memberIndex} className="mb-6 bg-cyber-dark/50 p-6 rounded-lg border border-neon-blue/20">
                      <h3 className="text-xl font-semibold mb-4 text-neon-cyan">Team Member {memberIndex + 1}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`member-${memberIndex}-name`}>Full Name</Label>
                          <Input 
                            id={`member-${memberIndex}-name`} 
                            placeholder="Enter full name" 
                            value={formState.members[memberIndex].name}
                            onChange={(e) => handleMemberChange(memberIndex, 'name', e.target.value)}
                            className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`member-${memberIndex}-email`}>Email Address</Label>
                          <Input 
                            id={`member-${memberIndex}-email`} 
                            type="email"
                            placeholder="Enter email address" 
                            value={formState.members[memberIndex].email}
                            onChange={(e) => handleMemberChange(memberIndex, 'email', e.target.value)}
                            className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`member-${memberIndex}-phone`}>Phone Number</Label>
                          <Input 
                            id={`member-${memberIndex}-phone`} 
                            placeholder="Enter phone number" 
                            value={formState.members[memberIndex].phone}
                            onChange={(e) => handleMemberChange(memberIndex, 'phone', e.target.value)}
                            className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`member-${memberIndex}-college`}>College/University</Label>
                          <Input 
                            id={`member-${memberIndex}-college`} 
                            placeholder="Enter college name" 
                            value={formState.members[memberIndex].college}
                            onChange={(e) => handleMemberChange(memberIndex, 'college', e.target.value)}
                            className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`member-${memberIndex}-linkedin`}>LinkedIn Profile</Label>
                          <Input 
                            id={`member-${memberIndex}-linkedin`} 
                            placeholder="LinkedIn URL (optional)" 
                            value={formState.members[memberIndex].linkedin}
                            onChange={(e) => handleMemberChange(memberIndex, 'linkedin', e.target.value)}
                            className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`member-${memberIndex}-github`}>GitHub Profile</Label>
                          <Input 
                            id={`member-${memberIndex}-github`} 
                            placeholder="GitHub URL (optional)" 
                            value={formState.members[memberIndex].github}
                            onChange={(e) => handleMemberChange(memberIndex, 'github', e.target.value)}
                            className="bg-cyber-dark border-neon-blue/30 focus:border-neon-blue"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Terms and Submit */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-start space-x-2 mb-6">
                    <Checkbox 
                      id="terms" 
                      checked={formState.agreeTerms}
                      onCheckedChange={(checked) => handleChange('agreeTerms', checked)}
                      className="data-[state=checked]:bg-neon-purple data-[state=checked]:border-neon-purple"
                    />
                    <Label 
                      htmlFor="terms" 
                      className="text-sm text-muted-foreground font-normal leading-tight"
                    >
                      I agree to the <a href="#" className="text-neon-blue hover:underline">terms and conditions</a> and <a href="#" className="text-neon-blue hover:underline">code of conduct</a> for QUBITX-GLBM 2025.
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={formState.loading}
                    className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue"
                  >
                    {formState.loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Submit Registration'
                    )}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Need help? Contact us at <a href="mailto:support@qubitx-glbm.com" className="text-neon-blue hover:underline">support@qubitx-glbm.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;