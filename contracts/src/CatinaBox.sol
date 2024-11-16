// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "solady/src/auth/Ownable.sol";
import "solady/src/utils/SafeTransferLib.sol";
import "solady/src/tokens/ERC20.sol";

contract CatinaBox is Ownable {
    // Roles
    bytes32 public constant TEE_ROLE = keccak256("TEE_ROLE");

    // Structs
    struct Experiment {
        address owner;
        string requestedDataSpec; // JSON string specifying required data
        uint256 reward;
        bool active;
        ERC20 paymentToken;
    }

    struct DataShare {
        string dataCid;
        bool isFullAccess;
        bool validated;
        bool paid;
    }

    // State variables
    mapping(uint256 => Experiment) public experiments;
    mapping(address => bool) public isTrustedTEE;
    mapping(uint256 => mapping(string => DataShare)) public experimentDataShares; // experimentId => dataCid => DataShare
    uint256 public nextExperimentId;

    // Events
    event ExperimentCreated(
        uint256 indexed experimentId,
        address indexed owner,
        string requestedDataSpec,
        uint256 reward,
        address paymentToken
    );
    event DataShareInitiated(uint256 indexed experimentId, address indexed sharer, string dataCid, bool isFullAccess);
    event DataShareFinalized(
        uint256 indexed experimentId, string dataCid, string processedCid, address indexed sharer, bool isFullAccess
    );

    constructor() {
        _initializeOwner(msg.sender);
    }

    modifier onlyTEE() {
        require(isTrustedTEE[msg.sender], "Caller is not a trusted TEE");
        _;
    }

    modifier experimentExists(uint256 experimentId) {
        require(experiments[experimentId].owner != address(0), "Experiment does not exist");
        _;
    }

    // Admin functions
    function setTrustedTEE(address tee, bool trusted) external onlyOwner {
        isTrustedTEE[tee] = trusted;
    }

    // Main functions
    function createExperiment(string calldata requestedDataSpec, uint256 reward, address paymentToken)
        external
        returns (uint256)
    {
        uint256 experimentId = nextExperimentId++;

        experiments[experimentId] = Experiment({
            owner: msg.sender,
            requestedDataSpec: requestedDataSpec,
            reward: reward,
            active: true,
            paymentToken: ERC20(paymentToken)
        });

        emit ExperimentCreated(experimentId, msg.sender, requestedDataSpec, reward, paymentToken);
        return experimentId;
    }

    function initiateDataSharing(uint256 experimentId, string calldata dataCid, bool isFullAccess)
        external
        experimentExists(experimentId)
    {
        require(experiments[experimentId].active, "Experiment is not active");

        experimentDataShares[experimentId][dataCid] =
            DataShare({dataCid: dataCid, isFullAccess: isFullAccess, validated: false, paid: false});

        emit DataShareInitiated(experimentId, msg.sender, dataCid, isFullAccess);
    }

    function finalizeDataSharing(
        uint256 experimentId,
        string calldata originalCid,
        string calldata processedCid,
        address sharer,
        bool isValid
    ) external onlyTEE experimentExists(experimentId) {
        Experiment storage experiment = experiments[experimentId];
        DataShare storage dataShare = experimentDataShares[experimentId][originalCid];

        require(!dataShare.validated, "Data already validated");
        require(!dataShare.paid, "Already paid");

        if (isValid) {
            dataShare.validated = true;

            // Store the processed CID (same as original for full access)
            string memory finalCid = dataShare.isFullAccess ? originalCid : processedCid;
            experimentDataShares[experimentId][finalCid] =
                DataShare({dataCid: finalCid, isFullAccess: dataShare.isFullAccess, validated: true, paid: false});

            // Pay the sharer
            SafeTransferLib.safeTransferFrom(
                address(experiment.paymentToken), experiment.owner, sharer, experiment.reward
            );

            experimentDataShares[experimentId][finalCid].paid = true;

            emit DataShareFinalized(experimentId, originalCid, finalCid, sharer, dataShare.isFullAccess);
        }
    }

    // View functions
    function hasAccess(uint256 experimentId, address user, string calldata dataCid)
        external
        view
        experimentExists(experimentId)
        returns (bool)
    {
        // Only experiment owner can access shared data
        if (user != experiments[experimentId].owner) {
            return false;
        }

        DataShare storage dataShare = experimentDataShares[experimentId][dataCid];
        return dataShare.validated && dataShare.paid;
    }

    function getExperimentDetails(uint256 experimentId)
        external
        view
        experimentExists(experimentId)
        returns (address owner, string memory requestedDataSpec, uint256 reward, bool active, address paymentToken)
    {
        Experiment storage experiment = experiments[experimentId];
        return (
            experiment.owner,
            experiment.requestedDataSpec,
            experiment.reward,
            experiment.active,
            address(experiment.paymentToken)
        );
    }
}
