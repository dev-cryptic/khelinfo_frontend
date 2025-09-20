// MatchDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Card Wrapper
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

// Match Info Component
const MatchInfo = ({ match, getTeamName, getOfficialName }) => {
  const renderPlayers = (playersList) =>
    playersList?.map((p, idx) => (
      <li key={idx} className="flex justify-between text-sm py-1 border-b border-gray-100">
        <span>{p.name}</span>
        <span className="text-gray-500">{p.role}</span>
      </li>
    ));

  return (
    <div className="space-y-4">
      <ul className="text-sm text-gray-700 space-y-1">
        <li>
          <span className="font-semibold">Venue:</span> {match.venue_id || "N/A"}
        </li>
        <li>
          <span className="font-semibold">Toss:</span> {getTeamName(match.toss_won_team_id)} elected {match.elected}
        </li>
        <li>
          <span className="font-semibold">1st Umpire:</span> {getOfficialName(match.first_umpire_id) || "N/A"}
        </li>
        <li>
          <span className="font-semibold">2nd Umpire:</span> {getOfficialName(match.second_umpire_id) || "N/A"}
        </li>
        <li>
          <span className="font-semibold">TV Umpire:</span> {getOfficialName(match.tv_umpire_id) || "N/A"}
        </li>
        <li>
          <span className="font-semibold">Referee:</span> {getOfficialName(match.referee_id) || "N/A"}
        </li>
      </ul>

      {match.squads?.map((teamSquad, idx) => (
        <div key={idx} className="space-y-2">
          <h3 className="text-md font-semibold text-gray-800">{getTeamName(teamSquad.team_id)}</h3>
          {teamSquad.playing_xi?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-600 mb-1">Playing XI</p>
              <ul className="border rounded-md divide-y divide-gray-100">{renderPlayers(teamSquad.playing_xi)}</ul>
            </div>
          )}
          {teamSquad.bench?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-600 mb-1 mt-2">Bench</p>
              <ul className="border rounded-md divide-y divide-gray-100">{renderPlayers(teamSquad.bench)}</ul>
            </div>
          )}
          {teamSquad.support_staff?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-600 mb-1 mt-2">Support Staff</p>
              <ul className="border rounded-md divide-y divide-gray-100">{renderPlayers(teamSquad.support_staff)}</ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main Component
export default function MatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeInning, setActiveInning] = useState(0);
  const [activeTab, setActiveTab] = useState("scorecard");

  // Fetch static data
  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const [teamsRes, playersRes, leaguesRes, officialsRes] = await Promise.all([
          axios.get("https://khelinfo-bkd.onrender.com/api/teams"),
          axios.get("https://khelinfo-bkd.onrender.com/api/players"),
          axios.get("https://khelinfo-bkd.onrender.com/api/leagues"),
          axios.get("https://khelinfo-bkd.onrender.com/api/officials"),
        ]);
        setTeams(teamsRes.data.data);
        setPlayers(playersRes.data.data);
        setLeagues(leaguesRes.data.data);
        setOfficials(officialsRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStaticData();
  }, []);

  // Fetch match data with interval
  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get("https://khelinfo-bkd.onrender.com/api/livescores");
        const foundMatch = res.data.data.find((m) => m.id === parseInt(id));
        if (foundMatch) setMatch(foundMatch);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatch();
    const interval = setInterval(fetchMatch, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <Spinner />;
  if (!match) return <p className="text-center mt-20 text-gray-600">Match Not Found</p>;

  const getTeam = (id) => teams.find((t) => t.id === id);
  const getTeamName = (id) => getTeam(id)?.name || id;
  const getTeamLogo = (id) => getTeam(id)?.image_path || "https://via.placeholder.com/50";
  const getPlayer = (id) => players.find((p) => p.id === id);
  const getLeagueName = (id) => leagues.find((l) => l.id === id)?.name || id;
  const getOfficialName = (id) => officials.find((o) => o.id === id)?.fullname || id;
  const getDismissalInfo = (b) => {
    if (b.runout_by_id) return `run out (${getPlayer(b.runout_by_id)?.fullname})`;
    if (b.catch_stump_player_id && b.bowling_player_id)
      return `c ${getPlayer(b.catch_stump_player_id)?.fullname} b ${getPlayer(b.bowling_player_id)?.fullname}`;
    if (b.bowling_player_id) return `b ${getPlayer(b.bowling_player_id)?.fullname}`;
    return <span className="font-bold text-green-600">not out</span>;
  };

  // Determine if match started
  const matchStarted = () => {
    if (Array.isArray(match.runs) && match.runs.length > 0) return true;
    if (Array.isArray(match.batting) && match.batting.length > 0) return true;
    if (match.status?.toLowerCase().includes("innings") || match.status?.toLowerCase().includes("live")) return true;
    return false;
  };

  if (!matchStarted())
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-600">
        <p className="text-xl font-semibold">Match hasn’t started yet</p>
        <p className="mt-2 text-gray-400">Scorecard will appear once the match starts.</p>
      </div>
    );

  // Scorecard logic
  const battingByTeam = (match.batting || []).reduce((acc, bat) => {
    (acc[bat.team_id] = acc[bat.team_id] || []).push(bat);
    return acc;
  }, {});
  const bowlingByTeam = (match.bowling || []).reduce((acc, bowl) => {
    (acc[bowl.team_id] = acc[bowl.team_id] || []).push(bowl);
    return acc;
  }, {});

  const teamIds = [match.localteam_id, match.visitorteam_id];
  const innings = teamIds
    .map((teamId) => ({
      battingTeam: teamId,
      bowlingTeam: teamIds.find((id) => id !== teamId),
      title: `${getTeamName(teamId)} Innings`,
    }))
    .filter(
      (inn) =>
        (battingByTeam[inn.battingTeam]?.length > 0) ||
        (Array.isArray(match.runs) && match.runs.some((r) => r.team_id === inn.battingTeam))
    );

  const getInningsStats = (teamId) => {
    if (Array.isArray(match.runs) && match.runs.length) {
      const teamRunsEntries = match.runs.filter((r) => r.team_id === teamId);
      if (teamRunsEntries.length > 0) {
        const last = teamRunsEntries[teamRunsEntries.length - 1];
        const totalRuns = Number(last.score) || 0;
        const totalWickets = Number(last.wickets) || 0;
        const overs = last.overs ?? "0.0";
        return { totalRuns, totalWickets, overs };
      }
    }
    const bats = battingByTeam[teamId] || [];
    const totalRuns = bats.reduce((acc, b) => acc + (Number(b.score) || 0), 0);
    const totalWickets = bats.filter((b) => b.bowling_player_id || b.catch_stump_player_id || b.runout_by_id).length;
    const oppId = teamIds.find((tid) => tid !== teamId);
    const oppBowling = bowlingByTeam[oppId] || [];
    let totalBalls = 0;
    oppBowling.forEach((bow) => {
      const oversStr = String(bow.overs || "0");
      const parts = oversStr.split(".");
      const o = parseInt(parts[0], 10) || 0;
      const b = parts[1] ? parseInt(parts[1], 10) || 0 : 0;
      totalBalls += o * 6 + b;
    });
    const overs = `${Math.floor(totalBalls / 6)}.${totalBalls % 6}`;
    return { totalRuns, totalWickets, overs };
  };

  const oversToBalls = (oversStr) => {
    if (!oversStr) return 0;
    const parts = String(oversStr).split(".");
    const o = parseInt(parts[0], 10) || 0;
    const b = parts[1] ? parseInt(parts[1], 10) || 0 : 0;
    return o * 6 + b;
  };

  const computeRunsNeededInfo = () => {
    if (Array.isArray(match.runs) && match.runs.length >= 2) {
      const first = match.runs[0];
      const second = match.runs[1];
      const firstScore = Number(first.score) || 0;
      const secondScore = Number(second.score) || 0;
      const runsNeeded = firstScore - secondScore;
      const ballsBowled = oversToBalls(second.overs);
      const totalBalls = (match.type === "T20" ? 20 : 50) * 6;
      const ballsRemaining = Math.max(totalBalls - ballsBowled, 0);
      const reqRR = ballsRemaining > 0 ? (runsNeeded / ballsRemaining) * 6 : null;
      return { runsNeeded, ballsRemaining, reqRR };
    }
    if (innings.length === 2) {
      const firstStats = getInningsStats(innings[0].battingTeam);
      const secondStats = getInningsStats(innings[1].battingTeam);
      const runsNeeded = firstStats.totalRuns - secondStats.totalRuns;
      const ballsBowled = oversToBalls(secondStats.overs);
      const totalBalls = (match.type === "T20" ? 20 : 50) * 6;
      const ballsRemaining = Math.max(totalBalls - ballsBowled, 0);
      const reqRR = ballsRemaining > 0 ? (runsNeeded / ballsRemaining) * 6 : null;
      return { runsNeeded, ballsRemaining, reqRR };
    }
    return { runsNeeded: null, ballsRemaining: null, reqRR: null };
  };

  const activeInningData = innings[activeInning] || innings[0] || { battingTeam: match.localteam_id, bowlingTeam: match.visitorteam_id, title: `${getTeamName(match.localteam_id)} Innings` };
  const battingData = battingByTeam[activeInningData.battingTeam] || [];
  const bowlingData = bowlingByTeam[activeInningData.bowlingTeam] || [];
  const stats = getInningsStats(activeInningData.battingTeam);
  const totalRuns = stats.totalRuns;
  const totalWickets = stats.totalWickets;
  const overs = stats.overs;
  const runsNeededInfo = computeRunsNeededInfo();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <Card className="p-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">{getLeagueName(match.league_id)}</h2>
          <p className="mt-2 text-gray-600">{match.status}</p>
          <div className="mt-4 flex justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={getTeamLogo(match.localteam_id)} alt="Local Team" className="w-8 h-8" />
              <span className="font-semibold text-gray-800">{getTeamName(match.localteam_id)}</span>
            </div>
            <span className="font-bold text-gray-800">vs</span>
            <div className="flex items-center gap-2">
              <img src={getTeamLogo(match.visitorteam_id)} alt="Visitor Team" className="w-8 h-8" />
              <span className="font-semibold text-gray-800">{getTeamName(match.visitorteam_id)}</span>
            </div>
          </div>
        </Card>

        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("scorecard")}
            className={`px-4 py-2 rounded-md font-semibold ${activeTab === "scorecard" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          >
            Scorecard
          </button>
          <button
            onClick={() => setActiveTab("matchinfo")}
            className={`px-4 py-2 rounded-md font-semibold ${activeTab === "matchinfo" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          >
            Match Info
          </button>
        </div>

        {activeTab === "scorecard" && (
          <Card className="p-4 space-y-4">
            <div className="flex gap-2 mb-2">
              {innings.map((inn, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveInning(idx)}
                  className={`px-3 py-1 rounded-md font-semibold ${activeInning === idx ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  {inn.title}
                </button>
              ))}
            </div>
            <div className="text-gray-700 mb-2">
              <p>
                <span className="font-semibold">{getTeamName(activeInningData.battingTeam)}:</span> {totalRuns}/{totalWickets} ({overs} overs)
              </p>
              {runsNeededInfo.runsNeeded !== null && (
                <p className="text-gray-500 text-sm">
                  {runsNeededInfo.runsNeeded} runs needed from {runsNeededInfo.ballsRemaining} balls
                  {runsNeededInfo.reqRR !== null && ` (Req. RR: ${runsNeededInfo.reqRR.toFixed(2)})`}
                </p>
              )}
            </div>
            <BattingTable data={battingData} getPlayer={getPlayer} getDismissalInfo={getDismissalInfo} />
            <BowlingTable data={bowlingData} getPlayer={getPlayer} />
          </Card>
        )}

        {activeTab === "matchinfo" && (
          <Card className="p-4">
            <MatchInfo match={match} getTeamName={getTeamName} getOfficialName={getOfficialName} />
          </Card>
        )}
      </div>
    </div>
  );
}
