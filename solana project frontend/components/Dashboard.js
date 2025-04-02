function Dashboard() {
    try {
        const [walletData, setWalletData] = React.useState({
            address: '',
            provider: null,
            balance: 0
        });
        const [tokenAccounts, setTokenAccounts] = React.useState([]);
        const [transactions, setTransactions] = React.useState([]);
        const [notification, setNotification] = React.useState(null);
        const [showWalletSelect, setShowWalletSelect] = React.useState(false);

        const showNotification = (message, type) => {
            setNotification({ message, type });
        };

        const handleSuccess = (message) => {
            showNotification(message, 'success');
        };

        const handleError = (message) => {
            showNotification(message, 'error');
        };

        const handleWalletSelect = async (provider) => {
            try {
                const result = await connectToWallet(provider);
                setWalletData({
                    address: result.address,
                    provider: provider,
                    balance: 0
                });
                updateBalance(result.address);
                loadTokenAccounts(result.address);
                loadTransactionHistory(result.address);
                setShowWalletSelect(false);
                handleSuccess('Wallet connected successfully');
            } catch (error) {
                handleError(error.message);
                setShowWalletSelect(false);
            }
        };

        const handleDisconnect = async () => {
            try {
                await disconnectWallet(walletData.provider);
                setWalletData({ address: '', provider: null, balance: 0 });
                setTokenAccounts([]);
                setTransactions([]);
                handleSuccess('Wallet disconnected');
            } catch (error) {
                handleError(error.message);
            }
        };

        const updateBalance = async (address) => {
            try {
                const balance = await getWalletBalance(address);
                setWalletData(prev => ({ ...prev, balance }));
            } catch (error) {
                handleError('Failed to fetch balance');
            }
        };

        const loadTokenAccounts = async (address) => {
            try {
                const accounts = await getTokenAccounts(address);
                setTokenAccounts(accounts);
            } catch (error) {
                handleError('Failed to load token accounts');
            }
        };

        const loadTransactionHistory = async (address) => {
            try {
                const history = await getTransactionHistory(address);
                setTransactions(history);
            } catch (error) {
                handleError('Failed to load transaction history');
            }
        };

        return (
            <div data-name="dashboard" className="container mx-auto px-4 py-8">
                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}

                {showWalletSelect ? (
                    <WalletSelect onSelect={handleWalletSelect} />
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div data-name="wallet-section">
                                    {!walletData.address ? (
                                        <button
                                            data-name="connect-wallet-button"
                                            onClick={() => setShowWalletSelect(true)}
                                            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
                                        >
                                            <i className="fas fa-wallet"></i>
                                            <span>Connect Wallet</span>
                                        </button>
                                    ) : (
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm text-gray-600">Connected with {walletData.provider}</p>
                                                    <p className="text-lg font-semibold mt-1">
                                                        {walletData.address.slice(0, 6)}...{walletData.address.slice(-4)}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        Balance: {walletData.balance.toFixed(4)} SOL
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={handleDisconnect}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                                >
                                                    Disconnect
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {walletData.address && (
                                    <>
                                        <TokenCreator
                                            onSuccess={handleSuccess}
                                            onError={handleError}
                                        />
                                        <TokenBalance tokenAccounts={tokenAccounts} />
                                    </>
                                )}
                            </div>
                            {walletData.address && (
                                <div className="space-y-6">
                                    <TokenMinter
                                        onSuccess={handleSuccess}
                                        onError={handleError}
                                    />
                                    <TokenTransfer
                                        onSuccess={handleSuccess}
                                        onError={handleError}
                                    />
                                </div>
                            )}
                        </div>
                        {walletData.address && (
                            <div className="mt-6">
                                <TransactionList transactions={transactions} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Dashboard component error:', error);
        reportError(error);
        return null;
    }
}
