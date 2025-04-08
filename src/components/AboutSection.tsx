
import { Shield, Zap, Code, Share2 } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-cyber-dark p-6 rounded-lg cyberpunk-border group hover:translate-y-[-5px] transition-all duration-300">
      <div className="w-14 h-14 mb-4 flex items-center justify-center bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg group-hover:from-neon-blue/30 group-hover:to-neon-purple/30 transition-all">
        <Icon size={28} className="text-neon-blue" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const AboutSection = () => {
  const features = [
    {
      icon: Code,
      title: "Cutting-Edge Challenges",
      description: "Tackle real-world problems with the latest technologies in AI, blockchain, and more."
    },
    {
      icon: Zap,
      title: "24-Hour Sprint",
      description: "Push your creative limits in this intense coding marathon designed to spark innovation."
    },
    {
      icon: Shield,
      title: "Mentorship & Support",
      description: "Get guidance from industry experts to help bring your ideas to life."
    },
    {
      icon: Share2,
      title: "Networking Opportunities",
      description: "Connect with fellow tech enthusiasts, sponsors, and potential employers."
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-neon-blue/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              What is QUBITX-GLBM?
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            QUBITX-GLBM is a futuristic hackathon where tech visionaries gather to build cutting-edge solutions for tomorrow's challenges. Join us for 24 hours of coding, collaboration, and innovation in an immersive cyber environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">
              Join 1000+ Developers from Around the Globe
            </span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you're a seasoned pro or just starting out, QUBITX-GLBM offers a unique opportunity to showcase your skills, learn from others, and build something amazing together.
          </p>
          <a href="#register" className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue text-white font-bold rounded-md transition-all shadow-neon-purple inline-block">
            Reserve Your Spot
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
