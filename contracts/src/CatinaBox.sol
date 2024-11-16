// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "solady/src/auth/Ownable.sol";
import "solady/src/utils/SafeTransferLib.sol";
import "solady/src/tokens/ERC20.sol";

contract CatinaBox is Ownable {
    error NotTEE();
    error ExperimentNotFound();
    error ExperimentNotActive();
    error AlreadyValidated();
    error AlreadyPaid();
    error NotExperimentOwner();
    error ExperimentExpired();
    error AlreadyInitiated();

    struct Experiment {
        address owner;
        string requestedDataSpec;
        uint256 reward;
        bool active;
        ERC20 paymentToken;
        uint64 endDate;
    }

    struct DataShare {
        bool isFullAccess;
        bool valid;
        bool accepted;
        bool paid;
        bool initialized;
    }

    mapping(uint256 => Experiment) public experiments;
    mapping(address => bool) public isTrustedTEE;
    mapping(uint256 => mapping(string => DataShare)) public experimentDataShares;
    uint256 public nextExperimentId;

    event ExperimentCreated(
        uint256 indexed experimentId,
        address indexed owner,
        string requestedDataSpec,
        uint256 reward,
        address paymentToken,
        uint64 endDate
    );
    event DataShareInitiated(uint256 indexed experimentId, address indexed sharer, string dataCid, bool isFullAccess);
    event DataShareFinalized(
        uint256 indexed experimentId, string originalCid, string processedCid, address indexed sharer, bool isFullAccess
    );

    constructor() {
        _initializeOwner(msg.sender);
    }

    modifier onlyTEE() {
        if (!isTrustedTEE[msg.sender]) revert NotTEE();
        _;
    }

    modifier experimentExists(uint256 experimentId) {
        if (experiments[experimentId].owner == address(0)) revert ExperimentNotFound();
        _;
    }

    function setTrustedTEE(address tee, bool trusted) external onlyOwner {
        isTrustedTEE[tee] = trusted;
    }

    function createExperiment(string calldata requestedDataSpec, uint256 reward, address paymentToken, uint64 endDate)
        external
        returns (uint256)
    {
        uint256 experimentId = nextExperimentId++;

        experiments[experimentId] = Experiment({
            owner: msg.sender,
            requestedDataSpec: requestedDataSpec,
            reward: reward,
            active: true,
            paymentToken: ERC20(paymentToken),
            endDate: endDate
        });

        emit ExperimentCreated(experimentId, msg.sender, requestedDataSpec, reward, paymentToken, endDate);
        return experimentId;
    }

    function initiateDataSharing(uint256 experimentId, string calldata dataCid, bool isFullAccess)
        external
        experimentExists(experimentId)
    {
        Experiment storage experiment = experiments[experimentId];
        if (!experiment.active) revert ExperimentNotActive();
        if (experiment.endDate != 0 && block.timestamp > experiment.endDate) revert ExperimentExpired();

        DataShare storage dataShare = experimentDataShares[experimentId][dataCid];
        if (dataShare.initialized) revert AlreadyInitiated();

        experimentDataShares[experimentId][dataCid] =
            DataShare({isFullAccess: isFullAccess, valid: false, accepted: false, paid: false, initialized: true});

        emit DataShareInitiated(experimentId, msg.sender, dataCid, isFullAccess);
    }

    function finalizeDataSharing(
        uint256 experimentId,
        string calldata originalCid,
        string calldata processedCid,
        address sharer,
        bool valid,
        bool accepted
    ) external onlyTEE experimentExists(experimentId) {
        Experiment storage experiment = experiments[experimentId];
        DataShare storage dataShare = experimentDataShares[experimentId][originalCid];

        if (dataShare.valid) revert AlreadyValidated();
        if (dataShare.paid) revert AlreadyPaid();

        if (valid) {
            dataShare.valid = true;
            string memory finalCid = dataShare.isFullAccess ? originalCid : processedCid;

            experimentDataShares[experimentId][finalCid] = DataShare({
                isFullAccess: dataShare.isFullAccess,
                valid: true,
                paid: accepted,
                accepted: accepted,
                initialized: true
            });

            if (accepted) {
                SafeTransferLib.safeTransferFrom(
                    address(experiment.paymentToken), experiment.owner, sharer, experiment.reward
                );
            }

            emit DataShareFinalized(experimentId, originalCid, finalCid, sharer, dataShare.isFullAccess);
        }
    }

    function hasAccess(uint256 experimentId, address user, string calldata dataCid)
        external
        view
        experimentExists(experimentId)
        returns (bool)
    {
        if (user != experiments[experimentId].owner) return false;
        DataShare storage dataShare = experimentDataShares[experimentId][dataCid];
        return dataShare.valid && dataShare.accepted && dataShare.paid;
    }

    function getExperimentDetails(uint256 experimentId)
        external
        view
        experimentExists(experimentId)
        returns (
            address owner,
            string memory requestedDataSpec,
            uint256 reward,
            bool active,
            address paymentToken,
            uint64 endDate
        )
    {
        Experiment storage experiment = experiments[experimentId];
        return (
            experiment.owner,
            experiment.requestedDataSpec,
            experiment.reward,
            experiment.active,
            address(experiment.paymentToken),
            experiment.endDate
        );
    }
}
