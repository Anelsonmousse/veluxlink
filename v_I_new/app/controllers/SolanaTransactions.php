<?php 

use Attestto\SolanaPhpSdk\Connection;
use Attestto\SolanaPhpSdk\Keypair;
use Attestto\SolanaPhpSdk\SystemProgram;
use Attestto\SolanaPhpSdk\Transaction;
use Attestto\SolanaPhpSdk\SolanaRpcClient;

class SolanaTransactions extends Controller
{
    private Connection $connection;
    private Keypair $senderWallet;
    private Keypair $receiverWallet;

    public function __construct(string $senderSecretKey, string $receiverSecretKey, string $rpcUrl) {
        $this->rpcClient = new SolanaRpcClient($rpcUrl); // Create the RPC client
        $this->connection = new Connection($rpcUrl);
        $this->senderWallet = Keypair::fromSecretKey(base64_decode($senderSecretKey));
        $this->receiverWallet = Keypair::fromSecretKey(base64_decode($receiverSecretKey));
        $this->program = new Program($this->rpcClient); // Pass the rpcClient to the Program
    }


    public function airdrop(int $amount): string {
        $txhash = $this->connection->requestAirdrop($this->senderWallet->getPublicKey(), $amount);
        return $txhash;
    }

    public function transfer(float $amount): string {
        $transaction = new Transaction();
        $transaction->add(
            SystemProgram::transfer([
                'fromPubkey' => $this->senderWallet->getPublicKey(),
                'toPubkey' => $this->receiverWallet->getPublicKey(),
                'lamports' => intval($amount * 1_000_000_000), // Convert SOL to lamports
            ])
        );
        
        $transaction->setFeePayer($this->senderWallet->getPublicKey());
        
        // Sign the transaction
        $transaction->sign([$this->senderWallet]);

        // Send the transaction
        return $this->connection->sendTransaction($transaction);
    }

    public function getBalances(): array {
        $senderBalance = $this->connection->getBalance($this->senderWallet->getPublicKey());
        $receiverBalance = $this->connection->getBalance($this->receiverWallet->getPublicKey());

        return [
            'sender' => $senderBalance / 1_000_000_000, // Convert lamports to SOL
            'receiver' => $receiverBalance / 1_000_000_000, // Convert lamports to SOL
        ];
    }
}

// Usage
$senderSecretKey = '527qqkRUAovM4eco7bDAorjL9JCZWeJzNidTxRZRWq8Lin5zRdRaYG6Rgcujvst38nKgAyic6vXxGeGE8GSUgccH';
$receiverSecretKey = '33HGrpkNRNyG8Mw6398Kef4AGXMzskc7FafDFYJLFoBb2dDG4xXm4y5sTpC2GY5NuKavE6cZVzpfC1M4B7U4H5ND';
$rpcUrl = "https://api.testnet.solana.com";

$transactionHandler = new SolanaTransactions($senderSecretKey, $receiverSecretKey, $rpcUrl);

// Uncomment to test airdrop
// echo "Airdrop transaction hash: " . $transactionHandler->airdrop(1_000_000_000) . PHP_EOL; // Airdrop 1 SOL

// Transfer 0.4 SOL
$transactionHash = $transactionHandler->transfer(0.4);
echo "Transfer transaction hash: " . $transactionHash . PHP_EOL;

// Get balances
$balances = $transactionHandler->getBalances();
echo "Sender Balance: {$balances['sender']} SOL" . PHP_EOL;
echo "Receiver Balance: {$balances['receiver']} SOL" . PHP_EOL;
