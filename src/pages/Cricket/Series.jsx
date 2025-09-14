import React, { useState } from "react";

const seriesData = {
  All: [
    {
      name: "India Tour of Sri Lanka, 2025",
      date: "Jul 20 - Aug 10",
      venue: "Colombo, Sri Lanka",
      gender: "Men"
    },
    {
      name: "Women's Ashes 2025",
      date: "Sep 5 - Sep 25",
      venue: "London, England",
      gender: "Women"
    },
    {
      name: "Asia Cup 2025",
      date: "Oct 10 - Oct 30",
      venue: "Karachi, Pakistan",
      gender: "Men"
    }
  ],
  Men: [
    {
      name: "India Tour of Sri Lanka, 2025",
      date: "Jul 20 - Aug 10",
      venue: "Colombo, Sri Lanka"
    },
    {
      name: "Asia Cup 2025",
      date: "Oct 10 - Oct 30",
      venue: "Karachi, Pakistan"
    }
  ],
  Women: [
    {
      name: "Women's Ashes 2025",
      date: "Sep 5 - Sep 25",
      venue: "London, England"
    }
  ]
};

function Series() {
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        {["All", "Men", "Women"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`text-sm sm:text-base px-3 py-1 border-b-2 ${
              selectedTab === tab
                ? "border-blue-700 text-blue-700 font-semibold"
                : "border-transparent text-gray-600 hover:text-blue-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Series Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {seriesData[selectedTab].map((series, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="text-lg font-semibold text-[#012666]">
              {series.name}
            </div>
            <div className="text-sm text-gray-700 mt-1">{series.date}</div>
            <div className="text-sm text-gray-500">{series.venue}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Series;
