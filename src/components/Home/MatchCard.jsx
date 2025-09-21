import React from "react";

const MatchCard = ({
  title,
  badge,
  teamA,
  teamALogo,
  teamAScore,
  teamB,
  teamBLogo,
  teamBScore,
  status,
  gradient,
  onClick,
  innings,
  live,
  leagueName,
  type,
}) => {
  const normalizedStatus = status?.toLowerCase() || "";
  const isPotentiallyLive = live && !normalizedStatus.includes("stump");

  const maxOvers = type?.toUpperCase().includes("T20") ? 20 : 50;

  const parseScore = (scoreStr) => {
    if (!scoreStr) return { runs: 0, wickets: 0, overs: 0 };
    const [runsWickets, oversPart] = scoreStr.split(" ");
    const parts = (runsWickets || "0-0").split("-");
    const runs = parseInt(parts[0], 10) || 0;
    const wickets = parts.length > 1 ? (parseInt(parts[1], 10) || 0) : 0;
    const overs = oversPart ? parseFloat(oversPart.replace(/[()]/g, "")) : 0;
    return { runs, wickets: Math.min(wickets, 10), overs };
  };

  // --- START: DYNAMIC TEAM ASSIGNMENT ---
  const score1 = parseScore(teamAScore);
  const score2 = parseScore(teamBScore);

  // Dynamically determine who batted first. The team with more overs has batted first.
  // This makes the component robust regardless of the prop order (teamA vs teamB).
  const isTeamABattingFirst = score1.overs >= score2.overs;

  const firstInningsTeam = isTeamABattingFirst ? teamA : teamB;
  const firstInningsScoreObj = isTeamABattingFirst ? score1 : score2;
  const firstInningsLogo = isTeamABattingFirst ? teamALogo : teamBLogo;
  const firstInningsRawScore = isTeamABattingFirst ? teamAScore : teamBScore;

  const secondInningsTeam = isTeamABattingFirst ? teamB : teamA;
  const secondInningsScoreObj = isTeamABattingFirst ? score2 : score1;
  const secondInningsLogo = isTeamABattingFirst ? teamBLogo : teamALogo;
  const secondInningsRawScore = isTeamABattingFirst ? teamBScore : teamAScore;
  // --- END: DYNAMIC TEAM ASSIGNMENT ---

  let displayCenter = "";
  let matchHasConcluded = false;

  // --- START: UPDATED LOGIC USING DYNAMIC TEAMS ---
  if (normalizedStatus.includes("finish") || normalizedStatus.includes("ended") || normalizedStatus.includes("result")) {
    matchHasConcluded = true;
    if (firstInningsScoreObj.runs > secondInningsScoreObj.runs) displayCenter = `${firstInningsTeam} won the match`;
    else if (secondInningsScoreObj.runs > firstInningsScoreObj.runs) displayCenter = `${secondInningsTeam} won the match`;
    else displayCenter = 'Match Drawn';
  }
  else if (
    isPotentiallyLive &&
    (firstInningsScoreObj.wickets >= 10 || firstInningsScoreObj.overs >= maxOvers) &&
    secondInningsScoreObj.overs === 0 && secondInningsScoreObj.runs === 0
  ) {
    displayCenter = `${secondInningsTeam} need ${firstInningsScoreObj.runs + 1} to win`;
  }
  else if (innings === 2 && isPotentiallyLive) {
    const runsNeeded = Math.max(firstInningsScoreObj.runs - secondInningsScoreObj.runs + 1, 0);
    const ballsBowled = Math.floor(secondInningsScoreObj.overs) * 6 + Math.round((secondInningsScoreObj.overs % 1) * 10);
    const totalBalls = maxOvers * 6;
    const ballsRemaining = Math.max(totalBalls - ballsBowled, 0);

    if (secondInningsScoreObj.runs > firstInningsScoreObj.runs) {
      displayCenter = `${secondInningsTeam} won the match`;
      matchHasConcluded = true;
    }
    else if (secondInningsScoreObj.wickets >= 10 || ballsRemaining <= 0) {
      matchHasConcluded = true;
      if (firstInningsScoreObj.runs > secondInningsScoreObj.runs) {
        displayCenter = `${firstInningsTeam} won the match`;
      } else {
        displayCenter = 'Match Tied';
      }
    }
    else {
      displayCenter = `${secondInningsTeam} needs ${runsNeeded} runs from ${ballsRemaining} balls`;
    }
  }
  else if (innings === 1 && isPotentiallyLive) {
    displayCenter = `${firstInningsTeam} is batting`;
  }
  else if (normalizedStatus.includes("stump")) {
    displayCenter = status;
    matchHasConcluded = true;
  } else if (normalizedStatus.includes("upcoming")) {
    displayCenter = 'Match not started';
    matchHasConcluded = true;
  } else {
    displayCenter = status || 'Match info unavailable';
  }
  // --- END: UPDATED LOGIC ---

  const isLive = isPotentiallyLive && !matchHasConcluded;
  const statusColor = isLive ? "text-red-600" : "text-gray-800";

  return (
    <button
      className={`flex-shrink-0 w-[280px] sm:w-[320px] p-4 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left ${gradient}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badge?.color || "bg-gray-300 text-gray-700"}`}>
          {type || 'Match'}
        </span>
        <span className="text-xs text-gray-500 font-medium truncate">
          {title || 'Unknown Series'} • {leagueName}
        </span>
      </div>

      {/* Team who Batted First */}
      <div className="flex items-center justify-between mt-2 py-1">
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={firstInningsLogo || "https://placehold.co/40x40/EBF4FF/333333?text=A"}
            alt={firstInningsTeam || "Team A"}
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
          />
          <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">
            {firstInningsTeam || "Team A"}
          </span>
        </div>
        <div className="text-sm sm:text-base font-bold text-gray-900">
          {firstInningsRawScore || ""}
        </div>
      </div>

      {/* Team who Batted Second */}
      <div className="flex items-center justify-between mt-1 py-1">
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={secondInningsLogo || "https://placehold.co/40x40/FFF0F0/333333?text=B"}
            alt={secondInningsTeam || "Team B"}
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
          />
          <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">
            {secondInningsTeam || "Team B"}
          </span>
        </div>
        <div className="text-sm sm:text-base font-bold text-gray-900">
          {secondInningsRawScore || ""}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between min-h-[24px]">
        <div className="flex-shrink-0 w-12 text-left">
          {isLive && (
            <p className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-red-600">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              {'Live'}
            </p>
          )}
        </div>
        <p className={`flex-1 text-center text-xs sm:text-sm font-semibold ${statusColor}`}>
          {displayCenter}
        </p>
        <div className="w-12"></div>
      </div>
    </button>
  );
};

export default MatchCard;