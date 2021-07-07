//SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import {RedirectAll, ISuperToken, IConstantFlowAgreementV1, ISuperfluid} from "./RedirectAll.sol";
import {SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/* Hello and welcome to your first Super App!
* In order to deploy this contract, you'll need a few things
* Get the deployed SF addresses here: https://docs.superfluid.finance/superfluid/resources/networks
* or using the js-sdk as shown here https://docs.superfluid.finance/superfluid/protocol-tutorials/setup-local-environment
*/


contract GeoCashFlow is RedirectAll, ERC20{

  IConstantFlowAgreementV1 public cfa;
  ISuperfluid public host;
  ISuperToken public acceptedToken;

  struct Stream{
  		int96 flowRate;
      ufixed latitude;
      ufixed longitude;
  }
  
  mapping(address => Stream) public streamers;

  constructor (
    address owner,
    ISuperfluid _host,
    IConstantFlowAgreementV1 _cfa,
    ISuperToken _acceptedToken
  )
    RedirectAll (
      _host,
      _cfa,
      _acceptedToken,
      owner
     )
      {
        cfa = _cfa;
        host = _host;
        acceptedToken = _acceptedToken;

        uint256 configWord =
            SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

        host.registerApp(configWord);
  }

function _updateOutflow(bytes calldata ctx)
        public
        returns (bytes memory newCtx)
    {
      newCtx = ctx;
      // @dev This will give me the new flowRate, as it is called in after callbacks
      int96 netFlowRate = _cfa.getNetFlow(_acceptedToken, address(this));
      (,int96 outFlowRate,,) = _cfa.getFlow(_acceptedToken, address(this), _receiver);
      int96 inFlowRate = netFlowRate + outFlowRate;
      if (inFlowRate < 0 ) inFlowRate = -inFlowRate; // Fixes issue when inFlowRate is negative

      // @dev If inFlowRate === 0, then delete existing flow.
      if (outFlowRate != int96(0)){
        (newCtx, ) = _host.callAgreementWithContext(
            _cfa,
            abi.encodeWithSelector(
                _cfa.updateFlow.selector,
                _acceptedToken,
                _receiver,
                inFlowRate,
                new bytes(0) // placeholder
            ),
            "0x",
            newCtx
        );
      } else if (inFlowRate == int96(0)) {
        // @dev if inFlowRate is zero, delete outflow.
          (newCtx, ) = _host.callAgreementWithContext(
              _cfa,
              abi.encodeWithSelector(
                  _cfa.deleteFlow.selector,
                  _acceptedToken,
                  address(this),
                  _receiver,
                  new bytes(0) // placeholder
              ),
              "0x",
              newCtx
          );
      } else {
      // @dev If there is no existing outflow, then create new flow to equal inflow
          (newCtx, ) = _host.callAgreementWithContext(
              _cfa,
              abi.encodeWithSelector(
                  _cfa.createFlow.selector,
                  _acceptedToken,
                  _receiver,
                  inFlowRate,
                  new bytes(0) // placeholder
              ),
              "0x",
              newCtx
          );
      }
    }

    function _setNewReceiver(address bidder, int96 flowRate) private {
        bidders[bidder] = Bid(flowRate, winner, address(this));
        bidders[winner].prev = bidder;
        winner = bidder;
        minStep = flowRate * (markup - precision);
    }


  //agreementData
      //(address sender, address receiver) = abi.decode(_agreementData, (address, address));
    

  }

// 1. USER DEPOSITS ETH TO CONTRACT XETH SUPERTOKEN
// https://goerli.etherscan.io/address/0x5943f705abb6834cad767e6e4bb258bc48d9c947
  
// 2. CONTRACT MINTS FROM 0X 3ETHX TO USER ADDRESS

//


