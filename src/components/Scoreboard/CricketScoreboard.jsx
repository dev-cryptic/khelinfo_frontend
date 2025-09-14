import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "b21LOCWWCu71KoAJneJcCYvskGOkMKc24L4IYGI4FfKpk1oqEVGAZIYSM9Xw"; // Replace with actual API key
const API_URL = "https://cricket.sportmonks.com/api/v2.0/livescores";

const CricketScoreboard = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState({ innings: [], loading: true, error: null });

  useEffect(() => {
    const fetchData = async () => {
      if (!matchId) return;

      try {
        const response = await fetch(`${API_URL}?api_token=${API_KEY}&include=batting`);
        const data = await response.json();
        console.log("Fetched Data:", data);

        if (!response.ok || !data.data) throw new Error("Failed to fetch data");

        setMatchData({ innings: data.data, loading: false, error: null });
      } catch (error) {
        setMatchData({ innings: [], loading: false, error: error.message });
      }
    };

    fetchData();
  }, [matchId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {matchData.loading ? (
        <p>Loading...</p>
      ) : matchData.error ? (
        <p className="text-red-500">Error: {matchData.error}</p>
      ) : (
        matchData.innings.map((inning, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-bold bg-gray-200 p-2">
              {inning.team?.name} Innings - {inning.score}/{inning.wickets} ({inning.overs} Ov)
            </h2>
            
            {/* Batting Table */}
            <table className="w-full border border-gray-300 mt-2">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Batter</th>
                  <th className="p-2">R</th>
                  <th className="p-2">B</th>
                  <th className="p-2">4s</th>
                  <th className="p-2">6s</th>
                  <th className="p-2">SR</th>
                </tr>
              </thead>
              <tbody>
                {inning.batting?.map((batter, idx) => (
                  <tr key={idx} className="border-t border-gray-300">
                    <td className="p-2 font-semibold">{batter.batsman.fullname}</td>
                    <td className="p-2">{batter.runs}</td>
                    <td className="p-2">{batter.balls}</td>
                    <td className="p-2">{batter.fours}</td>
                    <td className="p-2">{batter.sixes}</td>
                    <td className="p-2">{batter.strike_rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Bowling Table */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Bowling Performance</h3>
              <table className="w-full border border-gray-300 mt-2">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2">Bowler</th>
                    <th className="p-2">O</th>
                    <th className="p-2">M</th>
                    <th className="p-2">R</th>
                    <th className="p-2">W</th>
                    <th className="p-2">ECO</th>
                  </tr>
                </thead>
                <tbody>
                  {inning.bowling?.map((bowler, idx) => (
                    <tr key={idx} className="border-t border-gray-300">
                      <td className="p-2 font-semibold">{bowler.bowler.fullname}</td>
                      <td className="p-2">{bowler.overs}</td>
                      <td className="p-2">{bowler.maidens}</td>
                      <td className="p-2">{bowler.runs_conceded}</td>
                      <td className="p-2">{bowler.wickets}</td>
                      <td className="p-2">{bowler.economy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CricketScoreboard;
