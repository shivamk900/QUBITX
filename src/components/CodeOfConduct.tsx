import { motion } from 'framer-motion';
import { Shield, Users, Heart, AlertCircle, Clock } from 'lucide-react';

const CodeOfConduct = () => {
  const guidelines = [
    {
      icon: <Shield className="w-6 h-6 text-neon-blue" />,
      title: "Respect and Inclusion",
      description: "Treat everyone with dignity, kindness, and respect. Harassment, bullying, or discrimination of any form is strictly prohibited. Use respectful language and create an inclusive atmosphere for everyone."
    },
    {
      icon: <Users className="w-6 h-6 text-neon-purple" />,
      title: "Teamwork & Fair Play",
      description: "Teams must consist of 2 to 4 members. All project development must occur during the 24-hour hackathon. Collaboration is encouraged, but plagiarism will lead to disqualification."
    },
    {
      icon: <Heart className="w-6 h-6 text-neon-pink" />,
      title: "Health, Safety & Conduct",
      description: "Your well-being matters. Take breaks, stay hydrated, and rest when needed. Keep the venue clean and respect shared resources. Report any misconduct immediately."
    },
    {
      icon: <Clock className="w-6 h-6 text-neon-cyan" />,
      title: "Project Submission",
      description: "Submit projects before the deadline. Follow submission guidelines including GitHub repo, presentation format, and demo link. Clearly mention tech stack and team details."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-neon-red" />,
      title: "Zero Tolerance Policy",
      description: "We do not tolerate harassment, discrimination, cheating, or intentional disruption. Violations may result in immediate disqualification and removal from the venue."
    }
  ];

  return (
    <section id="conduct" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
              Code of Conduct
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Welcome to QUBITX-GLBM, a 24-hour hackathon where innovation meets the spirit of Krishna Nagri, Mathura. To ensure a great experience for all, every participant, mentor, judge, and volunteer is expected to follow this Code of Conduct.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-cyber-dark/40 backdrop-blur-sm rounded-xl p-8 border border-neon-blue/20 hover:border-neon-blue/50 transition-all duration-300 h-full">
                <div className="flex flex-col space-y-4">
                  <div className="p-3 bg-cyber-darker rounded-lg w-fit">
                    {guideline.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {guideline.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {guideline.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background elements remain the same */}
    </section>
  );
};

export default CodeOfConduct;