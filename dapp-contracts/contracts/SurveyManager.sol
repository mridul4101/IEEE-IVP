// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract SurveyManager
{
    // address owner;

    struct Survey 
    {
        string title;
        string surveyTitle;
        address author;
        uint256 time;
        bool isPublic;
    }

    mapping(bytes32 => mapping(address => uint8)) public access; // 0 - no access , 1 - access can vote,  2 - access already voted
    mapping(bytes32 => Survey) public surveys;

    event NewSurvey(address indexed user, bytes32 hash);
    event SentSurvey(bytes32 indexed hash, uint16[] answers);
    event Authorised(address indexed user, bytes32 hash);

    // constructor() {
    //     owner = msg.sender;
    // }


    function addSurvey(string memory _title, string memory _surveyTitle, uint256 _time, bool _ispublic) public payable returns (bytes32) 
    {

        bytes32 hashedinput = keccak256(abi.encodePacked(_title, msg.sender));
        require((surveys[hashedinput].time == 0), "you have already build a Survey with this name");
        surveys[hashedinput].title = _title;
        surveys[hashedinput].surveyTitle = _surveyTitle;
        surveys[hashedinput].time = _time;
        surveys[hashedinput].author = msg.sender;
        surveys[hashedinput].isPublic = _ispublic;
        emit NewSurvey(msg.sender, hashedinput);

        return hashedinput;
    }

    function addUsers(bytes32 _survey, address[] memory users) public payable 
    {
        for (uint256 i = 0; i < users.length; i++) {
            access[_survey][users[i]] = 1;
            emit Authorised(msg.sender, _survey);
        }
    }

    function sendSurvey(bytes32 _survey, uint16[] memory _feedback) public payable 
    {
        require(surveys[_survey].time >= block.timestamp, "Survey has Ended");

        require(access[_survey][msg.sender] != 2, "You have already voted  for this survey");

        if (surveys[_survey].isPublic == false) 
        {
            require(access[_survey][msg.sender] == 1, "You have no access for this survey");
        }
        
        emit SentSurvey(_survey, _feedback);
        access[_survey][msg.sender] = 2;
    }
}