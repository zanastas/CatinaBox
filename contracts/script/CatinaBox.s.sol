// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CatinaBox} from "../src/CatinaBox.sol";

contract CatinaBoxScript is Script {
    function setUp() public {}

    function run() public {
        // Get optional TEE address from environment
        address initialTEE = vm.envOr("INITIAL_TEE_ADDRESS", address(0));

        // Start broadcast (private key will be provided by keystore)
        vm.startBroadcast();

        // Deploy CatinaBox
        CatinaBox catinaBox = new CatinaBox();

        console.log("CatinaBox deployed at:", address(catinaBox));
        console.log("Owner:", catinaBox.owner());
        console.log("msg.sender:", msg.sender);

        // Set initial TEE if provided
        if (initialTEE != address(0)) {
            catinaBox.setTrustedTEE(initialTEE, true);
        }

        vm.stopBroadcast();
    }
}
