
import aboutimage from "./images/aboutimage.jpeg";
import votingimage from "./images/votingimage.jpeg";
import voteimage from "./images/voteimage.jpg";


const Homedata =[
    {
        imgsrc:aboutimage,
        title:"About the website!! ",
        button:"More About It!",
        content:"This is a decentralized survey platform that assures an unbiased check on the results !! The architecture is designed by taking inspiration from the Ethereum network and the traditional voting system process. To get more details!!",
        links:"/Help",
    },
    {
        imgsrc:votingimage,
        title:"Your Votes Are Protected ",
        button:"Your Surveys",
        content:"In the traditional voting system, the process of voting is less secured and the cost of hosting survey/election is also high. To overcome this a blockchain based voting system is proposed. Click below to view all your surveys!!",
        links:"/Mysurvey",
    },
    {
        imgsrc:voteimage,
        title:"Public Surveys",
        button:"All Survey!",
        content:"The surveys questions and responses are stored in a blockchain network , proper visualization of the result of a survey can be seen in form of graphs . User can praticipate in any public survey .",
        links:"/Allsurvey" ,
    },

];
export default Homedata;