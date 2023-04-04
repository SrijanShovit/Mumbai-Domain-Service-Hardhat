// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import {StringUtils} from './libraries/StringUtils.sol';
import "hardhat/console.sol";

contract Domains {
    //domain TLD
    string public tld;

    mapping (string => address) public domains;
    //to store values
    mapping (string => string) public records;

    constructor(string memory _tld) payable {
        tld = _tld;
        console.log("%s name service deployed",_tld);
    }

    //domain price based on length
    function price(string calldata name) public pure returns(uint){
        uint len = StringUtils.strlen(name);
        require(len > 0);
        if (len == 3){
            //0.5 MATIC
            return  5*(10**16);
        }else if (len == 5){
            returb 3* 10**16;
        }else{
        return 1* 10**16;
        }
    }

    function register(string calldata name) public payable{
        //check that name is unregistered
        require(domains[name] == address(0));

        uint _price = price(name);

        require(msg.value >= _price,"Please pay enough matic");

        domains[name] = msg.sender;
        console.log("%s has registered a domain!",msg.sender);
    }

    function getAddress(string calldata name) public view returns(address){
        return domains[name];
    }

    function setRecord(string calldata name,string calldata record) public   {
        require(domains[name] == msg.sender);
        records[name] = record;
    }

    function getRecord(string calldata name) public view returns(string memory) {
        return records[name];
    }
}