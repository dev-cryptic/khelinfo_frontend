import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MatchCard from './MatchCard';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [cricketMatches, setCricketMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("https://khelinfo-bkd.onrender.com/api/teams");
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

  useEffect(() => {
    if (!teams.length) return;

    const fetchCricket = async () => {
      try {
        const response = await axios.get("https://khelinfo-bkd.onrender.com/api/livescores");
        const data = response.data.data || [];

        const matches = data.map(match => {
          const formatTeamScore = (teamId) => {
            const teamRuns = match.runs?.filter(r => r.team_id === teamId) || [];
            if (!teamRuns.length) return "0-0 (0.0)";
            

            // ✅ Always take last entry (latest innings only)
            const latest = teamRuns[teamRuns.length - 1];
            return `${latest.score}-${latest.wickets} (${latest.overs})`;
          };

          let runsNeeded = null;
          let oversRemaining = null;
          let innings = match.runs?.length > 1 ? 2 : 1;

          if ((match.type === "T20" || match.type === "ODI") && innings === 2) {
            const firstInning = match.runs[0];
            const secondInning = match.runs[1];

            runsNeeded = firstInning.score - secondInning.score;

            const totalBalls = (match.type === "T20" ? 20 : 50) * 6;

            // ✅ Correct overs to balls conversion
            const oversParts = secondInning.overs.toString().split(".");
            const overs = parseInt(oversParts[0], 10);
            const balls = oversParts[1] ? parseInt(oversParts[1], 10) : 0;

            const ballsBowled = overs * 6 + balls;
            oversRemaining = totalBalls - ballsBowled;
          }

          return {
            id: match.id,
            title: `${match.round || match.type} • ${match.starting_at.split("T")[0]}`,
            teamA: getTeamName(match.localteam_id),
            teamALogo: getTeamLogo(match.localteam_id),
            teamAScore: formatTeamScore(match.localteam_id),
            teamB: getTeamName(match.visitorteam_id),
            teamBLogo: getTeamLogo(match.visitorteam_id),
            teamBScore: formatTeamScore(match.visitorteam_id),
            status: match.note || match.status || "Match not started",
            innings,
            runsNeeded,
            oversRemaining,
            live: match.live,
          };
        });

        // Sort live matches first
        const sortedMatches = matches.sort((a, b) => {
          if (a.live && !b.live) return -1;
          if (!a.live && b.live) return 1;
          return new Date(b.title.split(" • ")[1]) - new Date(a.title.split(" • ")[1]);
        });

        setCricketMatches(sortedMatches.slice(0, 6));
      } catch (error) {
        console.error("Error fetching cricket matches:", error);
      }
    };

    fetchCricket();
    const interval = setInterval(fetchCricket, 10000);
    return () => clearInterval(interval);
  }, [teams]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
          params: {
            category: 'sports',
            lang: 'en',
            country: 'us',
            max: 10,
            apikey: '5eed3c7f648610ff6e1c1d92be607d30',
          },
        });

        const blogData = response.data.articles.map(article => ({
          title: article.title,
          description: article.description,
          image: article.image,
          url: article.url,
        }));

        setBlogs(blogData);
      } catch (error) {
        console.error('Error fetching sports blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const horizontalScrollContainer =
    'flex gap-4 overflow-x-auto pb-4 px-1 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]';

  return (
    <>
      {[{
        title: 'Cricket',
        to: '/cricket',
        gradient: 'bg-gradient-to-r from-yellow-50 to-red-50',
        badge: { label: 'Cricket', color: 'bg-yellow-100 text-yellow-800' },
        cards: cricketMatches,
      }, {
        title: 'Football',
        to: '/football',
        gradient: 'bg-gradient-to-r from-blue-50 to-green-50',
        badge: { label: 'Football', color: 'bg-blue-100 text-blue-800' },
        cards: [...Array(6)].map((_, i) => ({
          id: 200 + i,
          title: 'Final • UEFA Champions League 2025',
          teamA: 'Barcelona',
          teamALogo:
            'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
          teamAScore: '2',
          teamB: 'Chelsea',
          teamBLogo:
            'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/800px-Chelsea_FC.svg.png',
          teamBScore: '1',
          status: 'Barcelona won the UEFA Champions League',
        })),
      }, {
        title: 'Kabaddi',
        to: '/kabaddi',
        gradient: 'bg-gradient-to-r from-purple-50 to-pink-50',
        badge: { label: 'Kabaddi', color: 'bg-purple-100 text-purple-800' },
        cards: [...Array(6)].map((_, i) => ({
          id: 300 + i,
          title: `Match ${12 + i} • Pro Kabaddi League 2025`,
          teamA: 'Patna Pirates',
          teamALogo:
            'https://upload.wikimedia.org/wikipedia/en/8/80/Patna_Pirates_logo.png',
          teamAScore: `${30 + i * 2} pts`,
          teamB: 'U Mumba',
          teamBLogo:
            'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/U_Mumba_logo.svg/1200px-U_Mumba_logo.svg.png',
          teamBScore: `${28 + i} pts`,
          status:
            i === 2
              ? 'Match ongoing – 2 minutes left'
              : `Patna Pirates won by ${2 + i} points`,
        })),
      }].map((section, index) => (
        <section key={index} className="text-gray-600 body-font mb-5">
          <div className="container px-3 sm:px-5 py-0 mt-7 mx-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">{section.title}</h1>
              <Link
                to={section.to}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-sm font-medium text-blue-900 hover:text-blue-700 transition-colors duration-200"
              >
                More
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className={horizontalScrollContainer}>
              {section.cards.map(card => (
                <MatchCard
                  key={card.id}
                  {...card}
                  badge={section.badge}
                  gradient={section.gradient}
                  onClick={() => navigate(`/match/${card.id}`)}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-10 px-4 sm:px-8 lg:px-16 bg-white">
        <h2 className="text-2xl font-semibold text-center text-black mb-8">Trendy Sports Buzz</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition border border-transparent hover:border-black"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt="Blog Thumbnail"
                  className="w-full h-40 object-cover rounded-t-2xl"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {blog.title.length > 80 ? blog.title.slice(0, 77) + '...' : blog.title}
                </h3>
                <p className="text-sm text-gray-700">
                  {blog.description?.length > 100
                    ? blog.description.slice(0, 97) + '...'
                    : blog.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
