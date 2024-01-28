// deploy.ts
import { ethers } from "hardhat";

async function main() {
  // Deploy the RewardToken contract
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();
  console.log("RewardToken deployed to:", rewardToken.address);

  // Deploy the SustainabilityMilestoneNFT contract
  const SustainabilityMilestoneNFT = await ethers.getContractFactory("SustainabilityMilestoneNFT");
  const milestoneNFT = await SustainabilityMilestoneNFT.deploy();
  await milestoneNFT.deployed();
  console.log("SustainabilityMilestoneNFT deployed to:", milestoneNFT.address);

  // Deploy the SustainabilityEventManager contract with the addresses of the RewardToken and SustainabilityMilestoneNFT contracts
  const SustainabilityEventManager = await ethers.getContractFactory("SustainabilityEventManager");
  const eventManager = await SustainabilityEventManager.deploy(rewardToken.address, milestoneNFT.address);
  await eventManager.deployed();
  console.log("SustainabilityEventManager deployed to:", eventManager.address);

  // Grant the REWARDER_ROLE to the SustainabilityEventManager contract
  const REWARDER_ROLE = await rewardToken.REWARDER_ROLE();
  const grantRoleTx = await rewardToken.grantRole(REWARDER_ROLE, eventManager.address);
  await grantRoleTx.wait();
  console.log("SustainabilityEventManager granted REWARDER_ROLE in RewardToken contract");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});