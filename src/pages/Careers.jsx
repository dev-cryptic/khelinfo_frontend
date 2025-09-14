import React from "react";

const Careers = () => {
  return (
    <div className="px-4 py-6 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-gray-800">
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">
          Careers at KHELiNFO
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2">
          Be a part of India’s growing sports tech revolution.
        </p>
      </div>

      {/* Culture Section */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Culture</h2>
        <p className="text-sm sm:text-base mb-3">
          At KHELiNFO, we believe in building a collaborative, inclusive, and impact-driven environment.
          Whether you're passionate about sports, code, or content — there's a place for you here.
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
          <li>Flexible work hours and remote options</li>
          <li>Sports-friendly culture — cricket breaks are real!</li>
          <li>Open communication and fast growth environment</li>
          <li>Startup spirit with real responsibility</li>
        </ul>
      </section>

      {/* Open Roles Section */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-5">Open Positions</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {/* Content Writer Card */}
          <div className="p-5 sm:p-6 border rounded-xl shadow-md hover:shadow-lg transition duration-200 bg-white">
            <h3 className="text-lg sm:text-xl font-bold mb-1">Content Writer (Sports)</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Location: Remote</p>
            <p className="text-sm text-blue-900 font-semibold mb-2">₹15,000 – ₹25,000/month</p>
            <p className="text-sm sm:text-base text-gray-700">
              Write match reports, sports blogs, and trending stories for our audience.
            </p>
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Internship Opportunities</h2>
        <p className="text-sm sm:text-base">
          Are you a student or fresher looking to enter the sports-tech space?
          Join our 3-month remote internship program.
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-sm sm:text-base">
          <li>Certificates + Letter of Recommendation</li>
          <li>Stipend: ₹3,000 – ₹7,000/month</li>
          <li>Flexible hours and live projects</li>
        </ul>
      </section>

      {/* How to Apply Section */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">How to Apply</h2>
        <p className="text-sm sm:text-base">
          Send your resume, portfolio, or GitHub profile to{" "}
          <a href="mailto:careers@khelinfo.in" className="text-blue-900 underline">
            careers@khelinfo.in
          </a>
          . Mention the position you're applying for in the subject line.
        </p>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-5 sm:p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3">
          Shape the Future of Indian Sports with Us
        </h2>
        <p className="text-sm sm:text-base mb-4">
          Whether you're a developer, designer, analyst, or storyteller — if you love sports and innovation, we're waiting for you!
        </p>
        <a
          href="mailto:careers@khelinfo.in"
          className="inline-block px-5 sm:px-6 py-2 sm:py-3 bg-blue-900 text-white text-sm sm:text-base rounded-full hover:bg-blue-950 transition"
        >
          🚀 Apply Now
        </a>
      </section>
    </div>
  );
};

export default Careers;
