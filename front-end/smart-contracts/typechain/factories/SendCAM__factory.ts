/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SendCAM, SendCAMInterface } from "../SendCAM";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "getAllTransactions",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct SendCAM.TransferStruct[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTransactionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c7b806100206000396000f3fe6080604052600436106100345760003560e01c8063098866491461003957806327506f53146100555780632e7700f014610080575b600080fd5b610053600480360381019061004e9190610706565b6100ab565b005b34801561006157600080fd5b5061006a6102f1565b604051610077919061095c565b60405180910390f35b34801561008c57600080fd5b506100956104a2565b6040516100a2919061098d565b60405180910390f35b60008273ffffffffffffffffffffffffffffffffffffffff16346040516100d1906109d9565b60006040518083038185875af1925050503d806000811461010e576040519150601f19603f3d011682016040523d82523d6000602084013e610113565b606091505b5050905080610157576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161014e90610a4b565b60405180910390fd5b60008081548092919061016990610a9a565b919050555060016040518060a001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff16815260200134815260200184815260200142815250908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816002015560608201518160030190805190602001906102a09291906104ab565b506080820151816004015550507fc4b32d7ff75a51e487f3cbb5d3202f2efecca1f4c2b987e0039c1d3220b48a8333843485426040516102e4959493929190610b8a565b60405180910390a1505050565b60606001805480602002602001604051908101604052809291908181526020016000905b8282101561049957838290600052602060002090600502016040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820180546103fe90610c13565b80601f016020809104026020016040519081016040528092919081815260200182805461042a90610c13565b80156104775780601f1061044c57610100808354040283529160200191610477565b820191906000526020600020905b81548152906001019060200180831161045a57829003601f168201915b5050505050815260200160048201548152505081526020019060010190610315565b50505050905090565b60008054905090565b8280546104b790610c13565b90600052602060002090601f0160209004810192826104d95760008555610520565b82601f106104f257805160ff1916838001178555610520565b82800160010185558215610520579182015b8281111561051f578251825591602001919060010190610504565b5b50905061052d9190610531565b5090565b5b8082111561054a576000816000905550600101610532565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061058d82610562565b9050919050565b61059d81610582565b81146105a857600080fd5b50565b6000813590506105ba81610594565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610613826105ca565b810181811067ffffffffffffffff82111715610632576106316105db565b5b80604052505050565b600061064561054e565b9050610651828261060a565b919050565b600067ffffffffffffffff821115610671576106706105db565b5b61067a826105ca565b9050602081019050919050565b82818337600083830152505050565b60006106a96106a484610656565b61063b565b9050828152602081018484840111156106c5576106c46105c5565b5b6106d0848285610687565b509392505050565b600082601f8301126106ed576106ec6105c0565b5b81356106fd848260208601610696565b91505092915050565b6000806040838503121561071d5761071c610558565b5b600061072b858286016105ab565b925050602083013567ffffffffffffffff81111561074c5761074b61055d565b5b610758858286016106d8565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600061079982610562565b9050919050565b6107a98161078e565b82525050565b6000819050919050565b6107c2816107af565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156108025780820151818401526020810190506107e7565b83811115610811576000848401525b50505050565b6000610822826107c8565b61082c81856107d3565b935061083c8185602086016107e4565b610845816105ca565b840191505092915050565b600060a08301600083015161086860008601826107a0565b50602083015161087b60208601826107a0565b50604083015161088e60408601826107b9565b50606083015184820360608601526108a68282610817565b91505060808301516108bb60808601826107b9565b508091505092915050565b60006108d28383610850565b905092915050565b6000602082019050919050565b60006108f282610762565b6108fc818561076d565b93508360208202850161090e8561077e565b8060005b8581101561094a578484038952815161092b85826108c6565b9450610936836108da565b925060208a01995050600181019050610912565b50829750879550505050505092915050565b6000602082019050818103600083015261097681846108e7565b905092915050565b610987816107af565b82525050565b60006020820190506109a2600083018461097e565b92915050565b600081905092915050565b50565b60006109c36000836109a8565b91506109ce826109b3565b600082019050919050565b60006109e4826109b6565b9150819050919050565b600082825260208201905092915050565b7f4661696c656420746f2073656e642043414d0000000000000000000000000000600082015250565b6000610a356012836109ee565b9150610a40826109ff565b602082019050919050565b60006020820190508181036000830152610a6481610a28565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610aa5826107af565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610ad857610ad7610a6b565b5b600182019050919050565b610aec8161078e565b82525050565b6000819050919050565b6000610b17610b12610b0d84610562565b610af2565b610562565b9050919050565b6000610b2982610afc565b9050919050565b6000610b3b82610b1e565b9050919050565b610b4b81610b30565b82525050565b6000610b5c826107c8565b610b6681856109ee565b9350610b768185602086016107e4565b610b7f816105ca565b840191505092915050565b600060a082019050610b9f6000830188610ae3565b610bac6020830187610b42565b610bb9604083018661097e565b8181036060830152610bcb8185610b51565b9050610bda608083018461097e565b9695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610c2b57607f821691505b60208210811415610c3f57610c3e610be4565b5b5091905056fea2646970667358221220ebcb9ef9f4aabba45ed0082929f5cf15c2f9db7e0bcf3e54333e1102d253317b64736f6c63430008090033";

export class SendCAM__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SendCAM> {
    return super.deploy(overrides || {}) as Promise<SendCAM>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SendCAM {
    return super.attach(address) as SendCAM;
  }
  connect(signer: Signer): SendCAM__factory {
    return super.connect(signer) as SendCAM__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SendCAMInterface {
    return new utils.Interface(_abi) as SendCAMInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SendCAM {
    return new Contract(address, _abi, signerOrProvider) as SendCAM;
  }
}
