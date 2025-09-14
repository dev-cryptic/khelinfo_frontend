import React from "react";

const Terms = () => {
  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto text-[#333] font-sans">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#003366]">
          Terms and Conditions
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Last updated: July 14, 2025
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-8 text-sm sm:text-base leading-relaxed">
        <p>
          By accessing and using <strong>KHELiNFO</strong>, you agree to abide by the terms and conditions outlined here.
          If you do not agree with any part of these terms, you must not use the platform.
        </p>
      </section>

      {/* Use of Website */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#003366] mb-2">
          1. Use of the Website
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base leading-relaxed">
          <li>You must be at least 13 years of age to use KHELiNFO.</li>
          <li>You agree not to use the website for unlawful or harmful purposes.</li>
          <li>Content may not be copied or redistributed without written permission.</li>
        </ul>
      </section>

      {/* User Content */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#003366] mb-2">
          2. User Content
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          If you post or upload content (e.g., comments, messages, media), you grant us the right to display and use that content
          for promotional or functional purposes. You are responsible for ensuring your content does not infringe on third-party rights.
        </p>
      </section>

      {/* Intellectual Property */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#003366] mb-2">
          3. Intellectual Property
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          All content, branding, code, and data on KHELiNFO are the property of KHELiNFO or its licensors.
          Unauthorized reproduction or distribution is strictly prohibited.
        </p>
      </section>

      {/* Disclaimer */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#003366] mb-2">
          4. Disclaimer of Liability
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          We strive to keep information accurate and updated, but we make no warranties about the completeness, accuracy, or availability
          of any content or features. Use the platform at your own risk.
        </p>
      </section>

      {/* Third-party Links */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#003366] mb-2">
          5. Third-party Links
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          KHELiNFO may include links to third-party websites. We are not responsible for their content or privacy practices.
          Visiting those sites is at your own discretion.
        </p>
      </section>

      {/* Account Termination */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#003366] mb-2">
          6. Account Termination
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          We reserve the right to suspend or terminate user accounts that violate our terms or misuse our platform.
          This may occur without prior notice.
        </p>
      </section>

      {/* Changes to Terms */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#003366] mb-2">
          7. Changes to Terms
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          These Terms may be updated from time to time. Continued use of the site means you accept the updated terms.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#003366] mb-2">
          8. Contact Us
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          If you have any questions about these terms, reach out at{" "}
          <a href="mailto:support@khelinfo.in" className="text-[#003366] underline">
            support@khelinfo.in
          </a>.
        </p>
      </section>

      {/* Footer */}
      <div className="text-center text-gray-400 text-xs sm:text-sm">
        © {new Date().getFullYear()} KHELiNFO. All rights reserved.
      </div>
    </div>
  );
};

export default Terms;
