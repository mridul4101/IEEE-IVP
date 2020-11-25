
import aboutimage from "./images/aboutimage.jpeg";
import votingimage from "./images/votingimage.jpeg";
import voteimage from "./images/voteimage.jpg";


const Homedata =[
    {
        imgsrc:aboutimage,
        title:"About the website ",
        button:"More About It!",
        content:"Decentralized survey platform that provides a secure way to conduct elections without any tampering of votes and assures an unbiased check on the results ! The architecture is designed by taking inspiration from Ethereum Network and Traditional Voting System. Get more details.",
        links:"/Help",
    },
    {
        imgsrc:votingimage,
        title:"Your Votes Are Protected ",
        button:"Your Surveys",
        content:"In the Traditional Voting System, the process of voting is less secured and the cost of hosting survey / election is also high. To overcome this a voting system is created using blockchain which is a decentralised, peer-to-peer transaction ledger. Click below to view all your surveys.",
        links:"/Mysurvey",
    },
    {
        imgsrc:voteimage,
        title:"Public Surveys",
        button:"All Survey!",
        content:"The various survey questions and responses are stored in the blockchain network, proper visualization of the survey result is available in form of graph. User can participate in any Public Survey. Every vote that is casted will be considered as an individual transaction. ",
        links:"/Allsurvey" ,
    },

];
export default Homedata;