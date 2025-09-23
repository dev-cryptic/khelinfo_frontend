import React, { useState, useEffect } from "react";
import axios from "axios";


const CRICKET_API_URL = import.meta.env.VITE_CRICKET_API_URL
function Rankings() {
  const [gender, setGender] = useState("men");
  const [format, setFormat] = useState("one-day"); // map to ODI, T20I, TEST
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper to map button format to API type
  const formatMap = {
    "one-day": "ODI",
    "t20": "T20I",
    "test": "TEST",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${CRICKET_API_URL}/rankings`);
        const data = response.data.data;

        // Filter by gender and type
        const filtered = data.find(
          r => r.gender === gender && r.type === formatMap[format]
        );

        const currentData =
          filtered?.team?.map(t => ({
            name: t.name,
            points: t.ranking?.points || 0,
            rating: t.ranking?.rating || 0, // 👈 added rating
            position: t.ranking?.position || 0,
            image: t.image_path || "",
          })) || [];

        setRankings(currentData.sort((a, b) => a.position - b.position));
      } catch (err) {
        console.error("Error fetching rankings:", err);
        setError("Failed to fetch rankings. Please try again later.");
        setRankings([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [gender, format]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Gender Buttons */}
      <div className="flex gap-2 mb-4">
        {["men", "women"].map(g => (
          <button
            key={g}
            onClick={() => setGender(g)}
            className={`px-3 py-1 rounded ${gender === g ? "bg-blue-800 text-white" : "bg-gray-300"}`}
          >
            {g === "men" ? "Men's" : "Women's"}
          </button>
        ))}
      </div>

      {/* Format Buttons */}
      <div className="flex gap-2 mb-4">
        {["one-day", "t20", "test"].map(f => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-2 py-1 rounded ${format === f ? "bg-blue-800 text-white" : "bg-gray-300"}`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : rankings.length === 0 ? (
        <div>No rankings available for this selection.</div>
      ) : (
        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr className="border-b">
              <th className="p-2">Rank</th>
              <th className="p-2">Team</th>
              <th className="p-2 text-right">Rating</th> {/* 👈 new column */}
              <th className="p-2 text-right">Points</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map(team => (
              <tr key={`${team.position}-${team.name}`} className="border-b">
                <td className="p-2">{team.position}</td>
                <td className="p-2 flex items-center gap-2">
                  {team.image && <img src={team.image} alt={team.name} className="w-6 h-6" />}
                  {team.name}
                </td>
                <td className="p-2 text-right">{team.rating}</td> {/* 👈 new rating cell */}
                <td className="p-2 text-right">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Rankings;
