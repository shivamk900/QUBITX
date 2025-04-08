import { useState } from "react";
import { Clock, Calendar, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { scheduleData } from "@/utils/data";
interface ScheduleCardProps {
  time: string;
  title: string;
  description: string;
  speaker?: string; // Making speaker optional
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
          <Tabs defaultValue="day1" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-cyber-darker">
              <TabsTrigger
                value="day1"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue/20 data-[state=active]:to-neon-purple/20 data-[state=active]:text-white"
              >
                <div className="flex flex-col items-center">
                  <Calendar size={18} className="mb-1" />
                  <span>Day 1</span>
                  <span className="text-xs text-muted-foreground">July 14</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="day2"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue/20 data-[state=active]:to-neon-purple/20 data-[state=active]:text-white"
              >
                <div className="flex flex-col items-center">
                  <Calendar size={18} className="mb-1" />
                  <span>Day 2</span>
                  <span className="text-xs text-muted-foreground">July 15</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="day3"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue/20 data-[state=active]:to-neon-purple/20 data-[state=active]:text-white"
              >
                <div className="flex flex-col items-center">
                  <Calendar size={18} className="mb-1" />
                  <span>Day 3</span>
                  <span className="text-xs text-muted-foreground">July 16</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="day1" className="mt-0">
              <div className="space-y-0">
                {scheduleData.day1.map((item, index) => (
                  <ScheduleCard key={index} {...item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="day2" className="mt-0">
              <div className="space-y-0">
                {scheduleData.day2.map((item, index) => (
                  <ScheduleCard key={index} {...item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="day3" className="mt-0">
              <div className="space-y-0">
                {scheduleData.day3.map((item, index) => (
                  <ScheduleCard key={index} {...item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
