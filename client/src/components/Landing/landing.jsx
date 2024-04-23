import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Input } from "@/components/ui/input"
import Image from "@/assets/images/flower.jpg"
import {
  Card,
  CardContent,
//   CardDescription,
//   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {   Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,} from "@/components/ui/table";


const Landing = () => {
    const theDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const [activities, setActivities] = useState(["Work", "Eat", "Sleep", "Exercise"]);
    const [weeklySchedule, setWeeklySchedule] = useState({});
    const [selectedDay, setSelectedDay] = useState(dayjs().format('dddd'));
    const [newActivity, setNewActivity] = useState('');
    const currentDay = dayjs().format('dddd');
    const { toast } = useToast()

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
<div>
            <h1>Welcome to the Schedule</h1>
            <p>Today is {currentDay}.</p>
            <form onSubmit={updateActivity}>
                <div>
                    <label htmlFor="daySelect">Select Day To Edit Activity:</label>
                    <select
                        id="daySelect"
                        value={selectedDay}
                        onChange={e => setSelectedDay(e.target.value)}
                        required
                    >
                        {theDays.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                    {/* <label htmlFor="newActivity">New Activity:</label> */}
                    <Input
                        placeholder="New Activity"
                        id="newActivity"
                        type="text"
                        value={newActivity}
                        onChange={e => setNewActivity(e.target.value)}
                        required
                    />
                                   <Button onClick={updateActivity}>Click To Update Activity</Button>
                </div>

               </div>
            </form>
<div className="w-[550px] relative">
    <AspectRatio ratio={16 / 16} className="bg-cover bg-center rounded-md">
    <img
      src={Image}
      alt="Background Image"
      className="absolute inset-0 w-full h-full object-cover"
    />
        <Card className="relative z-10 ">
            <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Keep It Up!</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Day</TableHead>
                            <TableHead>Activity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(weeklySchedule).map(([day, activity]) => (
                            <TableRow key={day}>
                                <TableCell>{day}</TableCell>
                                <TableCell>{activity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </AspectRatio>
</div>
        </div>
    );
};


export default Landing;
