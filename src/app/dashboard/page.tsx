'use client';
import {redirect} from "next/navigation";
import { useSession } from "next-auth/react"
import {useState} from "react";

// interface Event {
//     id: number;
//     title: string;
//     date: string;
// }

export default function Dashboard() {
    const { data: session } = useSession()

    if (!session?.user?.email) {
        redirect('/auth')
    }

    const [selectedStatus, setSelectedStatus] = useState(false);

    return (
        <div className="flex flex-col gap-4 h-full">
            <section className="grid grid-cols-3 gap-4">
                <div className="content-box">
                    My Events
                    <button className="bg-red-500 p-4"
                        onClick={() => {
                            setSelectedStatus(!selectedStatus);}
                    }
                    >Toggle event</button>
                </div>
                <div className="col-span-2 grid grid-cols-2 flex  gap-4">
                    {/*Actually, Make Create take it all, but when i click on an event, make create take 1 col span only*/}
                    <div className={`content-box ${selectedStatus ? 'col-span-1' : 'hidden'}`}>
                        View
                    </div>
                    <div className={`content-box col-span-${selectedStatus ? '1' : '2'}`}>
                        Create: {selectedStatus ? '1' : '2'}
                    </div>
                </div>
            </section>

            <section className="flex h-full">
                <div className="content-box w-full">
                    Calendar Goes Here...
                </div>
            </section>
        </div>
    );
}