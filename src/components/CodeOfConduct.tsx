import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Shield, Users, Heart, AlertCircle, Clock } from 'lucide-react';

const iconMap = {
  Shield: <Shield className="w-6 h-6 text-neon-blue" />,
  Users: <Users className="w-6 h-6 text-neon-purple" />,
  Heart: <Heart className="w-6 h-6 text-neon-pink" />,
  Clock: <Clock className="w-6 h-6 text-neon-cyan" />,
  AlertCircle: <AlertCircle className="w-6 h-6 text-neon-red" />,
};

const CodeOfConduct = () => {
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const res = await axios.get('https://qubitx-backend.onrender.com/api/codeofconduct');
        setGuidelines(res.data);
      } catch (error) {
        console.error('Failed to fetch guidelines:', error);
      }
    };
    fetchGuidelines();
  }, []);

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
                    {iconMap[guideline.icon] || <Shield className="w-6 h-6" />}
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
    </section>
  );
};

export default CodeOfConduct;
