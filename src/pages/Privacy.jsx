import React from 'react';

const Privacy = () => {
  return (
    <div className="p-4 sm:p-6 md:p-12 max-w-5xl mx-auto text-gray-800">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700">Privacy Policy</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Last updated: July 14, 2025
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-10 text-base sm:text-lg md:text-xl leading-relaxed">
        <p>
          At <strong>KHELiNFO</strong>, we are committed to protecting your personal data and ensuring transparency in how we use it. This Privacy Policy outlines the data we collect, how it’s used, and your rights regarding your information.
        </p>
      </section>

      {/* Data Collection */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">1. What We Collect</h2>
        <ul className="list-disc list-inside space-y-2 text-base sm:text-lg md:text-xl">
          <li><strong>Personal Information:</strong> Name, email, contact number (only if submitted by you)</li>
          <li><strong>Usage Data:</strong> IP address, pages visited, time spent, clicks, and device/browser information</li>
          <li><strong>Cookies & Tracking:</strong> We use cookies to enhance user experience and analyze performance</li>
        </ul>
      </section>

      {/* Usage of Data */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">2. How We Use Your Data</h2>
        <ul className="list-disc list-inside space-y-2 text-base sm:text-lg md:text-xl">
          <li>To deliver, maintain, and improve our services</li>
          <li>To personalize user experience and content</li>
          <li>To send you notifications, updates, or promotional messages (only with your consent)</li>
          <li>To analyze user trends and optimize performance</li>
        </ul>
      </section>

      {/* Information Sharing */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">3. Sharing of Information</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          We do <strong>not sell or rent</strong> your personal information. We may share data with trusted third-party service providers (like analytics or hosting providers) under strict confidentiality agreements.
        </p>
      </section>

      {/* Security */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">4. Security of Your Information</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          We use secure protocols such as HTTPS, encrypted storage, and limited access to your data. However, no system is entirely immune to security risks.
        </p>
      </section>

      {/* Third-Party Services */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">5. Third-Party Integrations</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          Our website integrates with platforms like Google Analytics, Firebase, and AWS for analytics, storage, and backend infrastructure. These services have their own privacy policies, which we encourage you to review.
        </p>
      </section>

      {/* User Rights */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">6. Your Rights & Choices</h2>
        <ul className="list-disc list-inside space-y-2 text-base sm:text-lg md:text-xl">
          <li>Request access to the data we store about you</li>
          <li>Request deletion or correction of your information</li>
          <li>Unsubscribe from marketing or newsletters anytime</li>
          <li>Disable cookies via your browser settings</li>
        </ul>
      </section>

      {/* Retention Policy */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">7. Data Retention</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          We retain user data only as long as necessary for the purposes outlined. When no longer required, your data is securely deleted.
        </p>
      </section>

      {/* Children’s Privacy */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">8. Children’s Privacy</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          Our platform is not intended for individuals under 13. We do not knowingly collect personal information from children. If you believe we’ve collected such data, please contact us.
        </p>
      </section>

      {/* Policy Updates */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">9. Updates to This Policy</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          We may update this policy periodically. Changes will be published on this page with the updated date at the top.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">10. Contact Us</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          Have questions or feedback about our policy? Reach out to us at{' '}
          <a href="mailto:privacy@khelinfo.in" className="text-blue-600 underline">privacy@khelinfo.in</a>.
        </p>
      </section>

      {/* Footer */}
      <div className="text-center text-sm sm:text-base text-gray-500">
        © {new Date().getFullYear()} KHELiNFO. All rights reserved.
      </div>
    </div>
  );
};

export default Privacy;
