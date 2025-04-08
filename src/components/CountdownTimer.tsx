
import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // Set the hackathon date to May 9, 2025
  const hackathonDate = new Date('May 9, 2025 09:00:00').getTime();
  
  // Initialize state with a function to calculate initial time difference
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate time difference immediately when component mounts
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = hackathonDate - now;
      
      if (distance < 0) {
        // Hackathon has started
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };
    
    // Set initial time
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [hackathonDate]);

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center cyberpunk-border">
      <div className="bg-cyber-dark w-20 h-20 flex items-center justify-center rounded-lg mb-2">
        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
          {value}
        </span>
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-cyber-darker/80 backdrop-blur-md p-8 rounded-lg cyberpunk-border">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Countdown to ByteBlitz 2025
            </span>
          </h2>
          
          <div className="flex justify-center space-x-4 mb-8">
            <TimeBlock value={timeLeft.days} label="Days" />
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <TimeBlock value={timeLeft.minutes} label="Minutes" />
            <TimeBlock value={timeLeft.seconds} label="Seconds" />
          </div>
          
          <div className="text-center">
            <a href="#register" className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue text-white font-bold rounded-md transition-all shadow-neon-purple inline-block">
              Reserve Your Spot
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neon-blue/30 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-purple/30 rounded-full filter blur-3xl opacity-20"></div>
    </section>
  );
};

export default CountdownTimer;
