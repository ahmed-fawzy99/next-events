import {redirect} from "next/navigation";
import EventCalendar from "@/components/home/EventCalendar";
import {getMyEvents} from "@/actions/event";
import {auth} from "@/auth";
import TopSection from "@/components/dashboard/TopSection";

export default async function Dashboard() {
    const session = await auth()
    if (!session?.user?.email) {
        redirect('/auth')
    }
    const myEvents = await getMyEvents();

    return (
        <div className="flex flex-col gap-4">
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TopSection myEvents={myEvents}/>
            </section>

            <section className="flex">
                <div className="content-box w-full">
                    <EventCalendar myEvents={myEvents}/>
                </div>
            </section>
        </div>
    );
}