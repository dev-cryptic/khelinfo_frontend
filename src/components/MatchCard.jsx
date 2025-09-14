import React from 'react';

function MatchCard({
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
}) {
  const badgeClass =
    'ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap';
  const cardBase =
    'min-w-[270px] sm:min-w-[300px] bg-white shadow-md rounded-xl border border-gray-200 p-4 transition-all duration-200 transform hover:scale-[1.005] hover:shadow-sm';

  return (
    <div className={`${cardBase} ${gradient}`} onClick={onClick}>
      <div className="text-[10px] sm:text-xs flex justify-between text-gray-500 mb-4 items-center">
        <span className="truncate w-[70%]">{title}</span>
        <span className={`${badgeClass} ${badge?.color}`}>{badge?.label}</span>
      </div>

      <div className="space-y-2 sm:space-y-2">
        {/* Team A */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 sm:gap-2">
            <img src={teamALogo} alt={teamA} className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-semibold text-gray-800 text-sm">{teamA}</span>
          </div>
          <span className="font-bold text-gray-800 text-sm">{teamAScore}</span>
        </div>

        {/* Team B */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 sm:gap-2">
            <img src={teamBLogo} alt={teamB} className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-semibold text-gray-800 text-sm">{teamB}</span>
          </div>
          <span className="font-bold text-gray-800 text-sm">{teamBScore}</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm mt-2 font-medium truncate text-gray-700">
        {status}
      </p>
    </div>
  );
}

export default MatchCard;
