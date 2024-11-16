// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {CatinaBox} from "../src/CatinaBox.sol";

contract CatinaBoxCreateExp is Script {
    // You can modify these values as needed
    uint256 public constant REWARD_AMOUNT = 0.1 ether;
    address public constant PAYMENT_TOKEN = address(0x1234); // Replace with actual token address
    string public constant REQUESTED_DATA_SPEC = "Sample data specification";
    uint64 public constant DURATION_DAYS = 7;

    function run() external {
        // Start broadcasting transactions
        vm.startBroadcast();

        // Get the deployed CatinaBox contract address
        CatinaBox catinaBox = CatinaBox(0xB345D96d8f1EF2fb463a82A15E2A2EA066F003c0);

        // Calculate end date (current timestamp + duration)
        uint64 endDate = uint64(block.timestamp + (DURATION_DAYS * 24 * 60 * 60));

        // Create experiment with correct parameters
        uint256 experimentId = catinaBox.createExperiment(REQUESTED_DATA_SPEC, REWARD_AMOUNT, PAYMENT_TOKEN, endDate);

        // Stop broadcasting transactions
        vm.stopBroadcast();

        console.log("Experiment created successfully");
        console.log("Experiment ID:", experimentId);
        console.log("Reward Amount:", REWARD_AMOUNT);
        console.log("Payment Token:", PAYMENT_TOKEN);
        console.log("End Date:", endDate);
    }
}
