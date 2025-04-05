import Image from 'next/image'

export default function LandingImg({ className }: { className?: string } = {className: ""}) {
    return (
        <div className={`flex justify-center h-40 sm:h-96 ${className}`}>
            <Image src="/static/images/calendar_hero.svg" alt="Calendar Illustration" width={500} height={500}
                 className="animate-float aspect-square"/>
        </div>
    );
}