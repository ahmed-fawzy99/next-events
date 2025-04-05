import {signIn} from "@/auth";

interface oAuthBtnProps {
    provider: string;
    iconClass: string;
}

export default function OAuthBtn({provider, iconClass}: oAuthBtnProps) {
    return (
        <form action={async () => {
            "use server"
            await signIn(provider.toLowerCase(), {redirectTo: '/dashboard'})
        }}>
            <button type="submit"
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-[var(--surface-border)] rounded-xl cursor-pointer hover:bg-[var(--surface-d)] transition-colors ease-in-out duration-50">
                <span className={`pi ${iconClass}`}/>
                <h2 className="font-medium text-lg sm:text-xl">Continue
                    with {provider.charAt(0).toUpperCase() + provider.slice(1)}</h2>
            </button>
        </form>
    );
}