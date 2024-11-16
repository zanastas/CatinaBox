// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CatinaBox} from "../src/CatinaBox.sol";
import {CatinaBoxToken} from "../src/CatinaBoxToken.sol";

contract CatinaBoxScript is Script {
    uint256 public constant REWARD_AMOUNT = 50 ether;
    string public constant REQUESTED_DATA_SPEC =
        '{"studyRequirements":{"geneticMarkers":[{"marker":"rs523349","gene":"SRD5A2","include":["CC","GC"],"exclude":["GG"]},{"marker":"rs731236","gene":"VDR","include":["AA","AG"],"exclude":["GG"]}],"demographicCriteria":{"minAge":18,"maxAge":65,"sex":["M","F"]}},"requiredData":{"required":["sex","age","demographic","rs523349","rs731236"],"optional":["bloodVitaminDLevels"]}}';

    function setUp() public {}

    function run() public {
        // Get optional TEE address from environment
        address initialTEE = vm.envOr("INITIAL_TEE_ADDRESS", address(0));

        // Start broadcast (private key will be provided by keystore)
        vm.startBroadcast();

        // Deploy CatinaBox
        CatinaBox catinaBox = new CatinaBox();
        CatinaBoxToken catinaBoxToken = new CatinaBoxToken();
        catinaBoxToken.mint(catinaBox.owner(), 100_000 ether);
        catinaBoxToken.approve(address(catinaBox), type(uint256).max);

        console.log("CatinaBox deployed at:", address(catinaBox));
        console.log("CatinaBoxToken deployed at:", address(catinaBoxToken));
        console.log("Owner:", catinaBox.owner());
        console.log("msg.sender:", msg.sender);

        // Set initial TEE if provided
        if (initialTEE != address(0)) {
            catinaBox.setTrustedTEE(initialTEE, true);
        }

        // create first Experiment
        uint256 experimentId =
            catinaBox.createExperiment(REQUESTED_DATA_SPEC, REWARD_AMOUNT, address(catinaBoxToken), 0);

        vm.stopBroadcast();
    }
}
