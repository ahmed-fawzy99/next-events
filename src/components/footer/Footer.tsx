export default function Footer() {
    return (
        <footer className="p-4">
            <div
                className="flex flex-col sm:flex-row justify-center items-center text-neutral-500 gap-2 sm:gap-4 text-center">
                <span>Ahmed Deghady</span>
                <span className="hidden sm:inline">|</span>
                <a href="mailto:ahmaddeghady99@gmail.com"
                   className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                    ahmaddeghady99@gmail.com
                </a>
                <span className="hidden sm:inline">|</span>
                <a href="https://github.com/ahmed-fawzy99" target="_blank"
                   className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                    GitHub
                </a>
                <span className="hidden sm:inline">|</span>
                <a href="http://linkedin.com/in/ahmeddeghady" target="_blank"
                   className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                    LinkedIn
                </a>
            </div>
        </footer>
    );
}