// SPDX-License-Identifier: AGPL-3.0

pragma solidity 0.8.20;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Brownie Template
/// @author RoboVault
/// @notice This is a template contract
contract ERC1271Example is Ownable {
    constructor() Ownable() {}

    /**
     * @notice Verifies that the signer is the owner of the signing contract.
     */
    function isValidSignature(bytes32 _hash, bytes calldata _signature)
        external
        view
        returns (bytes4)
    {
        // Validate signatures
        if (recoverSigner(_hash, _signature) == owner()) {
            return 0x1626ba7e;
        } else {
            return 0xffffffff;
        }
    }

    /**
     * @notice Recover the signer of hash, assuming it's an EOA account
     * @dev Only for EthSign signatures
     * @param _hash       Hash of message that was signed
     * @param _signature  Signature encoded as (bytes32 r, bytes32 s, uint8 v)
     */
    function recoverSigner(bytes32 _hash, bytes memory _signature)
        internal
        view
        returns (address signer)
    {
        bytes32 r;
        bytes32 s;
        uint8 v;

        if (_signature.length != 65) {
            return address(0);
        }

        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }

        if (v < 27) {
            v += 27;
        }

        if (v != 27 && v != 28) {
            return address(0);
        }

        return ecrecover(_hash, v, r, s);
    }
}
