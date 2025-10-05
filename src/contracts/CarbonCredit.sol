// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CarbonCredit
 * @dev An ERC20 token representing verified blue carbon credits.
 * This contract allows for the minting of new credits by authorized verifiers,
 * transferring credits between accounts, and retiring credits to offset emissions.
 */
contract CarbonCredit is ERC20, Ownable {
    // Mapping from role identifier to the address holding that role.
    mapping(bytes32 => address) private _roles;

    // Role identifier for the verifier role.
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    /**
     * @dev Modifier to check if an account has a specific role.
     * @param role The role identifier to check for.
     */
    modifier onlyRole(bytes32 role) {
        require(_roles[role] == msg.sender, "Caller does not have the required role");
        _;
    }

    /**
     * @dev Constructor that sets the token name and symbol.
     * The deployer of the contract is automatically granted the Owner and Verifier roles.
     */
    constructor(address initialOwner) ERC20("EltaBlue Carbon Credit", "EBCC") Ownable(initialOwner) {
        _roles[VERIFIER_ROLE] = initialOwner; // The deployer is the first verifier
    }

    /**
     * @dev Sets the address for a given role. Only callable by the contract owner.
     * @param role The role identifier (e.g., VERIFIER_ROLE).
     * @param account The address to assign the role to.
     */
    function setRole(bytes32 role, address account) public onlyOwner {
        require(account != address(0), "Cannot assign role to the zero address");
        _roles[role] = account;
    }

    /**
     * @dev Mints new carbon credit tokens.
     * This function can only be called by an address with the VERIFIER_ROLE.
     * It creates a specified `amount` of tokens and assigns them to the `to` address.
     * @param to The address that will receive the minted tokens.
     * @param amount The number of tokens to mint (in wei, i.e., 1 token = 1 * 10^18).
     */
    function mintCredits(address to, uint256 amount) public onlyRole(VERIFIER_ROLE) {
        // We multiply by 10**18 to account for the 18 decimal places of a standard ERC20 token.
        _mint(to, amount * (10**uint256(decimals())));
    }

    /**
     * @dev Retires (burns) a specified amount of carbon credits from the caller's balance.
     * This is a public function that allows any token holder to retire their credits,
     * effectively taking them out of circulation to claim the environmental benefit.
     * @param amount The number of tokens to retire (in wei).
     */
    function retireCredits(uint256 amount) public {
        _burn(msg.sender, amount * (10**uint256(decimals())));
    }

    /**
     * @dev Returns the address of the account that holds a specific role.
     * @param role The role identifier to query.
     * @return The address assigned to the role.
     */
    function getRoleAddress(bytes32 role) public view returns (address) {
        return _roles[role];
    }
}
