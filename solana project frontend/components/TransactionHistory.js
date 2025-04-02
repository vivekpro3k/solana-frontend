function TransactionHistory({ transactions }) {
    try {
        return (
            <div data-name="transaction-history" className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                <div className="space-y-4">
                    {transactions.length === 0 ? (
                        <p className="text-gray-500 text-center">No transactions yet</p>
                    ) : (
                        transactions.map((tx, index) => (
                            <div
                                key={index}
                                data-name="transaction-item"
                                className="transaction-item p-4 rounded-lg border border-gray-200"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">
                                            {tx.type}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {tx.signature}
                                        </p>
                                    </div>
                                    <span className={`text-sm ${tx.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TransactionHistory component error:', error);
        reportError(error);
        return null;
    }
}
