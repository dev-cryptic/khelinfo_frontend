import React, { useState } from "react";
import PointsTableCricket from "../PointsTable/PointsTableCricket";
import LiveCricketScore from "../Commentary/CommentaryCricket"
import CricketScoreboard from "../Scoreboard/CricketScoreboard";
import SquadsCricket from "../Squads/SquadsCricket";

const CricketHeader = () => {
  const [activeTab, setActiveTab] = useState("scorecard");

  return (
    <div className="bg-white shadow-md text-lg  ">
      {/* Header Navigation */}
      <div className="flex justify-start border-b ">
        {["Commentary", "Scorecard", "Squads", "Points Table"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
            className={`py-3 px-6 text-sm font-semibold ${
              activeTab === tab.toLowerCase().replace(" ", "")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Content Section */}
      <div className="p-4">
        {activeTab === "commentary" && <LiveCricketScore />}
        {activeTab === "scorecard" && <CricketScoreboard />}
        {activeTab === "squads" && <SquadsCricket />}
        {activeTab === "pointstable" && <PointsTableCricket />}
      </div>
    </div>
  );
};

// Sample Components (Replace with actual API data)
const Commentary = () => <div className="text-gray-700">📢 Live match commentary updates...</div>;
const Scorecard = () => <div className="text-gray-700">🏏 Full match scorecard...</div>;
const Squads = () => <div className="text-gray-700">📋 Team squads and player details...</div>;
const PointsTable = () => <div className="text-gray-700">📊 Live points table standings...</div>;

export default CricketHeader;









