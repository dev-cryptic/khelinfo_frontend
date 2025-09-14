import React, { useState } from 'react';

const Fixtures = () => {
  const [gender, setGender] = useState('all');
  const [category, setCategory] = useState('All');

  const genders = ['all', 'men', 'women'];
  const categories = ['All', 'International', 'Domestic & Others', 'T20 Leagues'];

  const sampleFixtures = [
    {
      id: 1,
      gender: 'men',
      category: 'International',
      tournament: 'ICC World Cup 2025',
      teamA: 'India',
      teamB: 'Australia',
      date: '2025-07-20',
      time: '14:30 IST',
      venue: 'Wankhede Stadium, Mumbai'
    },
    {
      id: 2,
      gender: 'women',
      category: 'T20 Leagues',
      tournament: 'Womens T20 Challenge',
      teamA: 'Velocity',
      teamB: 'Trailblazers',
      date: '2025-07-22',
      time: '19:00 IST',
      venue: 'Eden Gardens, Kolkata'
    },
    {
      id: 3,
      gender: 'men',
      category: 'Domestic & Others',
      tournament: 'Ranji Trophy',
      teamA: 'Mumbai',
      teamB: 'Delhi',
      date: '2025-07-25',
      time: '10:00 IST',
      venue: 'Brabourne Stadium, Mumbai'
    },
    {
      id: 4,
      gender: 'women',
      category: 'International',
      tournament: 'Womens ODI Series',
      teamA: 'India Women',
      teamB: 'England Women',
      date: '2025-07-28',
      time: '13:00 IST',
      venue: 'MA Chidambaram Stadium, Chennai'
    },
    {
      id: 5,
      gender: 'men',
      category: 'T20 Leagues',
      tournament: 'IPL 2025',
      teamA: 'Chennai Super Kings',
      teamB: 'Royal Challengers Bangalore',
      date: '2025-07-30',
      time: '19:30 IST',
      venue: 'M. Chinnaswamy Stadium, Bangalore'
    },
    {
      id: 6,
      gender: 'women',
      category: 'Domestic & Others',
      tournament: 'Senior Womens One Day League',
      teamA: 'Railways Women',
      teamB: 'Bengal Women',
      date: '2025-08-02',
      time: '09:30 IST',
      venue: 'Sawai Mansingh Stadium, Jaipur'
    }
  ];

  const filteredFixtures = sampleFixtures.filter((match) => {
    const matchGender = gender === 'all' || match.gender === gender;
    const matchCategory = category === 'All' || match.category === category;
    return matchGender && matchCategory;
  });

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
                ? 'bg-blue-800 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                ? 'bg-blue-800 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Fixture content header */}
      <div className="text-center text-sm md:text-base text-gray-600 mb-4">
        <strong>{gender === 'all' ? 'All' : gender === 'men' ? 'Men' : 'Women'}</strong> fixtures
        for <strong>{category}</strong>
      </div>

      {/* Fixture list */}
      <div className="space-y-4">
        {filteredFixtures.length > 0 ? (
          filteredFixtures.map((match) => (
            <div
              key={match.id}
              className="bg-white border rounded-lg p-4 shadow-sm text-left text-sm md:text-base"
            >
              <div className="font-bold text-blue-900 mb-1">{match.tournament}</div>
              <div className="font-semibold">
                {match.teamA} vs {match.teamB}
              </div>
              <div className="text-gray-600">
                {match.date} | {match.time}
              </div>
              <div className="text-gray-500">{match.venue}</div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No fixtures available.</div>
        )}
      </div>
    </div>
  );
};

export default Fixtures;
