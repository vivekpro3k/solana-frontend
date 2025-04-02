function TransactionList({ transactions }) {
    try {
        if (!transactions || transactions.length === 0) {
            return (
                <div data-name="transaction-list-empty" className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-500 text-center">No transactions found</p>
                </div>
            );
        }

        const getTransactionIcon = (type) => {
            switch (type) {
                case 'transfer':
                    return 'fa-paper-plane';
                case 'mint':
                    return 'fa-coins';
                default:
                    return 'fa-circle';
            }
        };

        return (
            <div data-name="transaction-list" className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                    {transactions.map((tx, index) => (
                        <div
                            key={index}
                            data-name="transaction-item"
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    tx.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                                }`}>
                                    <i className={`fas ${getTransactionIcon(tx.type)} ${
                                        tx.status === 'success' ? 'text-green-500' : 'text-red-500'
                                    }`}></i>
                                </div>
                                <div>
                                    <div className="font-medium capitalize">{tx.type}</div>
                                    <div className="text-sm text-gray-500">{tx.timestamp}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-sm ${
                                    tx.status === 'success' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                    {tx.status}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {tx.signature.slice(0, 4)}...{tx.signature.slice(-4)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TransactionList component error:', error);
        reportError(error);
        return null;
    }
}
