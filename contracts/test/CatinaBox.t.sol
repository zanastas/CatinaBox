// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {CatinaBox} from "../src/CatinaBox.sol";
import {MockERC20} from "solady/test/utils/mocks/MockERC20.sol";

contract CatinaBoxTest is Test {
    CatinaBox public catinaBox;
    MockERC20 public token;

    address public owner;
    address public tee;
    address public dataProvider;
    address public experimentOwner;

    uint256 public constant REWARD = 1000e18;
    string public constant DATA_SPEC = '{"required": ["age", "height"]}';
    string public constant FULL_DATA_CID = "QmFullDataCID";
    string public constant PARTIAL_DATA_CID = "QmPartialDataCID";

    event ExperimentCreated(
        uint256 indexed experimentId,
        address indexed owner,
        string requestedDataSpec,
        uint256 reward,
        address paymentToken,
        uint64 endDate
    );

    function setUp() public {
        owner = makeAddr("owner");
        tee = makeAddr("tee");
        dataProvider = makeAddr("dataProvider");
        experimentOwner = makeAddr("experimentOwner");

        vm.startPrank(owner);
        catinaBox = new CatinaBox();
        token = new MockERC20("Test Token", "TEST", 18);
        vm.stopPrank();

        // Setup TEE
        vm.prank(owner);
        catinaBox.setTrustedTEE(tee, true);

        // Mint tokens to experiment owner
        token.mint(experimentOwner, REWARD * 10);
    }

    function test_CreateExperiment() public {
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);

        vm.expectEmit(true, true, true, true);
        emit ExperimentCreated(0, experimentOwner, DATA_SPEC, REWARD, address(token), 0);

        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);

        (address owner, string memory spec, uint256 reward, bool active, address paymentToken, uint64 endDate) =
            catinaBox.getExperimentDetails(experimentId);

        assertEq(owner, experimentOwner);
        assertEq(spec, DATA_SPEC);
        assertEq(reward, REWARD);
        assertTrue(active);
        assertEq(paymentToken, address(token));
        assertEq(endDate, 0);
        vm.stopPrank();
    }

    function test_InitiateAndFinalizeFullDataSharing() public {
        // Create experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // Initiate data sharing
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, true);

        // Finalize data sharing with valid and accepted data
        vm.prank(tee);
        catinaBox.finalizeDataSharing(
            experimentId,
            FULL_DATA_CID,
            FULL_DATA_CID,
            dataProvider,
            true, // valid
            true // accepted
        );

        // Check access
        bool hasAccess = catinaBox.hasAccess(experimentId, experimentOwner, FULL_DATA_CID);
        assertTrue(hasAccess);

        // Check payment
        assertEq(token.balanceOf(dataProvider), REWARD);
    }

    function test_InitiateAndFinalizePartialDataSharing() public {
        // Create experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // Initiate data sharing
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, false);

        // Finalize data sharing with partial data
        vm.prank(tee);
        catinaBox.finalizeDataSharing(
            experimentId,
            FULL_DATA_CID,
            PARTIAL_DATA_CID,
            dataProvider,
            true, // valid
            true // accepted
        );

        // Check access to partial data
        bool hasAccess = catinaBox.hasAccess(experimentId, experimentOwner, PARTIAL_DATA_CID);
        assertTrue(hasAccess);

        // Check no access to full data
        bool hasFullAccess = catinaBox.hasAccess(experimentId, experimentOwner, FULL_DATA_CID);
        assertFalse(hasFullAccess);

        // Check payment
        assertEq(token.balanceOf(dataProvider), REWARD);
    }

    function test_ExperimentExpiration() public {
        // Create experiment with end date
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint64 endDate = uint64(block.timestamp + 1 days);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), endDate);
        vm.stopPrank();

        // Try to share after expiration
        vm.warp(block.timestamp + 2 days);
        vm.prank(dataProvider);
        vm.expectRevert(CatinaBox.ExperimentExpired.selector);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, true);
    }

    function testFuzz_CreateExperimentWithReward(uint256 reward) public {
        vm.assume(reward > 0 && reward < type(uint256).max / 2);

        vm.startPrank(experimentOwner);
        token.mint(experimentOwner, reward);
        token.approve(address(catinaBox), reward);

        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, reward, address(token), 0);

        (,, uint256 storedReward,,,) = catinaBox.getExperimentDetails(experimentId);
        assertEq(storedReward, reward);
        vm.stopPrank();
    }

    function test_RevertWhenNotTEE() public {
        vm.prank(address(0xdead));
        vm.expectRevert(CatinaBox.NotTEE.selector);
        catinaBox.finalizeDataSharing(0, FULL_DATA_CID, PARTIAL_DATA_CID, dataProvider, true, true);
    }

    function test_RevertWhenExperimentNotFound() public {
        vm.expectRevert(CatinaBox.ExperimentNotFound.selector);
        catinaBox.initiateDataSharing(999, FULL_DATA_CID, true);
    }

    function test_RevertWhenAlreadyValidated() public {
        // Create and setup experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // First sharing
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, true);

        vm.prank(tee);
        catinaBox.finalizeDataSharing(
            experimentId,
            FULL_DATA_CID,
            FULL_DATA_CID,
            dataProvider,
            true, // valid
            true // accepted
        );

        // Try to validate again
        vm.prank(tee);
        vm.expectRevert(CatinaBox.AlreadyValidated.selector);
        catinaBox.finalizeDataSharing(experimentId, FULL_DATA_CID, FULL_DATA_CID, dataProvider, true, true);
    }

    function test_ValidButNotAcceptedData() public {
        // Create experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // Initiate data sharing
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, true);

        // Finalize with valid but not accepted data
        vm.prank(tee);
        catinaBox.finalizeDataSharing(
            experimentId,
            FULL_DATA_CID,
            FULL_DATA_CID,
            dataProvider,
            true, // valid data
            false // but not accepted
        );

        // Check no access
        bool hasAccess = catinaBox.hasAccess(experimentId, experimentOwner, FULL_DATA_CID);
        assertFalse(hasAccess);

        // Check no payment
        assertEq(token.balanceOf(dataProvider), 0);
    }

    function test_ValidAndAcceptedData() public {
        // Create experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // Initiate data sharing
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, true);

        // Finalize with valid and accepted data
        vm.prank(tee);
        catinaBox.finalizeDataSharing(
            experimentId,
            FULL_DATA_CID,
            FULL_DATA_CID,
            dataProvider,
            true, // valid data
            true // and accepted
        );

        // Check access granted
        bool hasAccess = catinaBox.hasAccess(experimentId, experimentOwner, FULL_DATA_CID);
        assertTrue(hasAccess);

        // Check payment received
        assertEq(token.balanceOf(dataProvider), REWARD);
    }

    function test_InvalidDataNotAccepted() public {
        // Create experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // Initiate data sharing
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, true);

        // Finalize with invalid data
        vm.prank(tee);
        catinaBox.finalizeDataSharing(
            experimentId,
            FULL_DATA_CID,
            FULL_DATA_CID,
            dataProvider,
            false, // invalid data
            false // not accepted
        );

        // Check no access
        bool hasAccess = catinaBox.hasAccess(experimentId, experimentOwner, FULL_DATA_CID);
        assertFalse(hasAccess);

        // Check no payment
        assertEq(token.balanceOf(dataProvider), 0);
    }

    function test_PartialDataAcceptance() public {
        // Create experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // Initiate partial data sharing
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, false);

        // Finalize with valid and accepted partial data
        vm.prank(tee);
        catinaBox.finalizeDataSharing(
            experimentId,
            FULL_DATA_CID,
            PARTIAL_DATA_CID,
            dataProvider,
            true, // valid data
            true // and accepted
        );

        // Check access to partial data
        bool hasPartialAccess = catinaBox.hasAccess(experimentId, experimentOwner, PARTIAL_DATA_CID);
        assertTrue(hasPartialAccess);

        // Check no access to full data
        bool hasFullAccess = catinaBox.hasAccess(experimentId, experimentOwner, FULL_DATA_CID);
        assertFalse(hasFullAccess);

        // Check payment received
        assertEq(token.balanceOf(dataProvider), REWARD);
    }

    function test_MultipleDataSharesWithDifferentAcceptance() public {
        // Create experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD * 2);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // First data share - valid but not accepted
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, "CID1", true);

        vm.prank(tee);
        catinaBox.finalizeDataSharing(experimentId, "CID1", "CID1", dataProvider, true, false);

        // Second data share - valid and accepted
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, "CID2", true);

        vm.prank(tee);
        catinaBox.finalizeDataSharing(experimentId, "CID2", "CID2", dataProvider, true, true);

        // Check access
        assertFalse(catinaBox.hasAccess(experimentId, experimentOwner, "CID1"));
        assertTrue(catinaBox.hasAccess(experimentId, experimentOwner, "CID2"));

        // Check payment only for accepted data
        assertEq(token.balanceOf(dataProvider), REWARD);
    }

    function test_RevertWhenAlreadyInitiated() public {
        // Create experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // First initiation
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, true);

        // Try to initiate again with same CID
        vm.prank(dataProvider);
        vm.expectRevert(CatinaBox.AlreadyInitiated.selector);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, true);
    }

    function test_InitializedFlagIsSet() public {
        // Create experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // Initiate data sharing
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, true);

        // Get DataShare struct and check initialized flag
        (bool isFullAccess, bool valid, bool accepted, bool paid, bool initialized) =
            catinaBox.experimentDataShares(experimentId, FULL_DATA_CID);

        assertTrue(initialized);
        assertTrue(isFullAccess);
        assertFalse(valid);
        assertFalse(accepted);
        assertFalse(paid);
    }

    function test_RevertWhenAlreadyInitiatedWithDifferentAccess() public {
        // Create experiment
        vm.startPrank(experimentOwner);
        token.approve(address(catinaBox), REWARD);
        uint256 experimentId = catinaBox.createExperiment(DATA_SPEC, REWARD, address(token), 0);
        vm.stopPrank();

        // First initiation with full access
        vm.prank(dataProvider);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, true);

        // Try to initiate again with partial access
        vm.prank(dataProvider);
        vm.expectRevert(CatinaBox.AlreadyInitiated.selector);
        catinaBox.initiateDataSharing(experimentId, FULL_DATA_CID, false);
    }
}
