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

  const battingByTeam = (match.batting || []).reduce((acc, bat) => {
    (acc[bat.team_id] = acc[bat.team_id] || []).push(bat);
    return acc;
  }, {});
  const bowlingByTeam = (match.bowling || []).reduce((acc, bowl) => {
    (acc[bowl.team_id] = acc[bowl.team_id] || []).push(bowl);
    return acc;
  }, {});

  const teamIds = [match.localteam_id, match.visitorteam_id];
  const innings = teamIds.map((teamId) => ({
    battingTeam: teamId,
    bowlingTeam: teamIds.find((id) => id !== teamId),
    title: `${getTeamName(teamId)} Innings`,
  })).filter((inn) => battingByTeam[inn.battingTeam]?.length > 0);

  const activeInningData = innings[activeInning] || innings[0];
  const battingData = battingByTeam[activeInningData.battingTeam] || [];
  const bowlingData = bowlingByTeam[activeInningData.bowlingTeam] || [];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <Card className="p-6">
          <p className="text-sm font-semibold text-blue-600">{match.round || match.type}</p>
          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            {getTeamName(match.localteam_id)} vs {getTeamName(match.visitorteam_id)}
          </h1>
          <p className="text-md text-gray-500 mt-2">{getLeagueName(match.league_id)}</p>
          <p className="text-md text-green-600 mt-2">{getTeamName(match.toss_won_team_id)} elected {match.elected}</p>
          <p className="mt-4 text-lg font-semibold text-red-600">{match.note || match.status}</p>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md font-semibold ${
              activeTab === "scorecard" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab("scorecard")}
          >
            Scorecard
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold ${
              activeTab === "matchinfo" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab("matchinfo")}
          >
            Match Info
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "scorecard" && (
          <div className="space-y-6">
            {/* Innings Selector */}
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

            {/* Score Summary */}
            <Card>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={getTeamLogo(activeInningData.battingTeam)}
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <h2 className="text-xl font-bold text-gray-800">{activeInningData.title}</h2>
                </div>
                <div className="text-right">
                  {(() => {
                    const totalRuns = battingData.reduce((sum, b) => sum + (parseInt(b.score) || 0), 0);
                    const totalWickets = battingData.filter(b => !b.not_out).length;
                    const totalBalls = battingData.reduce((sum, b) => sum + (parseInt(b.ball) || 0), 0);
                    const overs = `${Math.floor(totalBalls / 6)}.${totalBalls % 6}`;
                    const currentRunRate = totalBalls > 0 ? (totalRuns / totalBalls) * 6 : 0;

                    let requiredRunRate = null;
                    let runsNeeded = null;
                    if (innings.length === 2 && activeInning === 1) {
                      const firstInningScore = battingByTeam[innings[0].battingTeam]?.reduce(
                        (sum, b) => sum + (parseInt(b.score) || 0), 0
                      ) || 0;
                      runsNeeded = firstInningScore + 1 - totalRuns;
                      const ballsRemaining = ((match.type === "T20" ? 20 : 50) * 6) - totalBalls;
                      requiredRunRate = ballsRemaining > 0 ? (runsNeeded / ballsRemaining) * 6 : 0;
                    }

                    return (
                      <>
                        <p className="text-lg font-semibold">{totalRuns}/{totalWickets} ({overs} ov)</p>
                        {activeInning === 0 && <p className="text-sm text-gray-500">CRR: {currentRunRate.toFixed(2)}</p>}
                        {activeInning === 1 && requiredRunRate !== null && (
                          <p className="text-sm text-gray-500">
                            Runs Needed: {runsNeeded}, Req. RR: {requiredRunRate.toFixed(2)}, CRR: {currentRunRate.toFixed(2)}
                          </p>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Batting Table */}
              <BattingTable data={battingData} getPlayer={getPlayer} getDismissalInfo={getDismissalInfo} />
            </Card>

            {/* Bowling Table */}
            <Card>
              <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <img
                  src={getTeamLogo(activeInningData.bowlingTeam)}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full"
                />
                <h2 className="text-xl font-bold text-gray-800">{getTeamName(activeInningData.bowlingTeam)} Bowling</h2>
              </div>
              <BowlingTable data={bowlingData} getPlayer={getPlayer} />
            </Card>
          </div>
        )}

        {activeTab === "matchinfo" && <MatchInfo match={match} getTeamName={getTeamName} getOfficialName={getOfficialName} />}
      </div>
    </div>
  );
}
