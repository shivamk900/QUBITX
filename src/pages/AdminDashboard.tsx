import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleAdminPanel from "./admin/AdminSchedulePage";
import SpeakersAdminPanel from "./admin/SpeakersAdmin";
import OrganizerAdminPanel from "./admin/OrganizersAdmin";

const AdminDashboard = () => {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-center mb-10">Admin Panel</h1>
    
          <Tabs defaultValue="schedule" className="space-y-8">
            <TabsList className="flex flex-wrap justify-center gap-4">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="organizers">Organizers</TabsTrigger>
              {/* Add more sections here */}
            </TabsList>
    
            <TabsContent value="schedule">
              <ScheduleAdminPanel />
            </TabsContent>
    
            <TabsContent value="speakers">
              <SpeakersAdminPanel />
            </TabsContent>

            <TabsContent value="organizers">
              <OrganizerAdminPanel />
            </TabsContent>


          </Tabs>
        </div>
      );
}

export default AdminDashboard;