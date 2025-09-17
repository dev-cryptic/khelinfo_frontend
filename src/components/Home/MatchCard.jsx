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
  runsNeeded,
  oversRemaining,
  live,
}) => {
  const normalizedStatus = status?.toLowerCase() || "";

  // --- Determine if LIVE ---
  // Live only if flagged live AND not stumps/finished
  const isLive = live && !normalizedStatus.includes("stump");

  // --- Status color ---
  const statusColor = isLive
    ? "text-red-600"
    : normalizedStatus.includes("upcoming")
    ? "text-blue-600"
    : "text-gray-800";

  // --- Footer center text logic ---
  let displayCenter;
  if (normalizedStatus.includes("stump")) {
    displayCenter = status; // e.g., "Stumps - Day 3"
  } else if (innings === 1) {
    displayCenter = "First innings";
  } else if (innings === 2 && runsNeeded != null && oversRemaining != null) {
    displayCenter = `${runsNeeded} runs needed from ${oversRemaining} overs`;
  } else {
    displayCenter = status || "Match not started";
  }

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
          {badge?.label || "Match"}
        </span>
        <span className="text-xs text-gray-500 font-medium truncate">
          {title || "Unknown Series"}
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
        {/* Left: LIVE indicator */}
        {isLive && (
          <p className="text-xs sm:text-sm font-semibold flex items-center gap-1 text-red-600">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            LIVE
          </p>
        )}

        {/* Center: Status / target / innings info */}
        <p
          className={`flex-1 text-center text-xs sm:text-sm font-semibold ${statusColor}`}
        >
          {displayCenter}
        </p>

        {/* Right: empty space to balance flex */}
        <div className="w-10"></div>
      </div>
    </button>
  );
};

export default MatchCard;
