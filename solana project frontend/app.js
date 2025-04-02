function App() {
    try {
        const [darkMode, setDarkMode] = React.useState(getInitialTheme() === 'dark');
        const [walletAddress, setWalletAddress] = React.useState('');
        const [balance, setBalance] = React.useState(0);

        React.useEffect(() => {
            setTheme(darkMode ? 'dark' : 'light');
        }, [darkMode]);

        // Watch for system theme changes
        React.useEffect(() => {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e) => {
                if (!localStorage.getItem('color-theme')) {
                    setDarkMode(e.matches);
                }
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }, []);

        const toggleDarkMode = () => {
            setDarkMode(!darkMode);
        };

        const handleConnect = async (address) => {
            setWalletAddress(address);
            try {
                const balance = await getWalletBalance(address);
                setBalance(balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
                reportError(error);
            }
        };

        const handleDisconnect = () => {
            setWalletAddress('');
            setBalance(0);
        };

        return (
            <div data-name="app" className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
                <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
                    <nav className="bg-white dark:bg-gray-800 shadow-lg">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <i className="fas fa-cube text-blue-500 text-2xl"></i>
                                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        Solana Token Manager
                                    </h1>
                                </div>
                                <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
                            </div>
                        </div>
                    </nav>

                    <main className="container mx-auto px-4 py-8">
                        <InfoSection />
                        <div className="mt-8">
                            <Dashboard
                                walletAddress={walletAddress}
                                balance={balance}
                                onConnect={handleConnect}
                                onDisconnect={handleDisconnect}
                            />
                        </div>
                    </main>

                    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-12">
                        <div className="container mx-auto px-4 py-6">
                            <div className="text-center text-gray-600 dark:text-gray-300">
                                <p>Built with ❤️ for the Solana community</p>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                                        <i className="fas fa-globe"></i>
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
