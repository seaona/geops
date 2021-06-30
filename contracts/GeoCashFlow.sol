//SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import {RedirectAll, ISuperToken, IConstantFlowAgreementV1, ISuperfluid} from "./RedirectAll.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/* Hello and welcome to your first Super App!
* In order to deploy this contract, you'll need a few things
* Get the deployed SF addresses here: https://docs.superfluid.finance/superfluid/resources/networks
* or using the js-sdk as shown here https://docs.superfluid.finance/superfluid/protocol-tutorials/setup-local-environment
*/


contract GeoCashFlow is RedirectAll {

  IConstantFlowAgreementV1 public cfa;

  constructor (
    address owner,
    ISuperfluid host,
    IConstantFlowAgreementV1 cfa,
    ISuperToken acceptedToken
  )
    RedirectAll (
      host,
      cfa,
      acceptedToken,
      owner
     )
      {
        cfa = cfa;
  }

  function getFlowById(ISuperToken token, bytes32 agreementId) public returns ( 
            uint256 timestamp,
            int96 flowRate,
            uint256 deposit,
            uint256 owedDeposit) {
    return cfa.getFlowByID(token, agreementId);
  }

  function createFlow(
        ISuperToken token,
        address receiver,
        int96 flowRate,
        bytes calldata ctx
    )
        public
        returns(bytes memory newCtx)
    {

    }
}
