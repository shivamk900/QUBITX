import { useState, useEffect } from "react";
import axios from "axios";
import { Clock, Calendar, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ScheduleCardProps {
  time: string;
  title: string;
  description: string;
  speaker?: string;
  location: string;
}

const ScheduleCard = ({
  time,
  title,
  description,
  speaker,
  location,
}: ScheduleCardProps) => {
  return (
    <div className="border-l-2 border-neon-purple pl-5 pb-10 relative">
      <div className="absolute w-4 h-4 bg-neon-purple rounded-full -left-[9px] top-0"></div>
      <div className="flex items-center text-sm text-neon-cyan mb-2">
        <Clock size={16} className="mr-2" />
        <span>{time}</span>
      </div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-muted-foreground mb-3">{description}</p>
      {speaker && <p className="font-semibold text-neon-blue">{speaker}</p>}
      {location && (
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <MapPin size={16} className="mr-2" />
          <span>{location}</span>
        </div>
      )}
    </div>
  );
};

const ScheduleSection = () => {
  const [scheduleData, setScheduleData] = useState<Record<string, any[]>>({});
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get("http://192.168.186.252:5000/api/schedule");
        const rawData = response.data;
  
        // Transform into: { day1: [...], day2: [...] }
        const transformed: Record<string, any[]> = {};
        rawData.forEach((dayObj: any) => {
          transformed[dayObj.day] = dayObj.events;
        });
  
        setScheduleData(transformed);
        setDays(Object.keys(transformed));
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
  
    fetchSchedule();
  }, []);
  

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[days.length] || "grid-cols-2";

  return (
    <section id="schedule" className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Event Schedule
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three days of innovation, learning, and coding. Plan your
            QUBITX-GLBM experience with our detailed schedule.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {days.length > 0 ? (
            <Tabs defaultValue={days[0]} className="w-full">
              <TabsList className={`grid w-full ${gridCols} mb-8 bg-cyber-darker`}>
                {days.map((day, index) => (
                  <TabsTrigger
                    key={day}
                    value={day}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue/20 data-[state=active]:to-neon-purple/20 data-[state=active]:text-white"
                  >
                    <div className="flex flex-col items-center">
                      <Calendar size={18} className="mb-1" />
                      <span>{`Day ${index + 1}`}</span>
                      <span className="text-xs text-muted-foreground">{`July ${
                        14 + index
                      }`}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {days.map((day) => (
                <TabsContent key={day} value={day} className="mt-0">
                  <div className="space-y-0">
                    {scheduleData[day].length > 0 ? (
                      scheduleData[day].map((item, index) => (
                        <ScheduleCard key={index} {...item} />
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">
                        No schedule available for this day.
                      </p>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <p className="text-center text-muted-foreground">Loading schedule...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
