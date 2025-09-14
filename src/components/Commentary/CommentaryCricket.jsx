import React, { useState, useEffect } from "react";

const API_KEY = "your_api_key_here"; // Replace with a valid API key
const MATCH_API_URL = "https://api.cricapi.com/v1/match_details"; // Replace with actual API

const LiveCricketScore = ({ matchId }) => {
  const [matchData, setMatchData] = useState(null);
  const [fullCommentary, setFullCommentary] = useState(false);
  const [teamFilter, setTeamFilter] = useState("all"); // "all", "team1", "team2"

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetch(`${MATCH_API_URL}?apikey=${API_KEY}&id=${matchId}`);
        const data = await response.json();
        if (!response.ok || !data || !data.data) throw new Error("Failed to fetch match data");

        setMatchData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatchData();
  }, [matchId]);

  if (!matchData) return <p>Loading match data...</p>;

  const { score, batters, bowlers, commentary, keyStats, matchStatus } = matchData;

  return (
    <div className="max-w-4xl mx-auto p-4 border rounded-lg shadow-lg">
      {/* Score and Match Status */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{score}</h2>
        <p className="text-red-500 font-semibold">{matchStatus}</p>
      </div>

      {/* Batting Stats */}
      <table className="w-full border-collapse my-4">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Batter</th>
            <th className="p-2">R</th>
            <th className="p-2">B</th>
            <th className="p-2">4s</th>
            <th className="p-2">6s</th>
            <th className="p-2">SR</th>
          </tr>
        </thead>
        <tbody>
          {batters.map((player, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 text-blue-600">{player.name} {player.isStriker ? "*" : ""}</td>
              <td className="p-2">{player.runs}</td>
              <td className="p-2">{player.balls}</td>
              <td className="p-2">{player.fours}</td>
              <td className="p-2">{player.sixes}</td>
              <td className="p-2">{player.strikeRate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bowling Stats */}
      <table className="w-full border-collapse my-4">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Bowler</th>
            <th className="p-2">O</th>
            <th className="p-2">M</th>
            <th className="p-2">R</th>
            <th className="p-2">W</th>
            <th className="p-2">ECO</th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((player, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{player.name}</td>
              <td className="p-2">{player.overs}</td>
              <td className="p-2">{player.maidens}</td>
              <td className="p-2">{player.runsConceded}</td>
              <td className="p-2">{player.wickets}</td>
              <td className="p-2">{player.economy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Key Stats */}
      <div className="p-3 bg-gray-100 rounded-lg my-4">
        <p><strong>Partnership:</strong> {keyStats.partnership}</p>
        <p><strong>Toss:</strong> {keyStats.toss}</p>
      </div>

      {/* Recent Balls */}
      <div className="p-3 border rounded-md bg-gray-50 my-4">
        <strong>Recent: </strong>
        {commentary.recentBalls.map((ball, index) => (
          <span key={index} className="font-bold">{ball} </span>
        ))}
      </div>

      {/* Match Videos */}
      <div className="my-4">
        <h3 className="text-lg font-bold mb-2">Match Videos</h3>
        <div className="grid grid-cols-3 gap-2">
          {commentary.videos.map((video, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <img src={video.thumbnail} alt={video.title} className="w-full h-24 object-cover" />
              <p className="text-sm p-2">{video.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commentary Section */}
      <div className="my-4">
        <h3 className="text-lg font-bold">Commentary</h3>
        {matchStatus.includes("Finished") && (
          <div className="flex gap-2 my-2">
            <button
              className={`p-2 rounded ${teamFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setTeamFilter("all")}
            >
              All
            </button>
            <button
              className={`p-2 rounded ${teamFilter === "team1" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setTeamFilter("team1")}
            >
              {matchData.team1.name} Commentary
            </button>
            <button
              className={`p-2 rounded ${teamFilter === "team2" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setTeamFilter("team2")}
            >
              {matchData.team2.name} Commentary
            </button>
          </div>
        )}

        <div className="p-3 border rounded-md bg-gray-50">
          {commentary.list
            .filter(comment => teamFilter === "all" || comment.team === teamFilter)
            .map((comment, index) => (
              <p key={index} className="my-1">{comment.text}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LiveCricketScore;
