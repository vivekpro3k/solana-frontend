function TokenCreator({ onSuccess, onError }) {
    try {
        const [name, setName] = React.useState('');
        const [symbol, setSymbol] = React.useState('');
        const [decimals, setDecimals] = React.useState(9);
        const [isLoading, setIsLoading] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);
            try {
                const mintAddress = await createToken(name, symbol, decimals);
                onSuccess(`Token created successfully: ${mintAddress}`);
                setName('');
                setSymbol('');
                setDecimals(9);
            } catch (error) {
                onError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div data-name="token-creator" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Create Token
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="token-name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Token Name
                        </label>
                        <input
                            id="token-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter token name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="token-symbol" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Symbol
                        </label>
                        <input
                            id="token-symbol"
                            type="text"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter token symbol"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="token-decimals" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Decimals
                        </label>
                        <input
                            id="token-decimals"
                            type="number"
                            value={decimals}
                            onChange={(e) => setDecimals(parseInt(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="0 - 9"
                            min="0"
                            max="9"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-gray-600"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="loading-spinner mr-2"></div>
                                Creating...
                            </div>
                        ) : (
                            'Create Token'
                        )}
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error('TokenCreator component error:', error);
        return null;
    }
}
