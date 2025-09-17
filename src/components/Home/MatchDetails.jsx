// MatchDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Spinner and Card remain the same
const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>{children}</div>
);

// Batting Table with dynamic SR
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
          const strikeRate =
            bat.ball > 0 ? ((parseInt(bat.score) || 0) / parseInt(bat.ball)) * 100 : 0;
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
              <td className="px-4 py-3 text-right">{strikeRate.toFixed(1)}</td>
              <td className="px-4 py-3 text-xs">{getDismissalInfo(bat)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// Bowling Table stays same
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

  // Fetch teams and players once
  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const [teamsRes, playersRes] = await Promise.all([
          axios.get("https://khelinfo-bkd.onrender.com/api/teams"),
          axios.get("https://khelinfo-bkd.onrender.com/api/players"),
        ]);
        setTeams(teamsRes.data.data);
        setPlayers(playersRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStaticData();
  }, []);

  // Poll match data every 5 seconds
  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const matchesRes = await axios.get("https://khelinfo-bkd.onrender.com/api/livescores");
        const foundMatch = matchesRes.data.data.find((m) => m.id === parseInt(id));
        if (foundMatch) setMatch(foundMatch);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
    const interval = setInterval(fetchMatch, 5000); // every 5 sec
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <Spinner />;

  if (!match) return <p className="text-center mt-20 text-gray-600">Match Not Found</p>;

  const getTeamInfo = (id, field) => teams.find((t) => t.id === id)?.[field];
  const getTeamName = (id) => getTeamInfo(id, "name") || `Team ${id}`;
  const getTeamLogo = (id) => getTeamInfo(id, "image_path") || "https://via.placeholder.com/50";
  const getPlayer = (playerId) => players.find((p) => p.id === playerId);

  // Updated Dismissal Logic
  const getDismissalInfo = (batter) => {
    if (batter.runout_by_id) {
      return `run out (${getPlayer(batter.runout_by_id)?.fullname || "Fielder"})`;
    }
    if (batter.catch_stump_player_id && batter.bowling_player_id) {
      return `c ${getPlayer(batter.catch_stump_player_id)?.fullname || "Fielder"} b ${getPlayer(batter.bowling_player_id)?.fullname || "Bowler"}`;
    }
    if (batter.bowling_player_id) {
      return `b ${getPlayer(batter.bowling_player_id)?.fullname || "Bowler"}`;
    }
    return <span className="font-bold text-green-600">not out</span>;
  };

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
  if (battingByTeam[match.visitorteam_id]?.length > 0)
    innings.push({
      battingTeam: match.visitorteam_id,
      bowlingTeam: match.localteam_id,
      title: `${getTeamName(match.visitorteam_id)} Innings`,
    });

  const activeInningData = innings[activeInning];

// Calculate total runs/wickets for active inning
const battingData = battingByTeam[activeInningData.battingTeam] || [];
const bowlingData = bowlingByTeam[activeInningData.bowlingTeam] || [];

// Total runs = batter runs + extras from bowling (wide, no-ball, legby) + any other extras
const totalBatRuns = battingData.reduce((acc, b) => acc + (Number(b.score) || 0), 0);
const totalExtrasFromBowling = bowlingData.reduce(
  (acc, b) =>
    acc +
    (Number(b.wide) || 0) +
    (Number(b.noball) || 0) +
    (Number(b.legby) || 0) +
    (Number(b.lb) || 0), // added lb
  0
);
const totalOtherExtras = match.extras?.[activeInningData.battingTeam] || 0;

const totalRuns = totalBatRuns + totalExtrasFromBowling + totalOtherExtras;

// Total wickets: count only dismissed batters
const totalWickets = battingData.filter(
  (b) => b.bowling_player_id || b.catch_stump_player_id || b.runout_by_id
).length;



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
            <h2 className="text-xl font-bold text-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={getTeamLogo(activeInningData.battingTeam)}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full"
                />
                {activeInningData.title}
              </div>
              <span className="text-gray-600 font-semibold">{totalRuns}/{totalWickets}</span>
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
