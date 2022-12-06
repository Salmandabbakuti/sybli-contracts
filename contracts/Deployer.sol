//SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Deployer {
    // deploy contract with create2 with same salt
    event Deployed(address addr, uint64 salt);

    function deployGreeter(
        bytes memory _code,
        uint64 _salt
    ) public returns (address) {
        address addr;
        assembly {
            addr := create2(0, add(_code, 0x20), mload(_code), _salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
        emit Deployed(addr, _salt);
        return addr;
    }
}
