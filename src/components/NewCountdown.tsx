import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://qubitx-backend.onrender.com/api/countdown";

const NewCountdown = () => {
  const [hackathonEndDate, setHackathonEndDate] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const fetchEndDate = async () => {
      try {
        const res = await axios.get(API_URL);
        const fetchedDate = new Date(res.data.endDate).getTime();
        setHackathonEndDate(fetchedDate);
      } catch (err) {
        console.error("Failed to fetch countdown end date", err);
      }
    };
    fetchEndDate();
  }, []);

  useEffect(() => {
    if (!hackathonEndDate) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = hackathonEndDate - now;
      return distance > 0
        ? {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          }
        : { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [hackathonEndDate]);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-cyber-darker/80 backdrop-blur-md p-8 rounded-xl border border-neon-blue/20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Hackathon Countdown
            </span>
          </h2>

          <div className="flex justify-center gap-6 mb-8">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
              const value = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][i];
              return (
                <div key={label} className="flex flex-col items-center">
                  <div className="bg-cyber-dark w-20 h-20 flex items-center justify-center rounded-lg border border-neon-blue/30">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                      {value}
                    </span>
                  </div>
                  <span className="text-sm mt-2 text-gray-400">{label}</span>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <a href="#register" className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue text-white font-bold rounded-md transition-all shadow-lg inline-block">
              Register Now
            </a>
          </div>
        </div>
      </div>

      {/* Background Blurs */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neon-blue/30 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-purple/30 rounded-full filter blur-3xl opacity-20"></div>
    </section>
  );
};

export default NewCountdown;
