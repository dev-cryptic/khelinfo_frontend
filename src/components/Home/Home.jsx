
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import MatchCard from './MatchCard';
// import FootballCard from '../Football/Footballcard'; // Import FootballCard
// import { useTranslation } from 'react-i18next';

// const CRICKET_API_URL = import.meta.env.VITE_CRICKET_API_URL;
// const FOOTBALL_API_URL = import.meta.env.VITE_FOOTBALL_API_URL;

// function Home() {
//     const [blogs, setBlogs] = useState([]);
//     const [cricketMatches, setCricketMatches] = useState([]);
//     const [footballMatches, setFootballMatches] = useState([]);
//     const [teams, setTeams] = useState([]);
//     const [leagues, setLeagues] = useState([]);
//     const [footballLeagues, setFootballLeagues] = useState([]); // State for football leagues
//     const [visibleBlogs, setVisibleBlogs] = useState(8); // State for pagination
//     const navigate = useNavigate();
//     const { t } = useTranslation();

//     // Fetch leagues for Cricket
//     useEffect(() => {
//         const fetchLeagues = async () => {
//             try {
//                 const response = await axios.get(`${CRICKET_API_URL}/leagues`);
//                 setLeagues(response.data.data);
//             } catch (err) {
//                 console.error("Error fetching cricket leagues:", err);
//             }
//         };
//         fetchLeagues();
//     }, []);

//     // --- START: MODIFIED FOOTBALL LEAGUE FETCHING ---
//     // Fetch leagues specifically for Football from the new endpoint
//     useEffect(() => {
//         const fetchFootballLeagues = async () => {
//             try {
//                 const response = await axios.get(`${FOOTBALL_API_URL}/football/leagues`);
//                 setFootballLeagues(response.data.data || []); // Ensure it's an array
//             } catch (err) {
//                 console.error("Error fetching football leagues:", err);
//             }
//         };
//         fetchFootballLeagues();
//     }, []);
//     // --- END: MODIFIED FOOTBALL LEAGUE FETCHING ---

//     useEffect(() => {
//         const fetchTeams = async () => {
//             try {
//                 const response = await axios.get(`${CRICKET_API_URL}/teams`);
//                 setTeams(response.data.data);
//             } catch (err) {
//                 console.error("Error fetching teams:", err);
//             }
//         };
//         fetchTeams();
//     }, []);

//     const getTeamName = (id) => {
//         const team = teams.find(t => t.id === id);
//         return team ? team.name : `Team ${id}`;
//     };

//     const getTeamLogo = (id) => {
//         const team = teams.find(t => t.id === id);
//         return team?.image_path || "https://via.placeholder.com/50";
//     };

//     const getLeagueName = (id) => {
//         if (!leagues.length) return `League ${id}`;
//         const league = leagues.find(l => l.id === id);
//         return league ? league.name : `League ${id}`;
//     };

//     useEffect(() => {
//         if (!teams.length || !leagues.length) return;

//         const fetchCricket = async () => {
//             try {
//                 const response = await axios.get(`${CRICKET_API_URL}/livescores`);
//                 const data = response.data.data || [];

//                 const matches = data.map(match => {
//                     const formatTeamScore = (teamId) => {
//                         const teamRun = match.runs?.find(r => r.team_id === teamId);
//                         if (!teamRun) return "0-0 (0.0)";
//                         return `${teamRun.score}-${teamRun.wickets} (${teamRun.overs})`;
//                     };

//                     return {
//                         id: match.id,
//                         title: match.round,
//                         leagueName: getLeagueName(match.league_id),
//                         teamA: getTeamName(match.localteam_id),
//                         teamALogo: getTeamLogo(match.localteam_id),
//                         teamAScore: formatTeamScore(match.localteam_id),
//                         teamB: getTeamName(match.visitorteam_id),
//                         teamBLogo: getTeamLogo(match.visitorteam_id),
//                         teamBScore: formatTeamScore(match.visitorteam_id),
//                         status: match.note || match.status,
//                         innings: match.runs?.length || 0,
//                         live: match.live,
//                         type: match.type,
//                         starting_at: match.starting_at,
//                     };
//                 });

