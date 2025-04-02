function InfoSection() {
    try {
        return (
            <div data-name="info-section" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Welcome to Solana Token Manager
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-wallet text-blue-500"></i>
                            <h3 className="font-medium text-gray-800 dark:text-white">Multi-Wallet Support</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            Connect with Phantom, Sollet, or Solflare wallets to manage your tokens.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-coins text-yellow-500"></i>
                            <h3 className="font-medium text-gray-800 dark:text-white">Token Management</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            Create, mint, and transfer SPL tokens with ease.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-chart-line text-green-500"></i>
                            <h3 className="font-medium text-gray-800 dark:text-white">Transaction Tracking</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            Monitor your transaction history and token balances in real-time.
                        </p>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <div className="flex items-start space-x-3">
                        <i className="fas fa-info-circle text-blue-500 mt-1"></i>
                        <div>
                            <h4 className="font-medium text-gray-800 dark:text-white">Getting Started</h4>
                            <ol className="list-decimal list-inside space-y-2 mt-2 text-gray-600 dark:text-gray-300">
                                <li>Connect your preferred Solana wallet</li>
                                <li>Create a new token or manage existing ones</li>
                                <li>Monitor your transactions and balances</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('InfoSection component error:', error);
        reportError(error);
        return null;
    }
}
