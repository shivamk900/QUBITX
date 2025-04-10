import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface ProblemStatement {
  _id: string;
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const API_URL = 'https://qubitx-backend.onrender.com/api/problemStates';

const ProblemStatementSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);

  useEffect(() => {
    const fetchProblemStatements = async () => {
      try {
        const res = await axios.get(API_URL);
        setProblemStatements(res.data);
      } catch (err) {
        console.error("Error fetching problem statements", err);
      }
    };

    fetchProblemStatements();
  }, []);

  return (
    <section id="challenges" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-darker/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-cyber">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
              Problem Challenges
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your challenge track and create innovative solutions that shape the future
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problemStatements.map((challenge, index) => (
            <motion.div
              key={challenge._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(challenge.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl"></div>
              <div className={`relative bg-cyber-dark/40 backdrop-blur-sm rounded-xl p-8 h-full border border-transparent hover:border-neon-blue/50 transition-all duration-500 ${
                hoveredCard === challenge.id ? 'transform scale-105' : ''
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full"></div>
                
                <div className="relative z-10">
                  <span className="text-5xl mb-6 block">{challenge.icon}</span>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent from-white to-neon-blue">
                    {challenge.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {challenge.description}
                  </p>
                  
                  <div className="flex items-center text-neon-blue group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Explore Track</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue/5 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-purple/5 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default ProblemStatementSection;
