// import React from "react";

// const MatchCard = ({
//   title,
//   badge,
//   teamA,
//   teamALogo,
//   teamAScore,
//   teamB,
//   teamBLogo,
//   teamBScore,
//   status,
//   gradient,
//   onClick,
//   innings,
//   live,
//   leagueName,
//   type,
// }) => {
//   const normalizedStatus = status?.toLowerCase() || "";
//   const isPotentiallyLive = live && !normalizedStatus.includes("stump");

//   const maxOvers = type?.toUpperCase().includes("T20") ? 20 : 50;

//   const parseScore = (scoreStr) => {
//     if (!scoreStr) return { runs: 0, wickets: 0, overs: 0 };
//     const [runsWickets, oversPart] = scoreStr.split(" ");
//     const parts = (runsWickets || "0-0").split("-");
//     const runs = parseInt(parts[0], 10) || 0;
//     const wickets = parts.length > 1 ? (parseInt(parts[1], 10) || 0) : 0;
//     const overs = oversPart ? parseFloat(oversPart.replace(/[()]/g, "")) : 0;
//     return { runs, wickets: Math.min(wickets, 10), overs };
//   };

//   // --- START: DYNAMIC TEAM ASSIGNMENT ---
//   const score1 = parseScore(teamAScore);
//   const score2 = parseScore(teamBScore);

//   // Dynamically determine who batted first. The team with more overs has batted first.
//   // This makes the component robust regardless of the prop order (teamA vs teamB).
//   const isTeamABattingFirst = score1.overs >= score2.overs;

//   const firstInningsTeam = isTeamABattingFirst ? teamA : teamB;
//   const firstInningsScoreObj = isTeamABattingFirst ? score1 : score2;
//   const firstInningsLogo = isTeamABattingFirst ? teamALogo : teamBLogo;
//   const firstInningsRawScore = isTeamABattingFirst ? teamAScore : teamBScore;

//   const secondInningsTeam = isTeamABattingFirst ? teamB : teamA;
//   const secondInningsScoreObj = isTeamABattingFirst ? score2 : score1;
//   const secondInningsLogo = isTeamABattingFirst ? teamBLogo : teamALogo;
//   const secondInningsRawScore = isTeamABattingFirst ? teamBScore : teamAScore;
//   // --- END: DYNAMIC TEAM ASSIGNMENT ---

//   let displayCenter = "";
//   let matchHasConcluded = false;

//   // --- START: UPDATED LOGIC USING DYNAMIC TEAMS ---
//   if (normalizedStatus.includes("finish") || normalizedStatus.includes("ended") || normalizedStatus.includes("result")) {
//     matchHasConcluded = true;
//     if (firstInningsScoreObj.runs > secondInningsScoreObj.runs) displayCenter = `${firstInningsTeam} won the match`;
//     else if (secondInningsScoreObj.runs > firstInningsScoreObj.runs) displayCenter = `${secondInningsTeam} won the match`;
//     else displayCenter = 'Match Drawn';
//   }
//   else if (
//     isPotentiallyLive &&
//     (firstInningsScoreObj.wickets >= 10 || firstInningsScoreObj.overs >= maxOvers) &&
//     secondInningsScoreObj.overs === 0 && secondInningsScoreObj.runs === 0
//   ) {
//     displayCenter = `${secondInningsTeam} need ${firstInningsScoreObj.runs + 1} to win`;
//   }
//   else if (innings === 2 && isPotentiallyLive) {
//     const runsNeeded = Math.max(firstInningsScoreObj.runs - secondInningsScoreObj.runs + 1, 0);
//     const ballsBowled = Math.floor(secondInningsScoreObj.overs) * 6 + Math.round((secondInningsScoreObj.overs % 1) * 10);
//     const totalBalls = maxOvers * 6;
//     const ballsRemaining = Math.max(totalBalls - ballsBowled, 0);

