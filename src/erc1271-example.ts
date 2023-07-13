
import { Contract, ethers, hashMessage, recoverAddress } from "ethers";
import { ABI } from "./abi";
import 'dotenv/config'

const PRIVATE_KEY = process.env.PRIVATE_KEY
const MAGIC_VALUE_BYTES32 = '0x1626ba7e' // https://eips.ethereum.org/EIPS/eip-1271

const isValidSignature = async (message: string, signature: string, contractAddress: string, provider: ethers.Provider) => {
  const msgHash = hashMessage(message)
  const contract = new Contract(contractAddress, ABI, provider);
  const returnValue = await contract.isValidSignature(
    msgHash,
    signature
  )
  return returnValue.slice(0, 10).toLowerCase() === MAGIC_VALUE_BYTES32
}


const main = async () => {
  const provider = new ethers.JsonRpcProvider('http://localhost:8545')
  const wallet =  new ethers.Wallet(PRIVATE_KEY!)
  const contractAddress = '0x9FAe3Aa40d557c2Edab8e1E5C676F24883c6cF03'

  const badWallet =  ethers.Wallet.createRandom() 

  let message = "Hello World";

  // Sign the string message
  const goodSignature = await wallet.signMessage(message);
  const badSignature = await badWallet.signMessage(message);

  // Step 1. Have confidence in who is signing the messages
  const msgHash = hashMessage(message)
  const goodAddress = recoverAddress(msgHash, goodSignature)
  const badAddress = recoverAddress(msgHash, goodSignature)
  console.log('goodAddress', goodAddress)
  console.log('badAddress', badAddress)

  // Step 2. Validate the signature
  const isValidGood = await isValidSignature(message, goodSignature, contractAddress, provider)
  const isValidBad = await isValidSignature(message, badSignature, contractAddress, provider)
  console.log('isValidGood', isValidGood)
  console.log('isValidBad', isValidBad)
}

main()