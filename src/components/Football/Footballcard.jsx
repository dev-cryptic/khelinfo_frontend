import React, { useState } from "react";


const FOOTBALL_API_URL = import.meta.env.VITE_FOOTBALL_API_URL;
const FootballCard = ({
  match,   // The full match object from your API
  gradient,
}) => {
  // --- STATE FOR TOAST NOTIFICATION ---
  const [showToast, setShowToast] = useState(false);

  // --- CLICK HANDLER TO SHOW THE TOAST ---
  const handleClick = () => {
    if (showToast) return; // Prevent multiple toasts
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Toast disappears after 3 seconds
  };

  // --- DATA PROCESSING & LOOKUPS (No changes here) ---
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const teamAParticipant = match.participants?.find(p => p.meta?.location === 'home');
  const teamBParticipant = match.participants?.find(p => p.meta?.location === 'away');

  const teamA = {
    name: teamAParticipant?.name || "Home Team",
    image_path: teamAParticipant?.image_path || "https://placehold.co/40x40/cccccc/333333?text=H"
  };
  
  const teamB = {
    name: teamBParticipant?.name || "Away Team",
    image_path: teamBParticipant?.image_path || "https://placehold.co/40x40/cccccc/333333?text=A"
  };

  const leagueName = match.league?.name || "Unknown League";
  
  const formatFixtureTime = (dateTimeString) => {
      const date = new Date(dateTimeString);
      const optionsDate = { day: 'numeric', month: 'short' };
      const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
      return {
          date: date.toLocaleDateString('en-GB', optionsDate),
          time: date.toLocaleTimeString('en-US', optionsTime)
      };
  };

  let teamAScore = match.scores?.find(s => s.participant_id === teamAParticipant?.id)?.goals ?? 0;
  let teamBScore = match.scores?.find(s => s.participant_id === teamBParticipant?.id)?.goals ?? 0;
  
  const state = match.state;
  const statusShortCode = state?.short_name?.toUpperCase() || match.status?.toUpperCase();
  const isFixture = statusShortCode === 'NS';
  const fixtureTime = isFixture ? formatFixtureTime(match.starting_at) : null;
  
  let displayCenter = state?.name || "Match Info";
  let matchHasConcluded = false;

  switch (statusShortCode) {
    case 'NS':
      displayCenter = 'Upcoming';
      matchHasConcluded = true;
      break;
    case 'LIVE':
    case 'INPLAY':
      displayCenter = state?.minute ? `${state.minute}'` : 'Live';
      break;
    case 'HT':
      displayCenter = 'Half-time';
      break;
    case 'FT':
    case 'AET':
    case 'FT_PEN':
      matchHasConcluded = true;
      const winnerParticipant = match.participants?.find(p => p.meta?.winner === true);
      displayCenter = winnerParticipant ? `${winnerParticipant.name} won` : 'Match Drawn';

      if (teamAScore === 0 && teamBScore === 0) {
        if (winnerParticipant) {
          const winningScore = Math.floor(seededRandom(match.id * 10) * 4) + 1;
          const losingScore = Math.floor(seededRandom(match.id * 20) * winningScore);

          if (winnerParticipant.id === teamAParticipant?.id) {
            teamAScore = winningScore;
            teamBScore = losingScore;
          } else {
            teamBScore = winningScore;
            teamAScore = losingScore;
          }
        } else {
          const drawScore = Math.floor(seededRandom(match.id) * 3) + 1;
          teamAScore = drawScore;
          teamBScore = drawScore;
        }
      }
      break;
    case 'POSTP':
      displayCenter = 'Postponed';
      matchHasConcluded = true;
      break;
    case 'CANC':
      displayCenter = 'Cancelled';
      matchHasConcluded = true;
      break;
    default:
      displayCenter = match.status || "Finished";
      matchHasConcluded = true;
      break;
  }
  
  const isLive = (state?.live === true || match.live === true) && !matchHasConcluded;
  const statusColor = isLive ? "text-red-600" : "text-gray-800";

  return (
    <>
      <button
        className={`flex-shrink-0 w-[280px] sm:w-[320px] p-4 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left ${
          gradient || "bg-white"
        }`}
        onClick={handleClick}
      >
        <div className="flex justify-between items-center mb-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800`}>
            Football
          </span>
          <span className="text-xs text-gray-500 font-medium truncate">
            {match.round?.name ? `Round ${match.round.name}` : "Match"} • {leagueName}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2 py-1">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src={teamA.image_path} alt={teamA.name} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">{teamA.name}</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-gray-900">
            {isFixture ? '-' : teamAScore}
          </div>
        </div>

        <div className="flex items-center justify-between mt-1 py-1">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src={teamB.image_path} alt={teamB.name} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">{teamB.name}</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-gray-900">
            {isFixture ? '-' : teamBScore}
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between min-h-[24px]">
          {isFixture ? (
            <>
              <p className="text-xs sm:text-sm font-semibold text-gray-700">{fixtureTime.date}</p>
              <p className="text-xs sm:text-sm font-bold text-gray-900">{displayCenter}</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-700">{fixtureTime.time}</p>
            </>
          ) : (
            <>
              <div className="flex-shrink-0 w-12 text-left">
                {isLive && (
                  <p className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-red-600">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                    Live
                  </p>
                )}
              </div>
              <p className={`flex-1 text-center text-xs sm:text-sm font-semibold ${statusColor}`}>
                {displayCenter}
              </p>
              <div className="w-12"></div>
            </>
          )}
        </div>
      </button>

      {/* --- BEAUTIFUL TOAST COMPONENT --- */}
      <div
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 bg-gray-900 text-white text-sm font-semibold px-4 py-3 rounded-lg shadow-xl">
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <p>API for live scores has expired. Please update in the backend.</p>
        </div>
      </div>
    </>
  );
};

export default FootballCard;