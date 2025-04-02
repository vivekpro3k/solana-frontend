function WalletSelect({ onSelect }) {
    try {
        const wallets = [
            { id: 'phantom', name: 'Phantom', icon: 'fa-ghost', color: 'purple' },
            { id: 'sollet', name: 'Sollet', icon: 'fa-wallet', color: 'blue' },
            { id: 'solflare', name: 'Solflare', icon: 'fa-sun', color: 'orange' }
        ];

        return (
            <div data-name="wallet-select" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Connect Wallet
                    </h3>
                    <div className="space-y-3">
                        {wallets.map(wallet => (
                            <button
                                key={wallet.id}
                                data-name={`wallet-option-${wallet.id}`}
                                onClick={() => onSelect(wallet.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-lg border dark:border-gray-600 hover:border-${wallet.color}-500 transition-colors dark:bg-gray-700`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-full bg-${wallet.color}-100 dark:bg-${wallet.color}-900 flex items-center justify-center`}>
                                        <i className={`fas ${wallet.icon} text-${wallet.color}-500`}></i>
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white">{wallet.name}</span>
                                </div>
                                <i className="fas fa-chevron-right text-gray-400 dark:text-gray-300"></i>
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                        New to Solana?{' '}
                        <a href="https://solana.com/learn" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Learn More
                        </a>
                    </p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('WalletSelect component error:', error);
        return null;
    }
}