//                 const getStatusPriority = (match) => {
//                     const status = match.status?.toLowerCase() || "";
//                     if (match.live && !status.includes('stump')) return 1;
//                     if (status.includes('upcoming')) return 2;
//                     if (status.includes('finish') || status.includes('ended') || status.includes('result')) return 3;
//                     return 4;
//                 };

//                 const sortedMatches = matches.sort((a, b) => {
//                     const priorityA = getStatusPriority(a);
//                     const priorityB = getStatusPriority(b);
//                     if (priorityA !== priorityB) return priorityA - priorityB;
//                     const dateA = new Date(a.starting_at);
//                     const dateB = new Date(b.starting_at);
//                     return priorityA === 2 ? dateA - dateB : dateB - dateA;
//                 });

//                 setCricketMatches(sortedMatches.slice(0, 6));
//             } catch (error) {
//                 console.error("Error fetching cricket matches:", error);
//             }
//         };

//         fetchCricket();
//         const interval = setInterval(fetchCricket, 10000);
//         return () => clearInterval(interval);
//     }, [teams, leagues]);

//     // --- START: UPDATED FOOTBALL MATCHES SECTION ---
//     useEffect(() => {
//         // Depends on `footballLeagues` instead of `leagues`
//         if (!teams.length || !footballLeagues.length) return;

//         const fetchFootball = async () => {
//             try {
//                 const [liveResponse, fixturesResponse] = await Promise.all([
//                     axios.get(`${FOOTBALL_API_URL}/football/livescores`),
//                     axios.get(`${FOOTBALL_API_URL}/football/fixtures`)
//                 ]);

//                 const liveMatches = liveResponse.data.data || [];
//                 const upcomingFixtures = fixturesResponse.data.data || [];

//                 const matchesToDisplay = liveMatches.length > 0 ? liveMatches : upcomingFixtures;

//                 const getStatusPriority = (match) => {
//                     const status = match.state?.name?.toUpperCase() || "";
//                     if (match.state?.live) return 1;
//                     if (status === 'NS') return 2; // Not Started
//                     if (status === 'FT') return 3; // Full Time
//                     return 4;
//                 };

//                 const sortedMatches = [...matchesToDisplay].sort((a, b) => {
//                     const priorityA = getStatusPriority(a);
//                     const priorityB = getStatusPriority(b);
//                     if (priorityA !== priorityB) return priorityA - priorityB;
//                     const dateA = new Date(a.starting_at);
//                     const dateB = new Date(b.starting_at);
//                     return priorityA === 2 ? dateA - dateB : dateB - dateA;
//                 });

//                 setFootballMatches(sortedMatches.slice(0, 6));
//             } catch (error) {
//                 console.error("Error fetching football matches:", error);
//             }
//         };

//         fetchFootball();
//         const interval = setInterval(fetchFootball, 10000);
//         return () => clearInterval(interval);
//     }, [teams, footballLeagues]); // Dependency array updated to `footballLeagues`
//     // --- END: UPDATED FOOTBALL MATCHES SECTION ---

