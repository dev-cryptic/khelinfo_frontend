import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "your_api_key_here"; // Replace with a valid API key
const SQUADS_API_URL = "https://api.cricapi.com/v1/match_squads"; // Replace with actual API

const SquadsCricket = () => {
  const { matchId } = useParams();
  const [squadData, setSquadData] = useState({ teams: {}, loading: true, error: null });

  useEffect(() => {
    const fetchSquads = async () => {
      try {
        const response = await fetch(`${SQUADS_API_URL}?apikey=${API_KEY}&id=${matchId}`);
        const data = await response.json();
        if (!response.ok || !data || !data.data) throw new Error("Failed to fetch squad data");
        
        setSquadData({ teams: data.data, loading: false, error: null });
      } catch (error) {
        setSquadData({ teams: {}, loading: false, error: error.message });
      }
    };

    fetchSquads();
  }, [matchId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold">Squads</h2>
      {squadData.loading ? (
        <p>Loading squads...</p>
      ) : squadData.error ? (
        <p className="text-red-500">Error: {squadData.error}</p>
      ) : (
        Object.keys(squadData.teams).map((teamKey, index) => {
          const team = squadData.teams[teamKey];
          return (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-bold bg-gray-200 p-2">{team.name}</h3>
              <h4 className="text-md font-semibold mt-2">Playing XI</h4>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {team.playingXI.map((player, idx) => (
                  <div key={idx} className="p-2 border rounded-md flex items-center">
                    <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full mr-2" />
                    <div>
                      <p className="font-semibold">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-md font-semibold mt-4">Benched Players</h4>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {team.benched.map((player, idx) => (
                  <div key={idx} className="p-2 border rounded-md flex items-center">
                    <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full mr-2" />
                    <div>
                      <p className="font-semibold">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SquadsCricket;
