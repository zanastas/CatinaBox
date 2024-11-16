// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "solady/src/tokens/ERC20.sol";
import {Ownable} from "solady/src/auth/Ownable.sol";
/*
    /\___/\     |\---/|
   (  o o  )    | o_o |
   (  =^=  )     \_^_/
    (---)      /  ~  \
  __|___|__   (|     |)  
 |_________|   |_____|
    |_|_|      |__|__|
    
     Cats in Boxes!
     Schrödinger would be proud...
     Are they alive? Are they dead?
     Only when you look inside!
*/

contract CatinaBoxToken is ERC20, Ownable {
    /// @notice Constructor sets the token details and initial owner
    constructor() {
        _initializeOwner(msg.sender);
    }

    /// @notice Returns the token name
    function name() public pure override returns (string memory) {
        return "Cat In A Box";
    }

    /// @notice Returns the token symbol
    function symbol() public pure override returns (string memory) {
        return "CBOX";
    }

    /// @notice Allows owner to mint new tokens
    /// @param to Address to receive the minted tokens
    /// @param amount Amount of tokens to mint
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /// @notice Returns the number of decimals used for token amounts
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
