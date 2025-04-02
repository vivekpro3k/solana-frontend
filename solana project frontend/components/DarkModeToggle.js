function DarkModeToggle({ darkMode, onToggle }) {
    try {
        return (
            <button
                data-name="dark-mode-toggle"
                onClick={onToggle}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
                {darkMode ? (
                    <i className="fas fa-sun text-yellow-500" aria-hidden="true"></i>
                ) : (
                    <i className="fas fa-moon text-blue-500" aria-hidden="true"></i>
                )}
                <span className="sr-only">
                    {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                </span>
            </button>
        );
    } catch (error) {
        console.error('DarkModeToggle component error:', error);
        reportError(error);
        return null;
    }
}
