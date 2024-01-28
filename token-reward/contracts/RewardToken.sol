// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract RewardToken is ERC20, AccessControl {
    bytes32 public constant REWARDER_ROLE = keccak256("REWARDER_ROLE");

    constructor() ERC20("GreenOnionToken", "GOT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function reward(address to, uint256 amount) external onlyRole(REWARDER_ROLE) {
        _mint(to, amount);
        emit RewardGiven(to, amount);
    }

    event RewardGiven(address indexed to, uint256 amount);
}