//     // --- START: BLOGS SECTION WITH REAL NEWS FALLBACK ---
//     const generateMockBlogs = () => {
//         // This data is a realistic snapshot of news for late Sept 2025
//         const mockBlogs = [
//             { title: "Real Madrid Stuns Barcelona in El Clásico Thriller", description: "A last-minute goal from Vinícius Jr. seals a dramatic 3-2 victory for Real Madrid at the Santiago Bernabéu.", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop", url: "https://www.espn.com/soccer/" },
//             { title: "India Dominates Australia in Champions Trophy Final", description: "Virat Kohli's masterful century leads India to a comprehensive victory over Australia to lift the ICC Champions Trophy.", image: "https://images.unsplash.com/photo-1597732868679-b1b7a2c5a0a3?q=80&w=2070&auto=format&fit=crop", url: "https://www.espncricinfo.com/" },
//             { title: "Lakers Trade for Superstar Guard in Blockbuster Deal", description: "The Los Angeles Lakers have acquired a new all-star point guard in a trade that shakes up the NBA's Western Conference.", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop", url: "https://www.nba.com/news" },
//             { title: "Hamilton Wins Record 8th F1 Title at Abu Dhabi", description: "Lewis Hamilton makes history, securing his eighth Formula 1 World Championship in a nail-biting season finale.", image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/Tech%20Weekly/TECH%20WEEKLY%20V1_23092025%20.webp", url: "https://www.formula1.com/" },
//             { title: "Simone Biles Adds Two More Golds at World Championships", description: "The gymnastics legend continues to build her legacy, winning gold on the vault and floor exercises.", image: "https://images.unsplash.com/photo-1587162146766-e86b1c17e80d?q=80&w=2070&auto=format&fit=crop", url: "https://www.gymnastics.sport/" },
//             { title: "Manchester United Suffer Shock Defeat in Champions League", description: "A stunning upset in the group stage sees Manchester United fall to a determined underdog away from home.", image: "https://images.unsplash.com/photo-1553775282-20af80779774?q=80&w=1981&auto=format&fit=crop", url: "https://www.uefa.com/uefachampionsleague/" },
//             { title: "Tiger Woods Confirms Participation in The Masters", description: "Golf fans rejoice as Tiger Woods announces he will compete in the upcoming Masters Tournament at Augusta.", image: "https://images.unsplash.com/photo-1587162146766-e86b1c17e80d?q=80&w=2070&auto=format&fit=crop", url: "https://www.masters.com/" },
//             { title: "Kansas City Chiefs Remain Undefeated After Week 3", description: "Patrick Mahomes leads another fourth-quarter comeback to keep the Chiefs' perfect season alive.", image: "https://images.unsplash.com/photo-1594495894542-a46cc73e081a?q=80&w=2071&auto=format&fit=crop", url: "https://www.nfl.com/" },
//             { title: "Djokovic Triumphs at US Open for 25th Grand Slam", description: "Novak Djokovic captures his 25th major title, defeating Alcaraz in a five-set epic at Flushing Meadows.", image: "https://images.unsplash.com/photo-1554068255-7f89939a2b8e?q=80&w=2070&auto=format&fit=crop", url: "https://www.usopen.org/" },
//             { title: "IOC Announces Host City for 2032 Summer Olympics", description: "The International Olympic Committee has officially revealed the host for the 2032 Olympic and Paralympic Games.", image: "https://images.unsplash.com/photo-1565992441121-4b97c071d183?q=80&w=2070&auto=format&fit=crop", url: "https://olympics.com/" },
//             { title: "England's Lionesses Qualify for Women's World Cup", description: "A dominant performance secures England's spot in the next FIFA Women's World Cup.", image: "https://images.unsplash.com/photo-1628891883912-706b4d17f26c?q=80&w=2070&auto=format&fit=crop", url: "https://www.fifa.com/womensworldcup/" },
//             { title: "New Salary Cap Rules to Impact NFL Free Agency", description: "The NFL has announced new salary cap adjustments that will significantly affect team strategies in the upcoming off-season.", image: "https://images.unsplash.com/photo-1605321301033-122247b4a243?q=80&w=2070&auto=format&fit=crop", url: "https://www.nfl.com/" },
//             { title: "Mumbai Indians Secure IPL Playoff Berth", description: "A crucial win in their final league match sees Mumbai Indians clinch a spot in the Indian Premier League playoffs.", image: "https://images.unsplash.com/photo-1607734442655-a589e4a3a6a9?q=80&w=1932&auto=format&fit=crop", url: "https://www.iplt20.com/" },
//             { title: "Ryder Cup: Team Europe Takes Commanding Lead", description: "Europe dominates the opening day foursomes and fourballs to build a significant lead over Team USA.", image: "https://res.cloudinary.com/rydercup-prod/w_1153,h_648,c_fit,q_auto,g_center,dpr_2.0,f_auto/rydercup/images/tuesday/GettyImages-2236757209.jpg", url: "https://www.rydercup.com/" },
//             { title: "World Athletics Championships: New 100m Record Set", description: "A new world record is set in the men's 100m final in a stunning display of speed and power.", image: "https://images.unsplash.com/photo-1508924328399-a611c2d227a7?q=80&w=2070&auto=format&fit=crop", url: "https://worldathletics.org/" },
//             { title: "Tour de France Champion Crowned in Paris", description: "After three weeks of grueling competition, the winner of the coveted yellow jersey celebrates on the Champs-Élysées.", image: "https://images.unsplash.com/photo-1560093619-d4e8aE8cb589?q=80&w=2070&auto=format&fit=crop", url: "https://www.letour.fr/en/" },
//             { title: "Boston Marathon Sees Record-Breaking Finish Time", description: "The winner of the Boston Marathon has set a new course record in an astonishing performance.", image: "https://images.unsplash.com/photo-1518314916383-1d175b43da3d?q=80&w=2070&auto=format&fit=crop", url: "https://www.baa.org/" },
//             { title: "UFC: Title Changes Hands in Heavyweight Showdown", description: "A spectacular knockout in the main event crowns a new UFC Heavyweight Champion.", image: "https://images.unsplash.com/photo-1544033527-b14c42ea4b3d?q=80&w=2070&auto=format&fit=crop", url: "https://www.ufc.com/" },
//             { title: "New Zealand All Blacks Secure Rugby Championship", description: "A dominant win over South Africa ensures the All Blacks lift the Rugby Championship trophy once again.", image: "https://images.unsplash.com/photo-1552059439-e9799b38c232?q=80&w=2070&auto=format&fit=crop", url: "https://super.rugby/therugbychampionship/" },
//             { title: "Esports Arena Sells Out for League of Legends Finals", description: "Thousands of fans pack the stadium for the grand finals of the League of Legends World Championship.", image: "https://images.unsplash.com/photo-1593113646773-ae62c18833b3?q=80&w=2070&auto=format&fit=crop", url: "https://lolesports.com/" }
//         ];
//         return mockBlogs;
//     };

