const NETWORK = "devnet";
const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl(NETWORK),
    'confirmed'
);

function isPhantomInstalled() {
    return window.solana && window.solana.isPhantom;
}

async function connectWallet() {
    try {
        if (!isPhantomInstalled()) {
            throw new Error("Please install Phantom wallet from phantom.app");
        }

        // Check if already connected
        if (window.solana.isConnected) {
            return window.solana.publicKey.toString();
        }

        // Request connection
        const resp = await window.solana.connect();
        
        // Ensure we're on devnet
        await window.solana.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: 'devnet' }],
        });

        return resp.publicKey.toString();
    } catch (error) {
        console.error("Error connecting wallet:", error);
        throw error;
    }
}

async function disconnectWallet() {
    try {
        if (window.solana && window.solana.isConnected) {
            await window.solana.disconnect();
        }
    } catch (error) {
        console.error("Error disconnecting wallet:", error);
        throw error;
    }
}

async function getWalletBalance(publicKey) {
    try {
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
        return balance / solanaWeb3.LAMPORTS_PER_SOL;
    } catch (error) {
        console.error("Error getting balance:", error);
        throw error;
    }
}

async function createToken(name, symbol, decimals) {
    try {
        const mint = await splToken.Token.createMint(
            connection,
            window.solana,
            window.solana.publicKey,
            null,
            decimals,
            splToken.TOKEN_PROGRAM_ID
        );
        return mint.publicKey.toString();
    } catch (error) {
        console.error("Error creating token:", error);
        throw error;
    }
}

async function mintToken(mintAddress, amount) {
    try {
        const mintPublicKey = new solanaWeb3.PublicKey(mintAddress);
        const token = new splToken.Token(
            connection,
            mintPublicKey,
            splToken.TOKEN_PROGRAM_ID,
            window.solana
        );

        const associatedTokenAccount = await token.getOrCreateAssociatedAccountInfo(
            window.solana.publicKey
        );

        await token.mintTo(
            associatedTokenAccount.address,
            window.solana.publicKey,
            [],
            amount
        );

        return true;
    } catch (error) {
        console.error("Error minting token:", error);
        throw error;
    }
}

async function transferToken(mintAddress, recipientAddress, amount) {
    try {
        const mintPublicKey = new solanaWeb3.PublicKey(mintAddress);
        const recipientPublicKey = new solanaWeb3.PublicKey(recipientAddress);

        const token = new splToken.Token(
            connection,
            mintPublicKey,
            splToken.TOKEN_PROGRAM_ID,
            window.solana
        );

        const sourceAccount = await token.getOrCreateAssociatedAccountInfo(
            window.solana.publicKey
        );

        const destinationAccount = await token.getOrCreateAssociatedAccountInfo(
            recipientPublicKey
        );

        await token.transfer(
            sourceAccount.address,
            destinationAccount.address,
            window.solana.publicKey,
            [],
            amount
        );

        return true;
    } catch (error) {
        console.error("Error transferring token:", error);
        throw error;
    }
}
