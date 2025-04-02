function WalletConnect({ onConnect, onDisconnect, isConnected, walletAddress, balance }) {
    try {
        const [isInstalled, setIsInstalled] = React.useState(false);
        const [checkingWallet, setCheckingWallet] = React.useState(true);

        React.useEffect(() => {
            const checkWallet = () => {
                const isPhantomAvailable = window.solana && window.solana.isPhantom;
                setIsInstalled(isPhantomAvailable);
                setCheckingWallet(false);
            };

            // Check immediately
            checkWallet();

            // Also check when the window loads (helps with browser extensions)
            window.addEventListener('load', checkWallet);
            
            // Recheck when visibility changes (user might install wallet without refreshing)
            document.addEventListener('visibilitychange', checkWallet);

            return () => {
                window.removeEventListener('load', checkWallet);
                document.removeEventListener('visibilitychange', checkWallet);
            };
        }, []);

        const handleConnect = async () => {
            try {
                const address = await connectWallet();
                onConnect(address);
            } catch (error) {
                console.error("Failed to connect wallet:", error);
                throw error;
            }
        };

        const handleDisconnect = async () => {
            try {
                await disconnectWallet();
                onDisconnect();
            } catch (error) {
                console.error("Failed to disconnect wallet:", error);
                throw error;
            }
        };

        const handleInstall = () => {
            window.open('https://phantom.app/', '_blank');
        };

        if (checkingWallet) {
            return (
                <div data-name="wallet-connect" className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center">
                        <div className="loading-spinner mx-auto"></div>
                        <p className="mt-2 text-gray-600">Checking wallet status...</p>
                    </div>
                </div>
            );
        }

        if (!isInstalled) {
            return (
                <div data-name="wallet-connect" className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center space-y-4">
                        <div className="flex flex-col items-center gap-2">
                            <i className="fas fa-wallet text-4xl text-purple-500"></i>
                            <h3 className="text-lg font-semibold">Phantom Wallet Required</h3>
                            <p className="text-gray-600 mb-4">To use this app, you need to install the Phantom wallet browser extension</p>
                        </div>
                        <button
                            data-name="install-button"
                            onClick={handleInstall}
                            className="wallet-button bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 flex items-center space-x-2 mx-auto"
                        >
                            <i className="fas fa-download"></i>
                            <span>Install Phantom Wallet</span>
                        </button>
                        <p className="text-sm text-gray-500 mt-4">
                            After installation, please refresh this page
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div data-name="wallet-connect" className="bg-white p-6 rounded-lg shadow-lg">
                {!isConnected ? (
                    <button
                        data-name="connect-button"
                        onClick={handleConnect}
                        className="wallet-button bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                    >
                        <i className="fas fa-wallet"></i>
                        <span>Connect Wallet</span>
                    </button>
                ) : (
                    <div data-name="wallet-info" className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="space-y-1">
                                <div data-name="wallet-address" className="text-sm text-gray-600">
                                    Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                                </div>
                                <div data-name="wallet-balance" className="text-lg font-semibold">
                                    {balance.toFixed(4)} SOL
                                </div>
                            </div>
                            <button
                                data-name="disconnect-button"
                                onClick={handleDisconnect}
                                className="wallet-button bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('WalletConnect component error:', error);
        reportError(error);
        return null;
    }
}