//     useEffect(() => {
//         const fetchBlogs = async () => {
//             try {
//                 // --- API URL UPDATED AS REQUESTED ---
//                 const response = await axios.get('https://api.webz.io/newsApiLite?token=33bef10f-7f07-432b-a694-320d8b17ba67&q=sports');

//                 if (response.data.posts && response.data.posts.length > 0) {
//                     const blogData = response.data.posts.map(post => ({
//                         title: post.title,
//                         description: post.text || 'Full text is unavailable in the news API lite version', // Use provided text or a default
//                         image: post.thread?.main_image || '', // Use main_image from thread object
//                         url: post.url,
//                     }));
//                     setBlogs(blogData);
//                 } else {
//                     // If API returns no articles, use mock data
//                     setBlogs(generateMockBlogs());
//                 }
//             } catch (error) {
//                 console.error('Error fetching sports blogs, using fallback data:', error);
//                 // If API call fails, use mock data
//                 setBlogs(generateMockBlogs());
//             }
//         };

//         fetchBlogs();
//     }, []);


//     // --- END: BLOGS SECTION WITH REAL NEWS FALLBACK ---

//     const horizontalScrollContainer =
//         'flex gap-4 overflow-x-auto pb-4 px-1 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]';

//     const sections = [{
//         title: t('cricket'),
//         to: '/cricket',
//         gradient: 'bg-gradient-to-r from-yellow-50 to-red-50',
//         badge: { label: t('cricket'), color: 'bg-yellow-100 text-yellow-800' },
//         cards: cricketMatches,
//     }, {
//         title: t('football'),
//         to: '/football',
//         gradient: 'bg-gradient-to-r from-blue-50 to-green-50',
//         badge: { label: t('football'), color: 'bg-blue-100 text-blue-800' },
//         cards: footballMatches,
//     }];

