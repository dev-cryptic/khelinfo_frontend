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
}) => {
  return (
    <div
      className={`flex-shrink-0 w-[280px] sm:w-[320px] p-4 rounded-2xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${gradient}`}
      onClick={onClick}
    >
      {/* --- Card Header --- */}
      <div className="flex justify-between items-center mb-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badge.color}`}>
          {badge.label}
        </span>
        <span className="text-xs text-gray-500 font-medium truncate">{title}</span>
      </div>

      {/* --- Team A Details --- */}
      <div className="flex items-center justify-between mt-2 py-1">
        <div className="flex items-center gap-3 overflow-hidden">
          <img src={teamALogo} alt={teamA} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">{teamA}</span>
        </div>
        {/* Changed from span to div + whitespace-pre-line */}
        <div className="text-sm sm:text-base font-bold text-gray-900 whitespace-pre-line">
          {teamAScore}
        </div>
      </div>

      {/* --- Team B Details --- */}
      <div className="flex items-center justify-between mt-1 py-1">
        <div className="flex items-center gap-3 overflow-hidden">
          <img src={teamBLogo} alt={teamB} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">{teamB}</span>
        </div>
        {/* Changed from span to div + whitespace-pre-line */}
        <div className="text-sm sm:text-base font-bold text-gray-900 whitespace-pre-line">
          {teamBScore}
        </div>
      </div>

      {/* --- Card Footer --- */}
      <div className="mt-3 pt-2 border-t border-gray-200/60 flex justify-center">
        <p className="text-xs sm:text-sm text-green-700 font-semibold truncate">{status}</p>
      </div>
    </div>
  );
};

export default MatchCard;
