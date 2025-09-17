// MatchDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// --- Helper Components ---

// ✅ Loading spinner
const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

// Batting Table
const BattingTable = ({ data, getPlayer, getDismissalInfo }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="px-4 py-3">Batter</th>
          <th className="px-4 py-3 text-right">R</th>
          <th className="px-4 py-3 text-right">B</th>
          <th className="px-4 py-3 text-right">4s</th>
          <th className="px-4 py-3 text-right">6s</th>
          <th className="px-4 py-3 text-right">SR</th>
          <th className="px-4 py-3">Dismissal</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((bat) => {
          const player = getPlayer(bat.player_id);
          return (
            <tr key={bat.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap flex items-center gap-2">
                <img
                  src={player?.image_path || "https://via.placeholder.com/30"}
                  alt={player?.fullname || "Player"}
                  className="w-6 h-6 rounded-full"
                />
                {player?.fullname || `Player ${bat.player_id}`}
              </td>
              <td className="px-4 py-3 text-right font-semibold">{bat.score}</td>
              <td className="px-4 py-3 text-right">{bat.ball}</td>
              <td className="px-4 py-3 text-right">{bat.four_x}</td>
              <td className="px-4 py-3 text-right">{bat.six_x}</td>
              <td className="px-4 py-3 text-right">{bat.rate}</td>
              <td className="px-4 py-3 text-xs">{getDismissalInfo(bat)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// Bowling Table
const BowlingTable = ({ data, getPlayer }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="px-4 py-3">Bowler</th>
          <th className="px-4 py-3 text-right">O</th>
          <th className="px-4 py-3 text-right">M</th>
          <th className="px-4 py-3 text-right">R</th>
          <th className="px-4 py-3 text-right">W</th>
          <th className="px-4 py-3 text-right">Econ</th>
          <th className="px-4 py-3 text-right">WD</th>
          <th className="px-4 py-3 text-right">NB</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((bowl) => {
          const player = getPlayer(bowl.player_id);
          return (
            <tr key={bowl.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap flex items-center gap-2">
                <img
                  src={player?.image_path || "https://via.placeholder.com/30"}
                  alt={player?.fullname || "Player"}
                  className="w-6 h-6 rounded-full"
                />
                {player?.fullname || `Player ${bowl.player_id}`}
              </td>
              <td className="px-4 py-3 text-right">{bowl.overs}</td>
              <td className="px-4 py-3 text-right">{bowl.medians}</td>
              <td className="px-4 py-3 text-right">{bowl.runs}</td>
              <td className="px-4 py-3 text-right font-semibold">{bowl.wickets}</td>
              <td className="px-4 py-3 text-right">{bowl.rate}</td>
              <td className="px-4 py-3 text-right">{bowl.wide}</td>
              <td className="px-4 py-3 text-right">{bowl.noball}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

function MatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeInning, setActiveInning] = useState(0);

  // Fetch teams, players, and match data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, playersRes, matchesRes] = await Promise.all([
          axios.get("https://khelinfo-bkd.onrender.com/api/teams"),
          axios.get("https://khelinfo-bkd.onrender.com/api/players"),
          axios.get("https://khelinfo-bkd.onrender.com/api/livescores"),
        ]);

        const allTeams = teamsRes.data.data;
        const allPlayers = playersRes.data.data;
        const foundMatch = matchesRes.data.data.find((m) => m.id === parseInt(id));

        setTeams(allTeams);
        setPlayers(allPlayers);
        if (foundMatch) setMatch(foundMatch);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Spinner />;

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Card className="text-center p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Match Not Found</h2>
          <p className="text-gray-600 mb-6">No match data is available for ID: {id}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Go Back
          </button>
        </Card>
      </div>
    );
  }

  // Helpers
  const getTeamInfo = (id, field) => teams.find((t) => t.id === id)?.[field];
  const getTeamName = (id) => getTeamInfo(id, "name") || `Team ${id}`;
  const getTeamLogo = (id) => getTeamInfo(id, "image_path") || "https://via.placeholder.com/50";

  const getPlayer = (playerId) => players.find((p) => p.id === playerId);

  const getDismissalInfo = (batter) => {
    if (batter.wicket_id) return `b ${getPlayer(batter.bowling_player_id)?.fullname || "Unknown"}`;
    if (batter.runout_by_id) return `run out (${getPlayer(batter.runout_by_id)?.fullname || "Unknown"})`;
    return <span className="font-bold text-green-600">not out</span>;
  };

  // Group batting & bowling by team
  const battingByTeam = match.batting.reduce((acc, bat) => {
    (acc[bat.team_id] = acc[bat.team_id] || []).push(bat);
    return acc;
  }, {});

  const bowlingByTeam = match.bowling.reduce((acc, bowl) => {
    (acc[bowl.team_id] = acc[bowl.team_id] || []).push(bowl);
    return acc;
  }, {});

  const innings = [
    {
      battingTeam: match.localteam_id,
      bowlingTeam: match.visitorteam_id,
      title: `${getTeamName(match.localteam_id)} Innings`,
    },
  ];

  if (battingByTeam[match.visitorteam_id]?.length > 0) {
    innings.push({
      battingTeam: match.visitorteam_id,
      bowlingTeam: match.localteam_id,
      title: `${getTeamName(match.visitorteam_id)} Innings`,
    });
  }

  const activeInningData = innings[activeInning];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Header */}
        <Card className="p-6">
          <p className="text-sm font-semibold text-blue-600">{match.round || match.type}</p>
          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            {getTeamName(match.localteam_id)} vs {getTeamName(match.visitorteam_id)}
          </h1>
          <p className="text-md text-gray-500 mt-2">
            {new Date(match.starting_at).toLocaleDateString()}
          </p>
          <p className="mt-4 text-lg font-semibold text-green-600">{match.note || match.status}</p>
        </Card>

        {/* Inning Tabs */}
        <div className="flex gap-2 p-1 bg-gray-200 rounded-lg">
          {innings.map((inn, index) => (
            <button
              key={index}
              className={`w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${
                activeInning === index
                  ? "bg-white text-blue-600 shadow"
                  : "bg-transparent text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => setActiveInning(index)}
            >
              {inn.title}
            </button>
          ))}
        </div>

        {/* Batting */}
        <Card>
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <img
                src={getTeamLogo(activeInningData.battingTeam)}
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
              {activeInningData.title}
            </h2>
          </div>
          <BattingTable
            data={battingByTeam[activeInningData.battingTeam]}
            getPlayer={getPlayer}
            getDismissalInfo={getDismissalInfo}
          />
        </Card>

        {/* Bowling */}
        <Card>
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <img
                src={getTeamLogo(activeInningData.bowlingTeam)}
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
              {getTeamName(activeInningData.bowlingTeam)} Bowling
            </h2>
          </div>
          <BowlingTable
            data={bowlingByTeam[activeInningData.bowlingTeam]}
            getPlayer={getPlayer}
          />
        </Card>

        {/* Back */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow hover:shadow-lg"
          >
            Back to Matches
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatchDetails;