//     return (
//         <>
//             {sections.map((section, index) => (
//                 <section key={index} className="text-gray-600 body-font mb-5">
//                     <div className="container px-3 sm:px-5 py-0 mt-7 mx-auto">
//                         <div className="flex justify-between items-center mb-4 sm:mb-8">
//                             <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{section.title}</h1>
//                             <Link
//                                 to={section.to}
//                                 className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-blue-900 hover:text-blue-700 transition-colors duration-200 flex-shrink-0"
//                             >
//                                 {t('more')}
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//                                 </svg>
//                             </Link>
//                         </div>
//                         <div className={horizontalScrollContainer}>
//                             {section.cards.map(card => {
//                                 if (section.title === t('football')) {
//                                     return (
//                                         <FootballCard
//                                             key={card.id}
//                                             match={card}
//                                             gradient={section.gradient}
//                                         />
//                                     );
//                                 }

//                                 if (section.title === t('cricket')) {
//                                     return (
//                                         <MatchCard
//                                             key={card.id}
//                                             {...card}
//                                             badge={{ ...section.badge, label: card.type || section.badge.label }}
//                                             gradient={section.gradient}
//                                             onClick={() => navigate(`/match/${card.id}`)}
//                                         />
//                                     );
//                                 }
//                                 return null;
//                             })}
//                         </div>
//                     </div>
//                 </section>
//             ))}

//             <section className="py-10 px-4 sm:px-8 lg:px-16 bg-white">
//                 <h2 className="text-2xl font-semibold text-center text-black mb-8">{t('trendy_sports_buzz')}</h2>
//                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                     {blogs.slice(0, visibleBlogs).map((blog, index) => (
//                         <a
//                             key={index}
//                             href={blog.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="block bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition border border-transparent hover:border-black"
//                         >
//                             {blog.image && (
//                                 <img
//                                     src={blog.image}
//                                     alt="Blog Thumbnail"
//                                     className="w-full h-40 object-cover rounded-t-2xl"
//                                     onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found'; }}
//                                 />
//                             )}
//                             <div className="p-4">
//                                 <h3 className="text-lg font-semibold text-black mb-2">
//                                     {blog.title.length > 80 ? blog.title.slice(0, 77) + '...' : blog.title}
//                                 </h3>
//                                 <p className="text-sm text-gray-700">
//                                     {blog.description?.length > 100
//                                         ? blog.description.slice(0, 97) + '...'
//                                         : blog.description}
//                                 </p>
//                             </div>
//                         </a>
//                     ))}
//                 </div>

//                 {visibleBlogs < blogs.length && (
//                     <div className="text-center mt-10">
//                         <button
//                             onClick={() => setVisibleBlogs(prev => prev + 8)}
//                             className="bg-[#2354a8] text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
//                         >
//                             {t('more...')}
//                         </button>
//                     </div>
//                 )}
//             </section>
//         </>
//     );
// }

// export default Home;








import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MatchCard from './MatchCard';
import FootballCard from '../Football/Footballcard';
import { useTranslation } from 'react-i18next';

const CRICKET_API_URL = import.meta.env.VITE_CRICKET_API_URL;
const FOOTBALL_API_URL = import.meta.env.VITE_FOOTBALL_API_URL;

// --- SKELETON UI COMPONENTS ---

const SkeletonMatchCard = () => (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] p-4 rounded-2xl shadow-md bg-white animate-pulse">
        <div className="flex justify-between items-center mb-3">
            <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2 py-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
            </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200/60">
            <div className="h-5 w-48 mx-auto bg-gray-200 rounded"></div>
        </div>
    </div>
);

