import { motion } from 'framer-motion';
import { Clock, Code, Trophy, Users } from 'lucide-react';

const RoundsSection = () => {
  const rounds = [
    {
      number: 1,
      title: "Ideation & Team Formation",
      description: "Submit your innovative project idea and form your dream team. Present your concept to mentors for initial feedback.",
      timeline: "48 Hours",
      icon: <Users className="w-6 h-6 text-neon-blue" />,
      details: [
        "Team registration & idea submission",
        "Mentor matching & initial guidance",
        "Project scope definition",
        "Technical stack planning"
      ]
    },
    {
      number: 2,
      title: "Development & Mentorship",
      description: "Build your prototype with continuous support from industry experts. Regular checkpoints to ensure you're on track.",
      timeline: "72 Hours",
      icon: <Code className="w-6 h-6 text-neon-purple" />,
      details: [
        "Intensive coding & development",
        "One-on-one mentorship sessions",
        "Technical workshops",
        "Progress presentations"
      ]
    },
    {
      number: 3,
      title: "Final Presentation & Judging",
      description: "Showcase your solution to our panel of judges. Demonstrate the impact and innovation of your project.",
      timeline: "24 Hours",
      icon: <Trophy className="w-6 h-6 text-neon-pink" />,
      details: [
        "Project demonstration",
        "Technical documentation",
        "Final presentation",
        "Awards ceremony"
      ]
    }
  ];

  return (
    <section id="rounds" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
              Competition Rounds
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Journey through three exciting rounds to build your next breakthrough innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rounds.map((round, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-cyber-dark/40 backdrop-blur-sm rounded-xl p-8 border border-neon-blue/20 hover:border-neon-blue/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                    {round.number}
                  </span>
                  {round.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">{round.title}</h3>
                <p className="text-muted-foreground mb-6">{round.description}</p>
                
                <div className="flex items-center mb-6 text-neon-blue">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{round.timeline}</span>
                </div>

                <ul className="space-y-3">
                  {round.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-muted-foreground">
                      <span className="text-neon-purple mr-2">▹</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue/5 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-purple/5 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default RoundsSection;