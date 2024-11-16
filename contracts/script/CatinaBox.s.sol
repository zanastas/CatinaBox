// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CatinaBox} from "../src/CatinaBox.sol";

contract CatinaBoxScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address initialTEE = vm.envAddress("INITIAL_TEE_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy CatinaBox
        CatinaBox catinaBox = new CatinaBox();

        // Set initial TEE if provided
        if (initialTEE != address(0)) {
            catinaBox.setTrustedTEE(initialTEE, true);
        }

        vm.stopBroadcast();

        console.log("CatinaBox deployed at:", address(catinaBox));
        console.log("Owner:", catinaBox.owner());
        if (initialTEE != address(0)) {
            console.log("Initial TEE set:", initialTEE);
        }
    }
}
