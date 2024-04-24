import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import Image from "@/assets/images/flower.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Landing = () => {
  const theDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [activities, setActivities] = useState(["Work", "Eat", "Sleep", "Exercise"]);
  const [weeklySchedule, setWeeklySchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState(dayjs().format('dddd'));
  const [newActivity, setNewActivity] = useState('');
  const currentDay = dayjs().format('dddd');
  const { toast } = useToast();

  useEffect(() => {
    const currentDay = dayjs().format('dddd');
    const daysOrdered = orderDays(theDays, currentDay);
    setWeeklySchedule(createSchedule(daysOrdered, activities));
  }, [activities]);

  function createSchedule(days, activities) {
    let scheduleMap = {};
    days.forEach((day, index) => {
      scheduleMap[day] = activities[index % activities.length];
    });
    return scheduleMap;
  }

  function orderDays(days, currentDay) {
    const currentIndex = days.indexOf(currentDay);
    return [...days.slice(currentIndex), ...days.slice(0, currentIndex)];
  }

  function updateActivity(e) {
    e.preventDefault();
    const dayIndex = theDays.indexOf(selectedDay);
    if (dayIndex !== -1) {
      const newActivities = [...activities];
      newActivities[dayIndex] = newActivity;
      setActivities(newActivities);
      setNewActivity('');

      toast({
        title: "Activity Updated",
        description: `The activity for ${selectedDay} has been updated to ${newActivity}.`
      });
    } else {
      toast({
        title: "Update Failed",
        description: "No such day found in the schedule."
      });
    }
  }

  return (
<div className='flex items-center justify-center min-h-screen p-4 bg-gray-100'>
  <div className='relative max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden'>
    <div className='relative z-10 flex flex-col items-center'>
      <p className='p-8'>⎧ It's {currentDay}! ⎫</p>
      <form onSubmit={updateActivity} className='flex items-center space-x-2 w-full max-w-md'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-white/40 text-black p-3 ring-1 ring-black/5 transition-opacity duration-300 hover:bg-white' variant="outline">
              Select Day
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl bg-white/80 shadow-lg ring-1 ring-black/5">
            <DropdownMenuLabel>Select Day</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {theDays.map(day => (
              <DropdownMenuItem key={day} onSelect={() => setSelectedDay(day)}>
                {day}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
<Input
  className="ring-1 ring-black/5"
  placeholder={selectedDay ? ` ${selectedDay}` : "Select a day and enter an activity"}
  id="newActivity"
  type="text"
  value={newActivity}
  onChange={e => setNewActivity(e.target.value)}
  required
/>
        <Button className='bg-white/40 text-black p-3 ring-1 ring-black/5 transition-opacity duration-300 hover:bg-white' type="submit">
          Update Activity
        </Button>
      </form>
    </div>

        <div className="mt-6">
            
          {/* <AspectRatio ratio={16 / 9} className="bg-cover bg-center rounded-md"> */}
                  <img
          src={Image}
          alt="Background Image"
          className="absolute inset-0 w-full h-full object-cover z-0 filter blur-sm"
        />
            <Card className="relative border border-transparent">
              <CardHeader>
                <CardTitle className='text-center'>Project Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Table className=''>
                  {/* <TableCaption>Keep It Up!</TableCaption> */}
                  <TableHeader>
                    <TableRow className='border border-transparent '>
                      <TableHead>Day</TableHead>
                      <TableHead>Activity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className='border border-none'>
                    {Object.entries(weeklySchedule).map(([day, activity]) => (
                      <TableRow  className="isolate aspect-video w-96 rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 border border-none " key={day}>
                        <TableCell>{day}</TableCell>
                        <TableCell>{activity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          {/* </AspectRatio> */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
