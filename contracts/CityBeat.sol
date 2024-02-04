// SPDX-License-Identifier: MIT OR UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

import "hardhat/console.sol";

contract CityBeat is Ownable, AccessControl {
  using Counters for Counters.Counter;
  Counters.Counter private _totalEvents;
  Counters.Counter private _totalUsers;

  uint256 public citybeat;

  mapping(uint256 => UserStruct) users;
  mapping(string => uint256) public userEmailToId;
  mapping(string => uint256) public userUserNameToId;
  mapping(uint256 => bool) public userExist;
  mapping(string => bool) public userUserNameExist;
  mapping(string => bool) public userEmailExist;
  
  mapping(uint256 => EventStruct) events;
  mapping(uint256 => bool) public eventExist;
  mapping(uint256 => UserStruct[]) interestedOf;
  mapping(uint256 => UserStruct[]) supportersOf;


  struct UserStruct {
    uint256 id;
    address owner;
    string firstName;
    string lastNme;
    string userName;
    string email;
    string password;
    string phone;
  }

  struct EventStruct {
    uint256 id;
    address owner;
    string name;
    string description;
    string image;
    string location;

    uint256 amount;
    uint256 donations;
    uint256 raised;
    uint256 timestamp;

    bool deleted;
    bool isLive;
  }

  constructor() {
  }

  function createUser(
    string memory firstName,
    string memory lastName,
    string memory userName,
    string memory email,
    string memory password,
    string memory phone
  ) public returns (bool, string memory) {
    require(bytes(firstName).length > 0, 'First Name cannot be empty');
    require(bytes(lastName).length > 0, 'Last Name cannot be empty');
    require(bytes(userName).length > 0, 'User Name cannot be empty');
    require(bytes(email).length > 0, 'Email cannot be empty');
    require(bytes(password).length > 0, 'Password cannot be empty');
    require(bytes(phone).length > 0, 'Phone cannot be empty');

    if(userEmailExist[email] == true || userUserNameExist[userName] == true) {
      return (false, "Email already exists");
    }

    _totalUsers.increment();
    UserStruct memory user;
    user.id = _totalUsers.current();
    user.owner = msg.sender;
    user.firstName = firstName;
    user.lastNme = lastName;
    user.userName = userName;
    user.email = email;
    user.password = password;
    user.phone = phone;

    users[user.id] = user;
    userEmailToId[user.email] = user.id;
    userUserNameToId[user.userName] = user.id;
    userExist[user.id] = true;
    userEmailExist[user.email] = true;
    userUserNameExist[user.userName] = true;

    return (true, "Accout created successfully");
  }

  function updateUser(
    uint256 id,
    string memory firstName,
    string memory lastName,
    string memory userName,
    string memory email,
    string memory password,
    string memory phone
  ) public {
    require(userExist[id], 'User Not Found');
    require(msg.sender == users[id].owner, 'Unauthorized Entity');
    require(bytes(firstName).length > 0, 'First Name cannot be empty');
    require(bytes(lastName).length > 0, 'Last Name cannot be empty');
    require(bytes(userName).length > 0, 'User Name cannot be empty');
    require(bytes(email).length > 0, 'Email cannot be empty');
    require(bytes(password).length > 0, 'Password cannot be empty');
    require(bytes(phone).length > 0, 'Phone cannot be empty');

    users[id].firstName = firstName;
    users[id].lastNme = lastName;
    users[id].userName = userName;
    users[id].email = email;
    users[id].password = password;
    users[id].phone = phone;
  }

  function getUserByUserName(string memory userName) public view returns (UserStruct memory) {
    require(bytes(userName).length > 0, 'User Name cannot be empty');
    require(userUserNameExist[userName], 'User Not Found');

    return users[ userUserNameToId[userName] ];
  }

  function getUserByEmail(string memory email) public view returns (UserStruct memory) {
    require(bytes(email).length > 0, 'Email cannot be empty');
    require(userEmailExist[email], 'User Not Found');

    return users[ userEmailToId[email] ];
  }

  function getUser(uint256 id) public view returns (UserStruct memory) {
    return users[id];
  }

  function createEvent(
    string memory name,
    string memory description,
    string memory image,
    string memory location,
    uint256 amount
  ) public {
    require(bytes(name).length > 0, 'Name cannot be empty');
    require(bytes(description).length > 0, 'Description cannot be empty');
    require(bytes(image).length > 0, 'Image cannot be empty');
    require(bytes(location).length > 0, 'Location cannot be empty');
    require(amount > 0 ether, 'Amount cannot be zero');

    _totalEvents.increment();
    EventStruct memory myEvent;
    myEvent.id = _totalEvents.current();
    myEvent.owner = msg.sender;
    myEvent.name = name;
    myEvent.description = description;
    myEvent.image = image;
    myEvent.location = location;
    myEvent.amount = amount;
    myEvent.deleted = false;
    myEvent.isLive = true;

    events[myEvent.id] = myEvent;
    eventExist[myEvent.id] = true;
  }

  function updateEvent(
    uint256 id,
    string memory name,
    string memory description,
    string memory image,
    string memory location,
    uint256 amount
  ) public {
    require(eventExist[id], 'Event Not Found');
    require(msg.sender == events[id].owner, 'Unauthorized Entity');
    require(bytes(name).length > 0, 'Name cannot be empty');
    require(bytes(description).length > 0, 'Description cannot be empty');
    require(bytes(image).length > 0, 'Image cannot be empty');
    require(bytes(location).length > 0, 'Location cannot be empty');
    require(amount > 0 ether, 'Amount cannot be zero');

    events[id].name = name;
    events[id].description = description;
    events[id].image = image;
    events[id].location = location;
    events[id].amount = amount;
  }

  function getEvent(uint256 id) public view returns (EventStruct memory) {
    return events[id];
  }

  function deleteEvent(uint256 id) public {
    require(eventExist[id], 'Event Not Found');
    require(msg.sender == events[id].owner, 'Unauthorized Entity');

    events[id].deleted = true;
  }

  function toggleStatus(uint256 id) public onlyOwner {
    require(eventExist[id], 'Event Not Found');
    events[id].isLive = !events[id].isLive;
  }

  function getEvents() public view returns (EventStruct[] memory Events) {
    uint256 available;
    for (uint i = 1; i <= _totalEvents.current(); i++) {
      if (!events[i].deleted && !events[i].isLive) {
        available++;
      }
    }

    Events = new EventStruct[](available);

    uint256 index;
    for (uint i = 1; i <= _totalEvents.current(); i++) {
      if (!events[i].deleted && !events[i].isLive) {
        Events[index++] = events[i];
      }
    }
  }

  function getMyEvents() public view returns (EventStruct[] memory Events) {
    uint256 available;
    for (uint i = 1; i <= _totalEvents.current(); i++) {
      if (!events[i].deleted && events[i].owner == msg.sender) {
        available++;
      }
    }

    Events = new EventStruct[](available);

    uint256 index;
    for (uint i = 1; i <= _totalEvents.current(); i++) {
      if (
        !events[i].deleted &&
        events[i].owner == msg.sender
      ) {
        Events[index++] = events[i];
      }
    }
  }
}