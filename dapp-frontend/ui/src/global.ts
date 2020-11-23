import { ethers } from 'ethers';
import { SurveyManager } from "../src/ethereum/typechain/SurveyManager";
// mark the typings of your global variables
declare global {
  interface Window{
    provider: ethers.providers.JsonRpcProvider;
    wallet: any;
    ethereum: ethers.providers.ExternalProvider;
    surveyInstance: SurveyManager;
    // wallet: CustomWallet | ethers.providers.JsonRpcSigner | undefined; // marking this as undefined helps to prevent many runtime bugs when wallet is not loaded
  }
}
