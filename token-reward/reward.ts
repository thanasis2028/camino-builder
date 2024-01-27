import dotenv from 'dotenv';
import Web3 from 'web3';
import path from 'path';
import { ethers } from 'ethers';

dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const NETWORK_URL = process.env.NETWORK_URL;
export const REWARD_CONTRACT_ADDRESS = process.env.REWARD_CONTRACT_ADDRESS;

if (!PRIVATE_KEY || !NETWORK_URL || !REWARD_CONTRACT_ADDRESS) {
    throw new Error('Please make sure you have a .env file with the required variables.');
}

const web3 = new Web3(NETWORK_URL);
const contractName = 'RewardToken'; // Replace with your contract's name
const artifactsDir = path.join(__dirname,  'artifacts', 'contracts', 'reward.sol');
const contractArtifact = require(path.join(artifactsDir, `${contractName}.json`));

const rewardContractAbi = contractArtifact.abi;
const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const rewardContract = new ethers.Contract(REWARD_CONTRACT_ADDRESS, rewardContractAbi, wallet);

export const rewardUser = async (userAddress: string, rewardAmount: number) => {
    try {
        // Define transaction overrides (optional)
        const overrides = {
            // If you want to specify a gas limit
            gasLimit: ethers.utils.hexlify(100000), // Example gas limit, adjust as needed
            // For EIP-1559 transactions, you can specify maxFeePerGas and maxPriorityFeePerGas
            maxFeePerGas: ethers.utils.parseUnits('200', 'gwei'),
            maxPriorityFeePerGas: ethers.utils.parseUnits('2', 'gwei'), // Example max priority fee per gas
            // Other overrides can be added here as needed
        };

        // Call the reward function from your smart contract with overrides
        const tx = await rewardContract.reward(userAddress, rewardAmount, overrides);
        console.log('Transaction submitted:', tx.hash);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log('Tokens rewarded to user:', userAddress);
    } catch (error) {
        console.error('Transaction failed:', error);
        throw error;
    }
};