import dotenv from 'dotenv';
import Web3 from 'web3';
import path from 'path';
import { Contract, Signer, ethers } from 'ethers';

dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const NETWORK_URL = process.env.NETWORK_URL;
export const REWARD_CONTRACT_ADDRESS = process.env.REWARD_CONTRACT_ADDRESS;
export const EVENT_MANAGER_CONTRACT_ADDRESS = process.env.EVENT_MANAGER_CONTRACT_ADDRESS;
export const MILESTONE_NFT_CONTRACT_ADDRESS = process.env.MILESTONE_NFT_CONTRACT_ADDRESS;

if (!PRIVATE_KEY || !NETWORK_URL || !REWARD_CONTRACT_ADDRESS || !EVENT_MANAGER_CONTRACT_ADDRESS || !MILESTONE_NFT_CONTRACT_ADDRESS) {
    throw new Error('Please make sure you have a .env file with the required variables.');
}

const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
const web3 = new Web3(NETWORK_URL);
const signer = provider.getSigner();
const artifactsDir = path.join(__dirname,  'artifacts', 'contracts');
const contractArtifact = require(path.join(artifactsDir, 'RewardToken.sol', 'RewardToken.json'));
const eventManagerAbi = require(path.join(artifactsDir, 'SustainabilityEventManager.sol', 'SustainabilityEventManager.json')).abi;
const milestoneNftAbi = require(path.join(artifactsDir, 'SustainabilityMilestoneNFT.sol', 'SustainabilityMilestoneNFT.json')).abi;

const rewardContractAbi = contractArtifact.abi;
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const rewardContract = new ethers.Contract(REWARD_CONTRACT_ADDRESS, rewardContractAbi, wallet);
const eventManagerContract = new ethers.Contract(EVENT_MANAGER_CONTRACT_ADDRESS, eventManagerAbi, signer);

async function joinEvent(
  contractAddress: string,
  signer: Signer,
  eventId: number,
  entryFee: number // Entry fee in ETH
): Promise<void> {
  const SustainabilityEventManager = new Contract(
    contractAddress,
    [
      "function joinEvent(uint256 eventId) external payable"
    ],
    signer
  );

  const entryFeeWei = ethers.utils.parseEther(entryFee.toString());

  const tx = await SustainabilityEventManager.joinEvent(eventId, { value: entryFeeWei });
  await tx.wait();
  console.log(`Joined event with tx hash: ${tx.hash}`);
}

  async function createEvent(
    contractAddress: string,
    signer: Signer,
    startDate: number,
    endDate: number,
    entryFee: number, // Entry fee in ETH
    rewardAmount: number // Reward amount in tokens
  ): Promise<void> {
    const SustainabilityEventManager = new Contract(
      contractAddress,
      [
        "function createEvent(uint256 startDate, uint256 endDate, uint256 entryFee, uint256 rewardAmount) external"
      ],
      signer
    );
  
    const entryFeeWei = ethers.utils.parseEther(entryFee.toString());
    const rewardAmountWei = ethers.utils.parseUnits(rewardAmount.toString(), 18);
  
    const tx = await SustainabilityEventManager.createEvent(startDate, endDate, entryFeeWei, rewardAmountWei);
    await tx.wait();
    console.log(`Event created with tx hash: ${tx.hash}`);
  }

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