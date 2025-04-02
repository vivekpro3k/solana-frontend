// Wallet providers
const WALLET_PROVIDERS = {
    PHANTOM: 'phantom',
    SOLLET: 'sollet',
    SOLFLARE: 'solflare'
};

function detectWalletProvider() {
    if (window.solana?.isPhantom) return WALLET_PROVIDERS.PHANTOM;
    if (window.sollet) return WALLET_PROVIDERS.SOLLET;
    if (window.solflare) return WALLET_PROVIDERS.SOLFLARE;
    return null;
}

function getWalletProviderUrl(provider) {
    switch (provider) {
        case WALLET_PROVIDERS.PHANTOM:
            return 'https://phantom.app/';
        case WALLET_PROVIDERS.SOLLET:
            return 'https://www.sollet.io/';
        case WALLET_PROVIDERS.SOLFLARE:
            return 'https://solflare.com/';
        default:
            return '';
    }
}

async function connectToWallet(provider) {
    try {
        let wallet;
        switch (provider) {
            case WALLET_PROVIDERS.PHANTOM:
                wallet = window.solana;
                break;
            case WALLET_PROVIDERS.SOLLET:
                wallet = window.sollet;
                break;
            case WALLET_PROVIDERS.SOLFLARE:
                wallet = window.solflare;
                break;
            default:
                throw new Error('Unsupported wallet provider');
        }

        if (!wallet) {
            throw new Error(`${provider} wallet is not installed`);
        }

        const resp = await wallet.connect();
        return {
            address: resp.publicKey.toString(),
            provider
        };
    } catch (error) {
        console.error('Error connecting to wallet:', error);
        throw error;
    }
}

async function disconnectWallet(provider) {
    try {
        let wallet;
        switch (provider) {
            case WALLET_PROVIDERS.PHANTOM:
                wallet = window.solana;
                break;
            case WALLET_PROVIDERS.SOLLET:
                wallet = window.sollet;
                break;
            case WALLET_PROVIDERS.SOLFLARE:
                wallet = window.solflare;
                break;
            default:
                return;
        }

        if (wallet && wallet.isConnected) {
            await wallet.disconnect();
        }
    } catch (error) {
        console.error('Error disconnecting wallet:', error);
        throw error;
    }
}

async function getTokenAccounts(publicKey) {
    try {
        const response = await connection.getParsedTokenAccountsByOwner(
            new solanaWeb3.PublicKey(publicKey),
            {
                programId: splToken.TOKEN_PROGRAM_ID,
            }
        );

        return response.value.map(accountInfo => ({
            mint: accountInfo.account.data.parsed.info.mint,
            amount: accountInfo.account.data.parsed.info.tokenAmount.uiAmount,
            decimals: accountInfo.account.data.parsed.info.tokenAmount.decimals
        }));
    } catch (error) {
        console.error('Error fetching token accounts:', error);
        throw error;
    }
}

async function getTransactionHistory(publicKey) {
    try {
        const signatures = await connection.getSignaturesForAddress(
            new solanaWeb3.PublicKey(publicKey),
            { limit: 10 }
        );

        const transactions = await Promise.all(
            signatures.map(async (sig) => {
                const tx = await connection.getParsedTransaction(sig.signature);
                return {
                    signature: sig.signature,
                    timestamp: new Date(sig.blockTime * 1000).toLocaleString(),
                    status: sig.err ? 'failed' : 'success',
                    type: determineTransactionType(tx)
                };
            })
        );

        return transactions;
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        throw error;
    }
}

function determineTransactionType(transaction) {
    // Add logic to determine transaction type based on the instruction
    if (!transaction?.meta) return 'unknown';
    
    const instructions = transaction.transaction.message.instructions;
    if (instructions.some(ix => ix.program === 'spl-token' && ix.parsed?.type === 'transfer')) {
        return 'transfer';
    }
    if (instructions.some(ix => ix.program === 'spl-token' && ix.parsed?.type === 'mintTo')) {
        return 'mint';
    }
    return 'other';
}
