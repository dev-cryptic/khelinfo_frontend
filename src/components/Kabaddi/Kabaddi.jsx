import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Kabaddi = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
          params: {
            category: 'sports', // Kabaddi-specific news may not be categorized directly
            q: 'kabaddi',
            lang: 'en',
            country: 'in',
            max: 12,
            apikey: '5eed3c7f648610ff6e1c1d92be607d30',
          },
        });
        setBlogs(response.data.articles);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const matches = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    teamA: `Kabaddi Team A${i + 1}`,
    teamB: `Kabaddi Team B${i + 1}`,
    status: i % 2 === 0 ? 'Live' : 'Scheduled',
    time: `Jul ${i + 17}, 5:00 PM IST`
  }));

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex flex-col items-center">
          <nav className="w-full flex flex-wrap justify-around sm:justify-around text-sm sm:text-base font-medium">
  {['Live Scores', 'Schedule', 'News', 'Series', 'Teams', 'Rankings'].map(item => (
    <a
      key={item}
      href="#"
      className="text-black hover:text-blue-800 transition-colors duration-200 text-sm sm:text-base px-1"
    >
      {item}
    </a>
  ))}
</nav>

        </div>
      </header>

      {/* Match Cards */}
      <section className="py-10 px-4 sm:px-8 lg:px-16">
        <h2 className="text-2xl font-semibold text-center text-black mb-8">Kabaddi Matches</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {matches.map(match => (
            <div
              key={match.id}
              className="bg-white shadow-md rounded-2xl p-5 border-l-4 border-transparent hover:border-blue-800 hover:shadow-lg transition"
            >
              <div className="text-lg font-semibold text-black mb-2">
                {match.teamA} vs {match.teamB}
              </div>
              <div className="text-sm text-gray-600 mb-1">{match.status}</div>
              <div className="text-sm text-gray-600">{match.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-10 px-4 sm:px-8 lg:px-16 bg-white">
        <h2 className="text-2xl font-semibold text-center text-black mb-8">Latest Kabaddi Blogs</h2>
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

export default Kabaddi;
