import React, { useState, useEffect } from "react";
import axios from "axios";

const Fixtures = () => {
  const [gender, setGender] = useState("all");
  const [category, setCategory] = useState("All");
  const [fixtures, setFixtures] = useState([]);
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  const genders = ["all", "men", "women"];
  const categories = ["All", "International", "Domestic & Others", "T20 Leagues"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fixturesRes, teamsRes, leaguesRes] = await axios.all([
          axios.get("https://khelinfo-bkd.onrender.com/api/fixtures"),
          axios.get("https://khelinfo-bkd.onrender.com/api/teams"),
          axios.get("https://khelinfo-bkd.onrender.com/api/leagues"),
        ]);

        const fixturesData = fixturesRes.data.data || [];
        const teamsData = teamsRes.data.data || [];
        const leaguesData = leaguesRes.data.data || [];

        // Merge team names and logos
        const mergedFixtures = fixturesData.map((match) => {
          const localTeam = teamsData.find((t) => t.id === match.localteam_id);
          const visitorTeam = teamsData.find((t) => t.id === match.visitorteam_id);
          const league = leaguesData.find((l) => l.id === match.league_id);

          return {
            ...match,
            localteam_name: localTeam?.name || "Team A",
            localteam_logo: localTeam?.logo_path || "/placeholder-team.png",
            visitorteam_name: visitorTeam?.name || "Team B",
            visitorteam_logo: visitorTeam?.logo_path || "/placeholder-team.png",
            league_name: league?.name || "League",
          };
        });

        // Filter for current/upcoming/live matches only
        const currentFixtures = mergedFixtures.filter(
          (m) => m.status.toLowerCase() !== "finished"
        );

        setFixtures(currentFixtures);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Gender toggle */}
      <div className="flex justify-center space-x-3 mb-4">
        {genders.map((type) => (
          <button
            key={type}
            onClick={() => setGender(type)}
            className={`px-3 py-1 rounded-full text-sm md:text-base transition-all duration-200 ${
              gender === type
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center flex-wrap gap-2 mb-6">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`text-sm md:text-base px-3 py-1 rounded-full transition-all duration-200 ${
              category === item
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Fixtures List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading fixtures...</div>
        ) : fixtures.length > 0 ? (
          fixtures.map((match) => (
            <div
              key={match.id}
              className="bg-white border rounded-lg p-4 shadow-sm text-left text-sm md:text-base"
            >
              <div className="font-bold text-blue-900 mb-1">{match.league_name}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={match.localteam_logo}
                    alt={match.localteam_name}
                    className="w-8 h-8 object-contain"
                  />
                  <span>{match.localteam_name}</span>
                </div>
                <span className="font-semibold">vs</span>
                <div className="flex items-center gap-2">
                  <img
                    src={match.visitorteam_logo}
                    alt={match.visitorteam_name}
                    className="w-8 h-8 object-contain"
                  />
                  <span>{match.visitorteam_name}</span>
                </div>
              </div>
              <div className="text-gray-600 mt-1">
                {new Date(match.starting_at).toLocaleDateString()} |{" "}
                {new Date(match.starting_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              {match.status !== "Finished" && (
                <div className="text-gray-700 mt-1 font-medium">{match.status}</div>
              )}
              {match.status === "Finished" && match.note && (
                <div className="text-green-600 mt-1 font-medium">{match.note}</div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No current fixtures available.</div>
        )}
      </div>
    </div>
  );
};

export default Fixtures;
