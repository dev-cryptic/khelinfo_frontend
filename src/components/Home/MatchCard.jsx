import React from "react";
import { useTranslation } from "react-i18next"; // 1. Import the hook

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
  const { t } = useTranslation(); // 2. Call the hook
  const normalizedStatus = status?.toLowerCase() || "";
  const isPotentiallyLive = live && !normalizedStatus.includes("stump");

  const maxOvers = type?.toUpperCase().includes("T20") ? 20 : 50;

  const parseScore = (scoreStr) => {
    if (!scoreStr) return { runs: 0, wickets: 0, overs: 0 };
    const [runsWickets, oversPart] = scoreStr.split(" ");
    const [runs, wickets] = runsWickets.split("-").map(Number).map(n => isNaN(n) ? 0 : n);
    const overs = oversPart ? parseFloat(oversPart.replace(/[()]/g, "")) : 0;
    return { runs, wickets, overs };
  };

  const scoreA = parseScore(teamAScore);
  const scoreB = parseScore(teamBScore);

  let displayCenter = "";
  let matchHasConcluded = false;

  // 3. Use the t() function for all text strings
  if (innings === 2 && isPotentiallyLive) {
    const ballsBowled =
      Math.floor(scoreB.overs) * 6 + Math.round((scoreB.overs % 1) * 10);
    const totalBalls = maxOvers * 6;
    const ballsRemaining = Math.max(totalBalls - ballsBowled, 0);
    const runsNeeded = Math.max(scoreA.runs - scoreB.runs + 1, 0);

    if (runsNeeded <= 0) {
      displayCenter = t('won_the_match', { team: teamB });
      matchHasConcluded = true;
    } else if (ballsRemaining <= 0 && scoreA.runs !== scoreB.runs) {
      displayCenter = t('won_the_match', { team: teamA });
      matchHasConcluded = true;
    } else if (ballsRemaining <= 0 && scoreA.runs === scoreB.runs) {
      displayCenter = t('match_tied');
      matchHasConcluded = true;
    }
     else {
      displayCenter = t('runs_needed', { runs: runsNeeded, balls: ballsRemaining });
    }
  } else if (
    normalizedStatus.includes("finish") ||
    normalizedStatus.includes("ended") ||
    normalizedStatus.includes("result")
  ) {
    matchHasConcluded = true;
    if (scoreA.runs > scoreB.runs) displayCenter = t('won_trophy', { team: teamA });
    else if (scoreB.runs > scoreA.runs) displayCenter = t('won_trophy', { team: teamB });
    else displayCenter = t('match_drawn');
  } else if (normalizedStatus.includes("stump")) {
    displayCenter = status;
  } else if (innings === 1) {
    displayCenter = t('vs', { teamA: teamA, teamB: teamB });
  } else if (normalizedStatus.includes("upcoming")) {
    displayCenter = t('match_not_started');
  } else {
    displayCenter = status || t('match_info_unavailable');
  }

  const isLive = isPotentiallyLive && !matchHasConcluded;

  const statusColor = isLive
    ? "text-red-600"
    : normalizedStatus.includes("upcoming")
    ? "text-blue-600"
    : "text-gray-800";

  return (
    <button
      className={`flex-shrink-0 w-[280px] sm:w-[320px] p-4 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left ${gradient}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            badge?.color || "bg-gray-300 text-gray-700"
          }`}
        >
          {type || t('match')}
        </span>
        <span className="text-xs text-gray-500 font-medium truncate">
          {title || t('unknown_series')} • {leagueName}
        </span>
      </div>

      {/* Team A */}
      <div className="flex items-center justify-between mt-2 py-1">
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={teamALogo || "/placeholder-team.png"}
            alt={teamA || "Team A"}
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
          />
          <span className="text-sm sm:text-base font-semibold text-gray-800 truncate max-w-[60%]">
            {teamA || "Team A"}
          </span>
        </div>
        <div className="text-sm sm:text-base font-bold text-gray-900 whitespace-pre-line">
          {teamAScore || "0-0 (0.0)"}
        </div>
      </div>

      {/* Team B */}
      <div className="flex items-center justify-between mt-1 py-1">
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={teamBLogo || "/placeholder-team.png"}
            alt={teamB || "Team B"}
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
          />
          <span className="text-sm sm:text-base font-semibold text-gray-800 truncate max-w-[60%]">
            {teamB || "Team B"}
          </span>
        </div>
        <div className="text-sm sm:text-base font-bold text-gray-900 whitespace-pre-line">
          {teamBScore || "0-0 (0.0)"}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between">
        {isLive && (
          <p className="text-xs sm:text-sm font-semibold flex items-center gap-1 text-red-600">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            {t('live')}
          </p>
        )}
        <p className={`flex-1 text-center text-xs sm:text-sm font-semibold ${statusColor}`}>
          {displayCenter}
        </p>
        <div className="w-10"></div>
      </div>
    </button>
  );
};

export default MatchCard;

