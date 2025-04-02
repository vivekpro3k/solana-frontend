function TokenBalance({ tokenAccounts }) {
    try {
        if (!tokenAccounts || tokenAccounts.length === 0) {
            return (
                <div data-name="token-balance-empty" className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-500 text-center">No tokens found</p>
                </div>
            );
        }

        return (
            <div data-name="token-balance" className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Token Balances</h3>
                <div className="space-y-4">
                    {tokenAccounts.map((account, index) => (
                        <div
                            key={index}
                            data-name="token-balance-item"
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-coins text-blue-500"></i>
                                </div>
                                <div>
                                    <div className="font-medium">{account.amount}</div>
                                    <div className="text-sm text-gray-500">
                                        {account.mint.slice(0, 4)}...{account.mint.slice(-4)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TokenBalance component error:', error);
        reportError(error);
        return null;
    }
}
