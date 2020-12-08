import { ethers } from 'ethers';
import { SurveyManagerFactory } from './typechain/SurveyManagerFactory';
window.provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/91d5a5957f0e4b2193ff2eca17a43453');
// window.surveyInstance = SurveyManagerFactory.connect('0xe5389ba2b3de68A2CE987B0437896Cb1D585A23C', window.provider);
// window.surveyInstance = SurveyManagerFactory.connect('0xd548Fe5e2d7fAae38ed891DeB4350501aD851e57', window.provider);

window.surveyInstance = SurveyManagerFactory.connect('0x6e6A2fE520ac93bDfAf8C7dce36fe7fa92008BA6', window.provider);