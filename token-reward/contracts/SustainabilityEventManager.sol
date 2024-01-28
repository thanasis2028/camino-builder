// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./RewardToken.sol";
import "./SustainabilityMilestoneNFT.sol";

contract SustainabilityEventManager {

    struct Event {
        uint256 id;
        uint256 startDate;
        uint256 endDate;
        uint256 entryFee;
        uint256 rewardAmount;
    }

    uint256 public nextEventId;
    mapping(uint256 => Event) public events;
    RewardToken private rewardToken;
    SustainabilityMilestoneNFT private milestoneNFT;

    // Define the milestones
    uint256[] private milestones = [5000 * 1e18, 10000 * 1e18, 20000 * 1e18];
    mapping(address => uint256) public userTokenBalances;

    constructor(address _rewardTokenAddress, address _milestoneNFTAddress) {
        rewardToken = RewardToken(_rewardTokenAddress);
        milestoneNFT = SustainabilityMilestoneNFT(_milestoneNFTAddress);
    }

    function joinEvent(uint256 eventId) external payable {
        // Ensure the event exists
        require(eventId < nextEventId, "Event does not exist");

        // Get the event details
        Event memory eventDetails = events[eventId];

        // Check if the event is currently active
        require(block.timestamp >= eventDetails.startDate && block.timestamp <= eventDetails.endDate, "Event is not active");

        // Check if the correct entry fee is paid
        require(msg.value == eventDetails.entryFee, "Incorrect entry fee");

        // Reward the participant with tokens
        rewardToken.reward(msg.sender, eventDetails.rewardAmount);

        // Update the user's token balance
        userTokenBalances[msg.sender] += eventDetails.rewardAmount;

        // Check and mint NFTs if milestones are reached
        for (uint256 i = 0; i < milestones.length; i++) {
            if (userTokenBalances[msg.sender] >= milestones[i]) {
                // Check if the NFT for this milestone has already been minted for this user
                if (!hasMintedMilestoneNFT[msg.sender][milestones[i]]) {
                    // Mint an NFT for the milestone
                    string memory tokenURI = getTokenURIFromMilestone(milestones[i]);
                    milestoneNFT.createCollectible(msg.sender, tokenURI);
                    // Mark this milestone NFT as minted for this user
                    hasMintedMilestoneNFT[msg.sender][milestones[i]] = true;
                }
            }
        }

        // Emit an event for joining the event
        emit EventJoined(msg.sender, eventId, eventDetails.entryFee, eventDetails.rewardAmount);
    }

    // Mapping to keep track of which NFT milestones have been minted for each user
    mapping(address => mapping(uint256 => bool)) public hasMintedMilestoneNFT;

    event EventJoined(address indexed participant, uint256 indexed eventId, uint256 entryFee, uint256 rewardAmount);

    function getTokenURIFromMilestone(uint256 milestone) private pure returns (string memory) {
        if (milestone == 5000 * 1e18) {
            return "Sustainability aware guest URI";
        } else if (milestone == 10000 * 1e18) {
            return "Ecological protector URI";
        } else if (milestone == 20000 * 1e18) {
            return "Pillar of the community URI";
        } else {
            return "Unknown Milestone";
        }
    }

    function createEvent(uint256 startDate, uint256 endDate, uint256 entryFee, uint256 rewardAmount) external {
        // Access control checks (e.g., onlyOwner or only certain role)
        require(startDate < endDate, "Start date must be before end date");
        require(entryFee > 0, "Entry fee must be greater than 0");
        require(rewardAmount > 0, "Reward amount must be greater than 0");

        // Create the event and add it to the mapping
        events[nextEventId] = Event({
            id: nextEventId,
            startDate: startDate,
            endDate: endDate,
            entryFee: entryFee,
            rewardAmount: rewardAmount
        });

        // Emit an event for the creation of a new event
        emit EventCreated(nextEventId, startDate, endDate, entryFee, rewardAmount);

        // Increment the event ID for the next event
        nextEventId++;
    }

    event EventCreated(uint256 indexed id, uint256 startDate, uint256 endDate, uint256 entryFee, uint256 rewardAmount);
}