import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the API URL from environment variables
const CRICKET_API_URL = import.meta.env.VITE_CRICKET_API_URL;

const Cricket = () => {
  const [blogs, setBlogs] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState({}); // store teams in dictionary

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://api.webz.io/newsApiLite?token=33bef10f-7f07-432b-a694-320d8b17ba67&q=cricket"
        );

        if (response.data.posts && response.data.posts.length > 0) {
          const blogData = response.data.posts.map((post) => ({
            url: post.url,
            image: post.thread?.main_image,
            title: post.title,
            description: post.text,
          }));
          setBlogs(blogData);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Fetch teams and matches with debugging
  useEffect(() => {
    const fetchTeamsAndMatches = async () => {
      try {
        const [teamsRes, matchesRes] = await Promise.all([
          axios.get(`${CRICKET_API_URL}/teams`),
          axios.get(`${CRICKET_API_URL}/livescores`),
        ]);

        const teamList = teamsRes.data.data || [];
        const teamMap = teamList.reduce((acc, team) => {
          acc[team.id] = team;
          return acc;
        }, {});
        
        console.log("Team Map Created:", teamMap);
        setTeams(teamMap);

        const liveMatches = matchesRes.data.data || [];
        const formattedMatches = liveMatches.map((match) => {
          const localTeam = teamMap[match.localteam_id];
          const visitorTeam = teamMap[match.visitorteam_id];

          if (!localTeam) {
            console.warn(
              `Local team ID not found in map: ${match.localteam_id}`,
              "Match:", match
            );
          }
          if (!visitorTeam) {
            console.warn(
              `Visitor team ID not found in map: ${match.visitorteam_id}`,
              "Match:", match
            );
          }

          return {
            id: match.id,
            teamA: localTeam?.name || `Team ${match.localteam_id}`,
            teamALogo: localTeam?.image_path || "",
            teamB: visitorTeam?.name || `Team ${match.visitorteam_id}`,
            teamBLogo: visitorTeam?.image_path || "",
            status: match.live ? "Live" : match.note || match.status,
            time: new Date(match.starting_at).toLocaleString("en-IN", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
          };
        });

        setMatches(formattedMatches);
      } catch (error) {
        console.error("Error fetching teams/matches:", error);
      }
    };

    fetchTeamsAndMatches();
  }, []);

  const navItems = [
    { label: "Fixtures", path: "/fixtures" },
    { label: "News", path: "/news" },
    { label: "Teams", path: "/teams" },
    { label: "Rankings", path: "/rankings" },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex flex-col items-center">
          <nav className="w-full flex flex-wrap justify-around sm:justify-around text-sm sm:text-base font-medium">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-black hover:text-blue-800 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Match Cards */}
      <section className="py-10 px-4 sm:px-8 lg:px-16">
        <h2 className="text-2xl font-semibold text-center text-black mb-8">
          Matches
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white shadow-md rounded-2xl p-5 border-l-4 hover:border-blue-800 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-2">
                {/* Team A - Added min-w-0 and truncate */}
                <div className="flex items-center gap-2 min-w-0">
                  {match.teamALogo && (
                    <img
                      src={match.teamALogo}
                      alt={match.teamA}
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                  )}
                  <span className="text-lg font-semibold truncate">{match.teamA}</span>
                </div>
                
                <span className="text-sm font-semibold text-gray-500 px-2">vs</span>
                
                {/* Team B - Added min-w-0 and truncate */}
                <div className="flex items-center gap-2 min-w-0">
                  {match.teamBLogo && (
                    <img
                      src={match.teamBLogo}
                      alt={match.teamB}
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                  )}
                  <span className="text-lg font-semibold truncate">{match.teamB}</span>
                </div>
              </div>

              <div
                className={`text-sm font-medium ${
                  match.status === "Live"
                    ? "text-red-600 animate-pulse"
                    : "text-gray-600"
                }`}
              >
                {match.status}
              </div>
              <div className="text-sm text-gray-600">{match.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-10 px-4 sm:px-8 lg:px-16 bg-white">
        <h2 className="text-2xl font-semibold text-center text-black mb-8">
          Latest Cricket Blogs
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">
              No blogs available at the moment.
            </p>
          ) : (
            blogs.map((blog, index) => (
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
                    alt={blog.title || "Blog Thumbnail"}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {blog.title
                      ? blog.title.length > 80
                        ? blog.title.slice(0, 77) + "..."
                        : blog.title
                      : "Untitled"}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {blog.description
                      ? blog.description.length > 100
                        ? blog.description.slice(0, 97) + "..."
                        : blog.description
                      : "No description available."}
                  </p>
                </div>
              </a>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Cricket;