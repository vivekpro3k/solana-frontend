function TokenMinter({ onSuccess, onError }) {
    try {
        const [mintAddress, setMintAddress] = React.useState('');
        const [amount, setAmount] = React.useState('');
        const [isLoading, setIsLoading] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);
            try {
                await mintToken(mintAddress, parseInt(amount));
                onSuccess(`Successfully minted ${amount} tokens`);
                setMintAddress('');
                setAmount('');
            } catch (error) {
                onError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div data-name="token-minter" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Mint Tokens</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Token Address
                        </label>
                        <input
                            type="text"
                            value={mintAddress}
                            onChange={(e) => setMintAddress(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                                       shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white 
                                       focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                                       shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white 
                                       focus:border-blue-500 focus:ring-blue-500"
                            min="1"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-green-300"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="loading-spinner mr-2"></div>
                                Minting...
                            </div>
                        ) : (
                            'Mint Tokens'
                        )}
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error('TokenMinter component error:', error);
        reportError(error);
        return null;
    }
}