//     if (secondInningsScoreObj.runs > firstInningsScoreObj.runs) {
//       displayCenter = `${secondInningsTeam} won the match`;
//       matchHasConcluded = true;
//     }
//     else if (secondInningsScoreObj.wickets >= 10 || ballsRemaining <= 0) {
//       matchHasConcluded = true;
//       if (firstInningsScoreObj.runs > secondInningsScoreObj.runs) {
//         displayCenter = `${firstInningsTeam} won the match`;
//       } else {
//         displayCenter = 'Match Tied';
//       }
//     }
//     else {
//       displayCenter = `${secondInningsTeam} needs ${runsNeeded} runs from ${ballsRemaining} balls`;
//     }
//   }
//   else if (innings === 1 && isPotentiallyLive) {
//     displayCenter = `${firstInningsTeam} is batting`;
//   }
//   else if (normalizedStatus.includes("stump")) {
//     displayCenter = status;
//     matchHasConcluded = true;
//   } else if (normalizedStatus.includes("upcoming")) {
//     displayCenter = 'Match not started';
//     matchHasConcluded = true;
//   } else {
//     displayCenter = status || 'Match info unavailable';
//   }
//   // --- END: UPDATED LOGIC ---

//   const isLive = isPotentiallyLive && !matchHasConcluded;
//   const statusColor = isLive ? "text-red-600" : "text-gray-800";

//   return (
//     <button
//       className={`flex-shrink-0 w-[280px] sm:w-[320px] p-4 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left ${gradient}`}
//       onClick={onClick}
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center mb-3">
//         <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badge?.color || "bg-gray-300 text-gray-700"}`}>
//           {type || 'Match'}
//         </span>
//         <span className="text-xs text-gray-500 font-medium truncate">
//           {title || 'Unknown Series'} • {leagueName}
//         </span>
//       </div>

//       {/* Team who Batted First */}
//       <div className="flex items-center justify-between mt-2 py-1">
//         <div className="flex items-center gap-3 overflow-hidden">
//           <img
//             src={firstInningsLogo || "https://placehold.co/40x40/EBF4FF/333333?text=A"}
//             alt={firstInningsTeam || "Team A"}
//             className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
//           />
//           <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">
//             {firstInningsTeam || "Team A"}
//           </span>
//         </div>
//         <div className="text-sm sm:text-base font-bold text-gray-900">
//           {firstInningsRawScore || ""}
//         </div>
//       </div>

//       {/* Team who Batted Second */}
//       <div className="flex items-center justify-between mt-1 py-1">
//         <div className="flex items-center gap-3 overflow-hidden">
//           <img
//             src={secondInningsLogo || "https://placehold.co/40x40/FFF0F0/333333?text=B"}
//             alt={secondInningsTeam || "Team B"}
//             className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
//           />
//           <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">
//             {secondInningsTeam || "Team B"}
//           </span>
//         </div>
//         <div className="text-sm sm:text-base font-bold text-gray-900">
//           {secondInningsRawScore || ""}
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between min-h-[24px]">
//         <div className="flex-shrink-0 w-12 text-left">
//           {isLive && (
//             <p className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-red-600">
//               <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
//               {'Live'}
//             </p>
//           )}
//         </div>
//         <p className={`flex-1 text-center text-xs sm:text-sm font-semibold ${statusColor}`}>
//           {displayCenter}
//         </p>
//         <div className="w-12"></div>
//       </div>
//     </button>
//   );
// };

// export default MatchCard;




























import React from "react";

