import React, { useEffect, useState } from "react";

const API_KEY = "your_api_key_here"; // Replace with a valid API key
const POINTS_API_URL = "https://api.cricapi.com/v1/points_table"; // Replace with actual API

const PointsTableCricket = () => {
  const [pointsTable, setPointsTable] = useState({ teams: [], loading: true, error: null });

  useEffect(() => {
    const fetchPointsTable = async () => {
      try {
        const response = await fetch(`${POINTS_API_URL}?apikey=${API_KEY}`);
        const data = await response.json();
        if (!response.ok || !data || !data.data) throw new Error("Failed to fetch points table");
        setPointsTable({ teams: data.data.teams || [], loading: false, error: null });
      } catch (error) {
        setPointsTable({ teams: [], loading: false, error: error.message });
      }
    };
    
    fetchPointsTable();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold">Points Table</h2>
      {pointsTable.loading ? (
        <p>Loading...</p>
      ) : pointsTable.error ? (
        <p className="text-red-500">Error: {pointsTable.error}</p>
      ) : (
        <table className="w-full border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Team</th>
              <th className="p-2">Matches</th>
              <th className="p-2">Won</th>
              <th className="p-2">Lost</th>
              <th className="p-2">Tied</th>
              <th className="p-2">Points</th>
              <th className="p-2">NRR</th>
            </tr>
          </thead>
          <tbody>
            {pointsTable.teams.map((team, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="p-2 font-semibold">{team.name}</td>
                <td className="p-2">{team.matches}</td>
                <td className="p-2">{team.won}</td>
                <td className="p-2">{team.lost}</td>
                <td className="p-2">{team.tied}</td>
                <td className="p-2">{team.points}</td>
                <td className="p-2">{team.nrr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PointsTableCricket;
