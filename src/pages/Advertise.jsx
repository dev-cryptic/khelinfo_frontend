import React from "react";

const Advertise = () => {
  return (
    <div className="px-4 py-6 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-gray-800">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-blue-900">
          Advertise with KHELiNFO
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Reach passionate sports fans across India with custom ad placements and branding solutions.
        </p>
      </div>

      {/* Why Advertise Section */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Why Choose KHELiNFO?</h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
          <li>Over 1,00,000+ monthly visitors</li>
          <li>Targeted sports audience (cricket, football, kabaddi, and more)</li>
          <li>Real-time match engagement and interactive content</li>
          <li>High CTR with content-integrated ad formats</li>
        </ul>
      </section>

      {/* Ad Options & Pricing */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-5">Ad Options & Pricing</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {/* Banner Ads */}
          <div className="border rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition bg-white">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">🏷️ Banner Ads</h3>
            <p className="text-sm text-gray-600 mb-2">Header, sidebar, or footer banners on all pages.</p>
            <p className="font-bold text-blue-900 text-base sm:text-lg">Starts from ₹5,000/week</p>
          </div>

          {/* Sponsored Content */}
          <div className="border rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition bg-white">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">📢 Sponsored Content</h3>
            <p className="text-sm text-gray-600 mb-2">Articles, blog mentions, or product placements.</p>
            <p className="font-bold text-blue-900 text-base sm:text-lg">₹8,000 per article</p>
          </div>

          {/* Video Ads */}
          <div className="border rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition bg-white">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">📺 Video Ads</h3>
            <p className="text-sm text-gray-600 mb-2">Short videos during match streams or home page.</p>
            <p className="font-bold text-blue-900 text-base sm:text-lg">₹15,000/week</p>
          </div>
        </div>
      </section>

      {/* Audience Insights */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Audience</h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
          <li>70% male, 30% female</li>
          <li>Age group: 18–35 years</li>
          <li>Geography: Tier 1 & Tier 2 Indian cities</li>
          <li>Avg. session time: 5+ minutes</li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3">
          Ready to Promote Your Brand?
        </h2>
        <p className="text-sm sm:text-base mb-4">
          Reach out now for a custom media kit, campaign strategy, or to book your ad slot.
        </p>
        <a
          href="mailto:ads@khelinfo.in"
          className="inline-block px-5 sm:px-6 py-2 sm:py-3 bg-blue-900 text-white text-sm sm:text-base rounded-full hover:bg-blue-950 transition"
        >
          📩 Contact Us at ads@khelinfo.in
        </a>
      </section>
    </div>
  );
};

export default Advertise;