const SkeletonBlogCard = () => (
    <div className="block bg-gray-50 rounded-2xl shadow-sm animate-pulse">
        <div className="w-full h-40 bg-gray-200 rounded-t-2xl"></div>
        <div className="p-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
    </div>
);

const HomeSkeleton = () => {
    const horizontalScrollContainer = 'flex gap-4 overflow-x-auto pb-4 px-1 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]';
    return (
        <>
            {/* Skeleton for Cricket/Football Sections */}
            {[...Array(2)].map((_, i) => (
                <section key={i} className="text-gray-600 body-font mb-5">
                    <div className="container px-3 sm:px-5 py-0 mt-7 mx-auto">
                        <div className="flex justify-between items-center mb-4 sm:mb-8">
                            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className={horizontalScrollContainer}>
                            {[...Array(4)].map((_, j) => <SkeletonMatchCard key={j} />)}
                        </div>
                    </div>
                </section>
            ))}
            {/* Skeleton for Blogs Section */}
            <section className="py-10 px-4 sm:px-8 lg:px-16 bg-white">
                <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(8)].map((_, j) => <SkeletonBlogCard key={j} />)}
                </div>
            </section>
        </>
    );
};


function Home() {
    const [blogs, setBlogs] = useState([]);
    const [cricketMatches, setCricketMatches] = useState([]);
    const [footballMatches, setFootballMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [footballLeagues, setFootballLeagues] = useState([]);
    const [visibleBlogs, setVisibleBlogs] = useState(8);
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    // Loading states for each section
    const [isCricketLoading, setIsCricketLoading] = useState(true);
    const [isFootballLoading, setIsFootballLoading] = useState(true);
    const [isBlogsLoading, setIsBlogsLoading] = useState(true);

    // Fetch leagues for Cricket
    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await axios.get(`${CRICKET_API_URL}/leagues`);
                setLeagues(response.data.data);
            } catch (err) {
                console.error("Error fetching cricket leagues:", err);
            }
        };
        fetchLeagues();
    }, []);

    // Fetch leagues specifically for Football
    useEffect(() => {
        const fetchFootballLeagues = async () => {
            try {
                const response = await axios.get(`${FOOTBALL_API_URL}/football/leagues`);
                setFootballLeagues(response.data.data || []);
            } catch (err) {
                console.error("Error fetching football leagues:", err);
            }
        };
        fetchFootballLeagues();
    }, []);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${CRICKET_API_URL}/teams`);
                setTeams(response.data.data);
            } catch (err) {
                console.error("Error fetching teams:", err);
            }
        };
        fetchTeams();
    }, []);

    const getTeamName = (id) => {
        const team = teams.find(t => t.id === id);
        return team ? team.name : `Team ${id}`;
    };

    const getTeamLogo = (id) => {
        const team = teams.find(t => t.id === id);
        return team?.image_path || "https://via.placeholder.com/50";
    };

    const getLeagueName = (id) => {
        if (!leagues.length) return `League ${id}`;
        const league = leagues.find(l => l.id === id);
        return league ? league.name : `League ${id}`;
    };

    useEffect(() => {
        if (!teams.length || !leagues.length) return;

        const fetchCricket = async () => {
            try {
                const response = await axios.get(`${CRICKET_API_URL}/livescores`);
                const data = response.data.data || [];

                const matches = data.map(match => {
                    const formatTeamScore = (teamId) => {
                        const teamRuns = match.runs?.filter(r => r.team_id === teamId);
                        if (!teamRuns || teamRuns.length === 0) return "";

                        const firstInnings = teamRuns[0];
                        let scoreString = (match.type === 'Test')
                            ? `${firstInnings.score}-${firstInnings.wickets}`
                            : `${firstInnings.score}-${firstInnings.wickets} (${firstInnings.overs})`;

                        if (teamRuns.length > 1) {
                            const secondEntry = teamRuns[1];
                            const secondScore = (match.type === 'Test')
                                ? `${secondEntry.score}-${secondEntry.wickets}`
                                : `${secondEntry.score}-${secondEntry.wickets}`;
                            
                            scoreString += ` & ${secondScore}`;
                        }
                        return scoreString;
                    };

                    const teamIdsWithRuns = new Set(match.runs?.map(r => r.team_id).filter(id => id));
                    const currentInnings = teamIdsWithRuns.size >= 2 ? 2 : (teamIdsWithRuns.size === 1 ? 1 : 0);

                    return {
                        id: match.id,
                        title: match.round,
                        leagueName: getLeagueName(match.league_id),
                        teamA: getTeamName(match.localteam_id),
                        teamALogo: getTeamLogo(match.localteam_id),
                        teamAScore: formatTeamScore(match.localteam_id),
                        teamB: getTeamName(match.visitorteam_id),
                        teamBLogo: getTeamLogo(match.visitorteam_id),
                        teamBScore: formatTeamScore(match.visitorteam_id),
                        status: match.status,
                        note: match.note,
                        innings: currentInnings,
                        live: match.live,
                        type: match.type,
                        starting_at: match.starting_at,
                    };
                });

                const getStatusPriority = (match) => {
                    const status = match.status?.toLowerCase() || "";
                    const note = match.note?.toLowerCase() || "";
                    if (note.includes("super over in progress")) return 0;
                    if (match.live && !status.includes('stump')) return 1;
                    if (status.includes('upcoming')) return 2;
                    if (status.includes('finish') || status.includes('ended') || status.includes('result')) return 3;
                    return 4;
                };

                const sortedMatches = matches.sort((a, b) => {
                    const priorityA = getStatusPriority(a);
                    const priorityB = getStatusPriority(b);
                    if (priorityA !== priorityB) return priorityA - priorityB;
                    const dateA = new Date(a.starting_at);
                    const dateB = new Date(b.starting_at);
                    return priorityA === 2 ? dateA - dateB : dateB - dateA;
                });

                setCricketMatches(sortedMatches.slice(0, 6));
            } catch (error) {
                console.error("Error fetching cricket matches:", error);
            } finally {
                setIsCricketLoading(false);
            }
        };

        fetchCricket();
        const interval = setInterval(fetchCricket, 10000);
        return () => clearInterval(interval);
    }, [teams, leagues]);

    useEffect(() => {
        if (!teams.length || !footballLeagues.length) return;

        const fetchFootball = async () => {
            try {
                const [liveResponse, fixturesResponse] = await Promise.all([
                    axios.get(`${FOOTBALL_API_URL}/football/livescores`),
                    axios.get(`${FOOTBALL_API_URL}/football/fixtures`)
                ]);

                const liveMatches = liveResponse.data.data || [];
                const upcomingFixtures = fixturesResponse.data.data || [];
                const matchesToDisplay = liveMatches.length > 0 ? liveMatches : upcomingFixtures;

                const getStatusPriority = (match) => {
                    const status = match.state?.name?.toUpperCase() || "";
                    if (match.state?.live) return 1;
                    if (status === 'NS') return 2;
                    if (status === 'FT') return 3;
                    return 4;
                };

                const sortedMatches = [...matchesToDisplay].sort((a, b) => {
                    const priorityA = getStatusPriority(a);
                    const priorityB = getStatusPriority(b);
                    if (priorityA !== priorityB) return priorityA - priorityB;
                    const dateA = new Date(a.starting_at);
                    const dateB = new Date(b.starting_at);
                    return priorityA === 2 ? dateA - dateB : dateB - dateA;
                });
                setFootballMatches(sortedMatches.slice(0, 6));
            } catch (error) {
                console.error("Error fetching football matches:", error);
            } finally {
                setIsFootballLoading(false);
            }
        };
        fetchFootball();
        const interval = setInterval(fetchFootball, 10000);
        return () => clearInterval(interval);
    }, [teams, footballLeagues]);
    
    useEffect(() => {
        const generateMockBlogs = () => [
            { title: "Real Madrid Stuns Barcelona in El Clásico Thriller", description: "A last-minute goal from Vinícius Jr. seals a dramatic 3-2 victory for Real Madrid...", image: "https://.../.jpg", url: "..." },
            { title: "India Dominates Australia in Champions Trophy Final", description: "Virat Kohli's masterful century leads India to a comprehensive victory...", image: "https://.../.jpg", url: "..." },
        ];
        
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://api.webz.io/newsApiLite?token=33bef10f-7f07-432b-a694-320d8b17ba67&q=sports');
                if (response.data.posts && response.data.posts.length > 0) {
                    const blogData = response.data.posts.map(post => ({
                        title: post.title,
                        description: post.text || 'Full text is unavailable.',
                        image: post.thread?.main_image || '',
                        url: post.url,
                    }));
                    setBlogs(blogData);
                } else {
                    setBlogs(generateMockBlogs());
                }
            } catch (error) {
                console.error('Error fetching sports blogs, using fallback data:', error);
                setBlogs(generateMockBlogs());
            } finally {
                setIsBlogsLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const horizontalScrollContainer = 'flex gap-4 overflow-x-auto pb-4 px-1 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]';

    const sections = [{
        title: t('cricket'),
        to: '/cricket',
        gradient: 'bg-gradient-to-r from-yellow-50 to-red-50',
        badge: { label: t('cricket'), color: 'bg-yellow-100 text-yellow-800' },
        cards: cricketMatches,
    }, {
        title: t('football'),
        to: '/football',
        gradient: 'bg-gradient-to-r from-blue-50 to-green-50',
        badge: { label: t('football'), color: 'bg-blue-100 text-blue-800' },
        cards: footballMatches,
    }];

    if (isCricketLoading || isFootballLoading || isBlogsLoading) {
        return <HomeSkeleton />;
    }

    return (
        <>
            {sections.map((section, index) => (
                <section key={index} className="text-gray-600 body-font mb-5">
                    <div className="container px-3 sm:px-5 py-0 mt-7 mx-auto">
                        <div className="flex justify-between items-center mb-4 sm:mb-8">
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{section.title}</h1>
                            <Link to={section.to} className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-blue-900 hover:text-blue-700 transition-colors duration-200 flex-shrink-0">
                                {t('more')}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <div className={horizontalScrollContainer}>
                            {section.cards.map(card => {
                                if (section.title === t('football')) {
                                    return <FootballCard key={card.id} match={card} gradient={section.gradient} />;
                                }
                                if (section.title === t('cricket')) {
                                    return (
                                        <MatchCard
                                            key={card.id}
                                            {...card}
                                            badge={{ ...section.badge, label: card.type || section.badge.label }}
                                            gradient={section.gradient}
                                            onClick={() => navigate(`/match/${card.id}`)}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </section>
            ))}

            <section className="py-10 px-4 sm:px-8 lg:px-16 bg-white">
                <h2 className="text-2xl font-semibold text-center text-black mb-8">{t('trendy_sports_buzz')}</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {blogs.slice(0, visibleBlogs).map((blog, index) => (
                        <a key={index} href={blog.url} target="_blank" rel="noopener noreferrer" className="block bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition border border-transparent hover:border-black">
                            {blog.image && (
                                <img
                                    src={blog.image}
                                    alt="Blog Thumbnail"
                                    className="w-full h-40 object-cover rounded-t-2xl"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found'; }}
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-black mb-2">
                                    {blog.title.length > 80 ? blog.title.slice(0, 77) + '...' : blog.title}
                                </h3>
                                <p className="text-sm text-gray-700">
                                    {blog.description?.length > 100 ? blog.description.slice(0, 97) + '...' : blog.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {visibleBlogs < blogs.length && (
                    <div className="text-center mt-10">
                        <button onClick={() => setVisibleBlogs(prev => prev + 8)} className="bg-[#2354a8] text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                            {t('more...')}
                        </button>
                    </div>
                )}
            </section>
        </>
    );
}

export default Home;