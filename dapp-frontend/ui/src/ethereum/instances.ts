import { ethers } from 'ethers';
import { SurveyManagerFactory } from './typechain/SurveyManagerFactory';
window.provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/b81341e3ab894360a84f3fa640ab985e');

window.surveyInstance = SurveyManagerFactory.connect('0x078bf531F1eF322CfedbdEFd74a67DC6E49a8A14', window.provider);