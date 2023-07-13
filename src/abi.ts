export const ABI = [
  {
      'inputs': [],
      'name': "constructor",
      'stateMutability': "nonpayable",
      'type': "constructor"
  },
  {
      'anonymous': false,
      'inputs': [
          {
              'indexed': true,
              'internalType': "address",
              'name': "previousOwner",
              'type': "address"
          },
          {
              'indexed': true,
              'internalType': "address",
              'name': "newOwner",
              'type': "address"
          }
      ],
      'name': "OwnershipTransferred",
      'type': "event"
  },
  {
      'inputs': [
          {
              'internalType': "bytes32",
              'name': "_hash",
              'type': "bytes32"
          },
          {
              'internalType': "bytes",
              'name': "_signature",
              'type': "bytes"
          }
      ],
      'name': "isValidSignature",
      'outputs': [
          {
              'internalType': "bytes4",
              'name': "",
              'type': "bytes4"
          }
      ],
      'stateMutability': "view",
      'type': "function"
  },
  {
      'inputs': [],
      'name': "owner",
      'outputs': [
          {
              'internalType': "address",
              'name': "",
              'type': "address"
          }
      ],
      'stateMutability': "view",
      'type': "function"
  },
  {
      'inputs': [],
      'name': "renounceOwnership",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
  },
  {
      'inputs': [
          {
              'internalType': "address",
              'name': "newOwner",
              'type': "address"
          }
      ],
      'name': "transferOwnership",
      'outputs': [],
      'stateMutability': "nonpayable",
      'type': "function"
  }
] as const