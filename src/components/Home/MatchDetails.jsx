import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



const CRICKET_API_URL = import.meta.env.VITE_CRICKET_API_URL
// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#2354a8]"></div>
  </div>
);

// Card Wrapper
const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

// Batting Table
const BattingTable = ({ data, getPlayer, getDismissalInfo }) => {
  return (
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
            const strikeRate = bat.ball > 0 ? ((parseInt(bat.score) || 0) / parseInt(bat.ball)) * 100 : 0;
            return (
              <tr key={bat.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap flex items-center gap-2">
                  <img src={player?.image_path || "https://via.placeholder.com/30"} alt={player?.fullname || "Player"} className="w-6 h-6 rounded-full" />
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
};

// Bowling Table
const BowlingTable = ({ data, getPlayer }) => {
  return (
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
                  <img src={player?.image_path || "https://via.placeholder.com/30"} alt={player?.fullname || "Player"} className="w-6 h-6 rounded-full" />
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
};

// Match Info Component
const MatchInfo = ({ match, getTeamName, getOfficialName }) => {
  const renderPlayers = (playersList) => playersList?.map((p, idx) => (
    <li key={idx} className="flex justify-between text-sm py-1 border-b border-gray-100">
      <span>{p.name}</span>
      <span className="text-gray-500">{p.role}</span>
    </li>
  ));

  return (
    <div className="space-y-4">
      <ul className="text-sm text-gray-700 space-y-1">
        <li><span className="font-semibold">Venue:</span> {match.venue?.name || "N/A"}, {match.venue?.city}</li>
        <li><span className="font-semibold">Toss:</span> {getTeamName(match.toss_won_team_id)} elected to {match.elected}</li>
        <li><span className="font-semibold">First Umpire:</span> {getOfficialName(match.first_umpire_id) || "N/A"}</li>
        <li><span className="font-semibold">Second Umpire:</span> {getOfficialName(match.second_umpire_id) || "N/A"}</li>
        <li><span className="font-semibold">TV Umpire:</span> {getOfficialName(match.tv_umpire_id) || "N/A"}</li>
        <li><span className="font-semibold">Referee:</span> {getOfficialName(match.referee_id) || "N/A"}</li>
      </ul>
      {match.squads?.map((teamSquad, idx) => (
        <div key={idx} className="space-y-2">
          <h3 className="text-md font-semibold text-gray-800">{getTeamName(teamSquad.team_id)}</h3>
          {teamSquad.playing_xi?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-600 mb-1">Playing XI</p>
              <ul className="border rounded-md divide-y divide-gray-100 p-2">{renderPlayers(teamSquad.playing_xi)}</ul>
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
  const [activeTab, setActiveTab] = useState("scorecard");

  const [activeInning, setActiveInning] = useState(0);
  const [userSelectedInning, setUserSelectedInning] = useState(false);

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const [teamsRes, playersRes, leaguesRes, officialsRes] = await Promise.all([
          axios.get(`${CRICKET_API_URL}/teams`),
          axios.get(`${CRICKET_API_URL}/players`),
          axios.get(`${CRICKET_API_URL}/leagues`),
          axios.get(`${CRICKET_API_URL}/officials`),
        ]);
        setTeams(teamsRes.data.data);
        setPlayers(playersRes.data.data);
        setLeagues(leaguesRes.data.data);
        setOfficials(officialsRes.data.data);
      } catch (err) {
        console.error("Failed to fetch static data:", err);
      }
    };
    fetchStaticData();
  }, []);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get(`${CRICKET_API_URL}/livescores`);
        const foundMatch = res.data.data.find((m) => m.id === parseInt(id));
        if (foundMatch) setMatch(foundMatch);
      } catch (err) {
        console.error("Failed to fetch match data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatch();
    const interval = setInterval(fetchMatch, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const getTeamName = (id) => teams.find(t => t.id === id)?.name || `Team ${id}`;
  const battingByTeam = useMemo(() => (match?.batting || []).reduce((acc, bat) => { (acc[bat.team_id] = acc[bat.team_id] || []).push(bat); return acc; }, {}), [match]);

  const firstInningTeamId = useMemo(() => {
    if (!match) return null;
    const tossWinner = match.toss_won_team_id;
    const otherTeam = tossWinner === match.localteam_id ? match.visitorteam_id : match.localteam_id;
    return match.elected === 'batting' ? tossWinner : otherTeam;
  }, [match]);

  const innings = useMemo(() => {
    if (!match || !teams.length || !firstInningTeamId) return [];

    const secondInningTeamId = firstInningTeamId === match.localteam_id ? match.visitorteam_id : match.localteam_id;
    const orderedTeamIds = [firstInningTeamId, secondInningTeamId];

    return orderedTeamIds
      .map((teamId) => ({
        battingTeam: teamId,
        bowlingTeam: teamId === firstInningTeamId ? secondInningTeamId : firstInningTeamId,
        title: `${getTeamName(teamId)} Innings`,
      }))
      .filter(
        (inn) =>
          (battingByTeam[inn.battingTeam]?.length > 0) ||
          (Array.isArray(match.runs) && match.runs.some((r) => r.team_id === inn.battingTeam))
      );
  }, [match, teams, getTeamName, battingByTeam, firstInningTeamId]);

  const isMatchFinished = useMemo(() => {
    if (!match?.status) return false;
    const status = match.status.toLowerCase();
    const note = match.note?.toLowerCase() || '';
    return status.includes('finish') || status.includes('ended') || status.includes('result') || note.includes('won');
  }, [match]);

  useEffect(() => {
    if (innings.length > 0 && !userSelectedInning) {
      const defaultInning = isMatchFinished ? 0 : innings.length - 1;
      setActiveInning(defaultInning);
    }
  }, [innings.length, userSelectedInning, isMatchFinished]);

  const handleInningChange = (index) => {
    setUserSelectedInning(true);
    setActiveInning(index);
  };

  if (loading) return <Spinner />;
  if (!match) return <p className="text-center mt-20 text-gray-600">Match not found</p>;

  const getTeam = (id) => teams.find((t) => t.id === id);
  const getTeamLogo = (id) => getTeam(id)?.image_path || "https://via.placeholder.com/50";
  const getPlayer = (id) => players.find((p) => p.id === id);
  const getLeagueName = (id) => leagues.find((l) => l.id === id)?.name || `League ${id}`;
  const getOfficialName = (id) => officials.find((o) => o.id === id)?.fullname || `Official ${id}`;

  const getDismissalInfo = (b) => {
    const bowler = getPlayer(b.bowling_player_id)?.fullname || '';
    const catcher = getPlayer(b.catch_stump_player_id)?.fullname || '';
    const fielder = getPlayer(b.runout_by_id)?.fullname || '';

    if (b.runout_by_id) return `Run Out (${fielder})`;
    if (b.catch_stump_player_id && b.bowling_player_id) return `c ${catcher} b ${bowler}`;
    if (b.bowling_player_id) return `b ${bowler}`;
    // FIX: Catches run outs where the API puts the fielder in catch_stump_player_id and bowling_player_id is null
    if (b.catch_stump_player_id) return `Run Out (${catcher})`;
    return <span className="font-bold text-green-600">Not Out</span>;
  };

  const bowlingByTeam = (match.bowling || []).reduce((acc, bowl) => { (acc[bowl.team_id] = acc[bowl.team_id] || []).push(bowl); return acc; }, {});

  const getInningsStats = (teamId) => {
    if (!teamId) return { totalRuns: 0, totalWickets: 0, overs: "0.0" };
    if (Array.isArray(match.runs)) {
      const teamRuns = match.runs.filter(r => r.team_id === teamId).pop();
      if (teamRuns) {
        return {
          totalRuns: Number(teamRuns.score) || 0,
          totalWickets: Number(teamRuns.wickets) || 0,
          overs: teamRuns.overs?.toFixed(1) || "0.0"
        };
      }
    }

    const bats = battingByTeam[teamId] || [];
    const totalRuns = bats.reduce((sum, b) => sum + (Number(b.score) || 0), 0);
    const totalWickets = bats.filter(b => b.bowling_player_id || b.runout_by_id).length;

    const oppId = teamId === match.localteam_id ? match.visitorteam_id : match.localteam_id;
    const oppBowling = bowlingByTeam[oppId] || [];
    const totalBalls = oppBowling.reduce((sum, b) => sum + ((Math.floor(b.overs) * 6) + (b.overs % 1) * 10), 0);
    const overs = `${Math.floor(totalBalls / 6)}.${totalBalls % 6}`;

    return { totalRuns, totalWickets, overs };
  };

  const oversToBalls = (oversStr) => {
    if (!oversStr) return 0;
    const [o, b] = String(oversStr).split(".").map(s => parseInt(s, 10) || 0);
    return o * 6 + b;
  };

  const computeRunsNeededInfo = () => {
    if (innings.length < 2) return { runsNeeded: null, ballsRemaining: null, reqRR: null };

    const firstStats = getInningsStats(innings[0].battingTeam);
    const secondStats = getInningsStats(innings[1].battingTeam);

    const runsNeeded = firstStats.totalRuns + 1 - secondStats.totalRuns;
    const ballsBowled = oversToBalls(secondStats.overs);
    const totalBalls = (match.type?.includes("T20") ? 20 : 50) * 6;
    const ballsRemaining = Math.max(totalBalls - ballsBowled, 0);
    const reqRR = ballsRemaining > 0 && runsNeeded > 0 ? (runsNeeded / ballsRemaining) * 6 : 0;

    return { runsNeeded, ballsRemaining, reqRR };
  };

  const activeInningData = innings[activeInning];
  if (!activeInningData) return <Spinner />;

  const battingData = battingByTeam[activeInningData.battingTeam] || [];
  const bowlingData = bowlingByTeam[activeInningData.bowlingTeam] || [];
  const stats = getInningsStats(activeInningData.battingTeam);
  const { totalRuns, totalWickets, overs } = stats;
  const runsNeededInfo = computeRunsNeededInfo();

  const renderScoreSummary = () => {
    const ballsBowled = oversToBalls(overs);
    const crr = ballsBowled > 0 ? (totalRuns / ballsBowled) * 6 : 0;

    if (activeInning === 1 && !isMatchFinished && runsNeededInfo.runsNeeded > 0) {
      const { reqRR } = runsNeededInfo;
      return <p className="text-sm font-semibold text-gray-600">{`CRR: ${crr.toFixed(2)}  |  Req RR: ${reqRR.toFixed(2)}`}</p>;
    }

    return <p className="text-sm font-semibold text-gray-600">{`CRR: ${crr.toFixed(2)}`}</p>;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <Card className="p-6">
          <p className="text-sm font-semibold text-[#2354a8]">{match.round || match.type}</p>
          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            {getTeamName(match.localteam_id)} vs {getTeamName(match.visitorteam_id)}
          </h1>
          <p className="text-md text-gray-500 mt-2">{getLeagueName(match.league_id)}</p>
          {match.toss_won_team_id && (
            <p className="text-sm text-green-700 mt-1">{`${getTeamName(match.toss_won_team_id)} won the toss and elected to ${match.elected}`}</p>
          )}

          {innings.length > 1 && !isMatchFinished && getInningsStats(innings[0].battingTeam).totalRuns > 0 ? (
            <p className="mt-4 text-lg font-semibold text-red-600">{`Target ${getInningsStats(innings[0].battingTeam).totalRuns + 1} runs`}</p>
          ) : (
            <p className="mt-4 text-lg font-semibold text-red-600">{match.note || match.status}</p>
          )}
        </Card>

        <div className="flex gap-2">
          {/* <button className={`px-4 py-2 rounded-md font-semibold ${activeTab === "matchinfo" ? "bg-[#2354a8] text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setActiveTab("matchinfo")}>Live</button> */}
          <button className={`px-4 py-2 rounded-md font-semibold ${activeTab === "scorecard" ? "bg-[#2354a8] text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setActiveTab("scorecard")}>Scorecard</button>
          <button className={`px-4 py-2 rounded-md font-semibold ${activeTab === "matchinfo" ? "bg-[#2354a8] text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setActiveTab("matchinfo")}>Match Info</button>

        </div>

        {activeTab === "scorecard" && (
          <div className="space-y-6">
            {innings.length > 0 && (
              <div className="flex gap-2 p-1 bg-gray-200 rounded-lg">
                {innings.map((inn, index) => (
                  <button key={index} className={`w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${activeInning === index ? "bg-white text-[#2354a8] shadow" : "bg-transparent text-gray-600 hover:bg-gray-300"}`} onClick={() => handleInningChange(index)}>{inn.title}</button>
                ))}
              </div>
            )}

            <Card>
            {/* UPDATED: Flex container is now a single row on all screen sizes */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">

                {/* Team Info */}
                <div className="flex items-center gap-3">
                    <img src={getTeamLogo(activeInningData.battingTeam)} alt={`${activeInningData.battingTeam} logo`} className="w-10 h-10 object-cover rounded-full" />
                    <h2 className="text-xl font-bold text-gray-800">{activeInningData.title}</h2>
                </div>

                {/* Score Info */}
                <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">
                        {totalRuns}/{totalWickets}
                        <span className="text-lg font-normal text-gray-500 ml-1">({overs} ov)</span>
                    </p>
                    {renderScoreSummary()}
                </div>

            </div>
            <BattingTable data={battingData} getPlayer={getPlayer} getDismissalInfo={getDismissalInfo} />
        </Card>

            <Card>
              <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <img src={getTeamLogo(activeInningData.bowlingTeam)} alt="" className="w-10 h-10 object-cover rounded-full" />
                <h2 className="text-xl font-bold text-gray-800">{`Bowling - ${getTeamName(activeInningData.bowlingTeam)}`}</h2>
              </div>
              <BowlingTable data={bowlingData} getPlayer={getPlayer} />
            </Card>
          </div>
        )}

        {activeTab === "matchinfo" && <Card className="p-4"><MatchInfo match={match} getTeamName={getTeamName} getOfficialName={getOfficialName} /></Card>}

        <div className="text-center pt-4">
          <button onClick={() => navigate(-1)} className="px-6 py-2 bg-[#2354a8] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow hover:shadow-lg">Back to Matches</button>
        </div>
      </div>
    </div>
  );
}