// This component shows "2nd Inn:" for Test/multi-day and "SO:" for limited-overs.
const ScoreDisplay = ({ score, type }) => {
    if (!score) return null;
    const [mainScore, secondScore] = score.split('&').map(s => s.trim());

    const getPrefix = (matchType) => {
        if (!matchType) return '';
        const upperType = matchType.toUpperCase();

        if (upperType === 'TEST' || upperType.includes('DAY')) {
            return '2nd Inn: ';
        }
        
        if (upperType.includes('T20') || upperType.includes('ODI')) {
            return 'SO: ';
        }

        return '';
    };

    return (
        <div className="text-right">
            {mainScore && <p className="text-sm sm:text-base font-bold text-gray-900">{mainScore}</p>}
            {secondScore && (
                <p className="text-xs font-semibold text-gray-600 mt-0.5">
                    {getPrefix(type)}{secondScore}
                </p>
            )}
        </div>
    );
};


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
    note,
}) => {
    const normalizedStatus = status?.toLowerCase() || "";
    const normalizedNote = note?.toLowerCase() || "";

    const isPotentiallyLive = live && !normalizedStatus.includes("stump");

    let displayCenter = "";
    let matchHasConcluded = false;

    let topTeam = { name: teamA, logo: teamALogo, score: teamAScore };
    let bottomTeam = { name: teamB, logo: teamBLogo, score: teamBScore };


    if (type === 'Test' || type?.toUpperCase().includes('DAY')) {
        // Test match logic (unchanged, order is fixed as provided)
        const parseTestScore = (scoreStr) => {
            if (!scoreStr) return { runs1: 0, runs2: 0, totalRuns: 0 };
            const parts = scoreStr.split('&').map(s => s.trim());
            const runs1 = parseInt(parts[0].split('-')[0], 10) || 0;
            let runs2 = 0;
            if (parts.length > 1) {
                runs2 = parseInt(parts[1].split('-')[0], 10) || 0;
            }
            return { runs1, runs2, totalRuns: runs1 + runs2 };
        };

        if (isPotentiallyLive) {
            const scoreA = parseTestScore(teamAScore);
            const scoreB = parseTestScore(teamBScore);
            switch (innings) {
                case 1: displayCenter = `${teamA} is batting`; break;
                case 2:
                    const trailBy = scoreA.runs1 - scoreB.runs1;
                    displayCenter = trailBy > 0 ? `${teamB} trails by ${trailBy} runs` : `${teamB} leads by ${-trailBy} runs`;
                    break;
                case 3:
                    const leadBy = (scoreA.totalRuns - scoreB.runs1);
                    displayCenter = `${teamA} leads by ${leadBy} runs`;
                    break;
                case 4:
                    const target = scoreA.totalRuns + 1;
                    const runsNeeded = target - scoreB.totalRuns;
                    if (runsNeeded <= 0) {
                        displayCenter = `${teamB} won`;
                        matchHasConcluded = true;
                    } else {
                        displayCenter = `${teamB} needs ${runsNeeded} runs to win`;
                    }
                    break;
                default: displayCenter = status;
            }
        } else {
            displayCenter = status;
            if (!isPotentiallyLive) matchHasConcluded = true;
        }

    } else {
        // T20/ODI Logic
        const maxOvers = type?.toUpperCase().includes("T20") ? 20 : 50;
        const parseScore = (scoreStr) => {
             if (!scoreStr) return { runs: 0, wickets: 0, overs: 0 };
             // This regex handles scores like "181-5 (20)" and also just "181-5"
             const scoreMatch = scoreStr.match(/(\d+)-(\d+)(?:\s*\((\d+\.?\d*)\))?/);
             if (!scoreMatch) return { runs: 0, wickets: 0, overs: 0 };

             const runs = parseInt(scoreMatch[1], 10) || 0;
             const wickets = parseInt(scoreMatch[2], 10) || 0;
             const overs = parseFloat(scoreMatch[3]) || 0;
             return { runs, wickets: Math.min(wickets, 10), overs };
        };

        const getSuperOverRuns = (scoreStr) => {
            if (!scoreStr || !scoreStr.includes('&')) return -1;
            const soPart = scoreStr.split('&')[1].trim();
            const runs = parseInt(soPart.split('-')[0], 10);
            return isNaN(runs) ? -1 : runs;
        };
        
        const score1 = parseScore(teamAScore);
        const score2 = parseScore(teamBScore);

        // --- CORRECTED LOGIC to determine first batting team ---
        let isTeamABattingFirst;
        if (innings === 1) {
            // In the first innings, the team with more overs is batting. 
            // This correctly identifies the batting team even if their score is 0.
            isTeamABattingFirst = score1.overs >= score2.overs;
        } else { // innings is 2 or match is over
            // In the second innings or later, the team with more overs batted first.
            isTeamABattingFirst = score1.overs >= score2.overs;
        }
        
        if (!isTeamABattingFirst) {
            topTeam = { name: teamB, logo: teamBLogo, score: teamBScore };
            bottomTeam = { name: teamA, logo: teamALogo, score: teamAScore };
        }

        const firstInningsTeam = isTeamABattingFirst ? teamA : teamB;
        const firstInningsScoreObj = isTeamABattingFirst ? score1 : score2;
        const secondInningsTeam = isTeamABattingFirst ? teamB : teamA;
        const secondInningsScoreObj = isTeamABattingFirst ? score2 : score1;
        
        const teamASoRuns = getSuperOverRuns(teamAScore);
        const teamBSoRuns = getSuperOverRuns(teamBScore);
        const isSuperOverFinishedByScore = teamASoRuns !== -1 && teamBSoRuns !== -1;

        if (isSuperOverFinishedByScore || normalizedStatus.includes("finish") || normalizedStatus.includes("ended") || normalizedStatus.includes("result")) {
            matchHasConcluded = true;
            if (firstInningsScoreObj.runs === secondInningsScoreObj.runs) {
                if (teamASoRuns > teamBSoRuns) displayCenter = `${teamA} won the Super Over`;
                else if (teamBSoRuns > teamASoRuns) displayCenter = `${teamB} won the Super Over`;
                else {
                    if (note?.toUpperCase().includes(teamA.toUpperCase())) displayCenter = `${teamA} won the Super Over`;
                    else if (note?.toUpperCase().includes(teamB.toUpperCase())) displayCenter = `${teamB} won the Super Over`;
                    else displayCenter = 'Match Tied';
                }
            } else {
                const winningTeam = firstInningsScoreObj.runs > secondInningsScoreObj.runs ? firstInningsTeam : secondInningsTeam;
                displayCenter = `${winningTeam} won the match`;
            }
        } else if (normalizedNote.includes("super over in progress")) {
            displayCenter = note;
            matchHasConcluded = true;
        } else if (isPotentiallyLive && (firstInningsScoreObj.wickets >= 10 || firstInningsScoreObj.overs >= maxOvers) && secondInningsScoreObj.overs === 0 && secondInningsScoreObj.runs === 0) {
            displayCenter = `${secondInningsTeam} need ${firstInningsScoreObj.runs + 1} to win`;
        } else if (innings === 2 && isPotentiallyLive) {
            const runsNeeded = Math.max(firstInningsScoreObj.runs - secondInningsScoreObj.runs + 1, 0);
            const ballsBowled = Math.floor(secondInningsScoreObj.overs) * 6 + Math.round((secondInningsScoreObj.overs % 1) * 10);
            const totalBalls = maxOvers * 6;
            const ballsRemaining = Math.max(totalBalls - ballsBowled, 0);
            
            if (secondInningsScoreObj.runs > firstInningsScoreObj.runs) {
                displayCenter = `${secondInningsTeam} won the match`;
                matchHasConcluded = true;
            } else if (secondInningsScoreObj.wickets >= 10 || ballsRemaining <= 0) {
                matchHasConcluded = true;
                displayCenter = (firstInningsScoreObj.runs > secondInningsScoreObj.runs) ? `${firstInningsTeam} won the match` : 'Match Tied';
            } else {
                displayCenter = `${secondInningsTeam} needs ${runsNeeded} runs from ${ballsRemaining} balls`;
            }
        } else if (innings === 1 && isPotentiallyLive) {
            displayCenter = `${firstInningsTeam} is batting`;
        } else {
            displayCenter = status || 'Match info unavailable';
            if (!isPotentiallyLive) matchHasConcluded = true;
        }
    }

    const isLive = isPotentiallyLive && !matchHasConcluded;
    const statusColor = isLive || normalizedNote.includes("super over") ? "text-red-600" : "text-gray-800";

    return (
        <button
            className={`flex-shrink-0 w-[280px] sm:w-[320px] p-4 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left ${gradient}`}
            onClick={onClick}
        >
            <div className="flex justify-between items-center mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badge?.color || "bg-gray-300 text-gray-700"}`}>
                    {type || 'Match'}
                </span>
                <span className="text-xs text-gray-500 font-medium truncate">
                    {title || 'Unknown Series'} • {leagueName}
                </span>
            </div>

            <div className="flex items-center justify-between mt-2 py-1">
                <div className="flex items-center gap-3 overflow-hidden">
                    <img src={topTeam.logo || "https://placehold.co/40x40/EBF4FF/333333?text=A"} alt={topTeam.name || "Team A"} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
                    <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">{topTeam.name || "Team A"}</span>
                </div>
                <ScoreDisplay score={topTeam.score} type={type} />
            </div>

            <div className="flex items-center justify-between mt-1 py-1">
                <div className="flex items-center gap-3 overflow-hidden">
                    <img src={bottomTeam.logo || "https://placehold.co/40x40/FFF0F0/333333?text=B"} alt={bottomTeam.name || "Team B"} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
                    <span className="text-sm sm:text-base font-semibold text-gray-800 truncate">{bottomTeam.name || "Team B"}</span>
                </div>
                <ScoreDisplay score={bottomTeam.score} type={type} />
            </div>

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


