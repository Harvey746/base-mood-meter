// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseMoodMeter {
    mapping(address => uint8) public latestMood;
    mapping(address => uint256) public moodUpdates;
    mapping(uint8 => uint256) public moodCounts;
    uint256 public totalUpdates;

    event MoodSet(address indexed user, uint8 mood, uint256 userUpdates, uint256 totalUpdates);

    function setMood(uint8 mood) external {
        require(mood < 4, "Invalid mood");

        latestMood[msg.sender] = mood;

        unchecked {
            moodUpdates[msg.sender] += 1;
            moodCounts[mood] += 1;
            totalUpdates += 1;
        }

        emit MoodSet(msg.sender, mood, moodUpdates[msg.sender], totalUpdates);
    }
}
