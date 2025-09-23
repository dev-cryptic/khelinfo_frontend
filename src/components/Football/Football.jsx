import React, { useEffect, useState } from 'react';
import axios from 'axios';



const FOOTBALL_API_URL = import.meta.env.VITE_FOOTBALL_API_URL;

const Football = () => {
  const [blogs, setBlogs] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [teams, setTeams] = useState({});
  const [visibleCount, setVisibleCount] = useState(8); // initially show 8 fixtures

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
          params: {
            category: 'sports',
            q: 'football',
            lang: 'en',
            country: 'us',
            max: 12,
            apikey: '5eed3c7f648610ff6e1c1d92be607d30',
          },
        });
        setBlogs(response.data.articles);
      } catch (error) {
        console.error('Error fetching football blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // Fetch fixtures + teams
  useEffect(() => {
    const fetchFixturesAndTeams = async () => {
      try {
        const fixtureRes = await axios.get(
          `${FOOTBALL_API_URL}/football/fixtures`
        );
        setFixtures(fixtureRes.data.data);

        const teamRes = await axios.get(
          `${FOOTBALL_API_URL}/football/teams`
        );

        const teamMap = {};
        teamRes.data.data.forEach((team) => {
          teamMap[team.id] = team;
        });
        setTeams(teamMap);
      } catch (error) {
        console.error('Error fetching fixtures/teams:', error);
      }
    };
    fetchFixturesAndTeams();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Fixtures Section */}
      <section className="py-10 px-4 sm:px-8 lg:px-16">
        <h2 className="text-2xl font-semibold text-center text-black mb-8">Fixtures</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fixtures.slice(0, visibleCount).map((fixture) => {
            const home = fixture.participants.find(p => p.meta.location === 'home');
            const away = fixture.participants.find(p => p.meta.location === 'away');

            return (
              <div
                key={fixture.id}
                className="bg-white shadow-md rounded-2xl p-5 border-l-4 border-transparent hover:border-blue-800 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-3">
                  {/* Home Team */}
                  <div className="flex flex-col items-center">
                    <img
                      src={teams[home?.id]?.image_path || home?.image_path}
                      alt={home?.name}
                      className="w-12 h-12 object-contain mb-1"
                    />
                    <span className="text-sm font-semibold text-black">{home?.name}</span>
                  </div>

                  <span className="text-lg font-bold text-gray-700">vs</span>

                  {/* Away Team */}
                  <div className="flex flex-col items-center">
                    <img
                      src={teams[away?.id]?.image_path || away?.image_path}
                      alt={away?.name}
                      className="w-12 h-12 object-contain mb-1"
                    />
                    <span className="text-sm font-semibold text-black">{away?.name}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Status: {fixture.status}
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < fixtures.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="px-6 py-2 bg-blue-800 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              More...
            </button>
          </div>
        )}
      </section>

      {/* Blog Section */}
      <section className="py-10 px-4 sm:px-8 lg:px-16 bg-white">
        <h2 className="text-2xl font-semibold text-center text-black mb-8">Latest Football Blogs</h2>
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
                  {blog.description?.length > 100 ? blog.description.slice(0, 97) + '...' : blog.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Football;
