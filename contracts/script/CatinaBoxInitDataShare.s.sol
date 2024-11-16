// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {CatinaBox} from "../src/CatinaBox.sol";

contract CatinaBoxInitDataShare is Script {
    // Constants for the data sharing
    uint256 public constant EXPERIMENT_ID = 0; // First experiment
    // string public constant DATA_CID = "bafybeibipirj3lnickpaa26fdw3qp777k42smdmmst5nh2z6tatvucjwc4"; // Replace with your actual CID
    string public constant DATA_CID = "bafybeieroo27zktvpsw6zn3exqwz23tgckqkkic3xp67dxzoqoy3v7oob4"; // Replace with your actual CID
    bool public constant IS_FULL_ACCESS = true; // Set to true for full access, false for processed data

    function run() external {
        // Load the private key from environment
        vm.startBroadcast();

        // Get the deployed CatinaBox contract address
        CatinaBox catinaBox = CatinaBox(0xB345D96d8f1EF2fb463a82A15E2A2EA066F003c0);

        // Initialize data sharing
        catinaBox.initiateDataSharing(EXPERIMENT_ID, DATA_CID, IS_FULL_ACCESS);

        // Stop broadcasting transactions
        vm.stopBroadcast();

        console.log("Data sharing initiated successfully");
        console.log("Experiment ID:", EXPERIMENT_ID);
        console.log("Data CID:", DATA_CID);
        console.log("Is Full Access:", IS_FULL_ACCESS);

        // Print experiment details for verification
        (address owner, string memory spec, uint256 reward, bool active, address token, uint64 endDate) =
            catinaBox.getExperimentDetails(EXPERIMENT_ID);

        console.log("\nExperiment Details:");
        console.log("Owner:", owner);
        console.log("Specification:", spec);
        console.log("Reward:", reward);
        console.log("Active:", active);
        console.log("Payment Token:", token);
        console.log("End Date:", endDate);
    }
}
