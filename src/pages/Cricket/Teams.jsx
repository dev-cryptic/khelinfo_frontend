import React from 'react';

const internationalTeams = [
  "India", "Afghanistan", "Ireland", "Pakistan", "Australia", "Sri Lanka",
  "Bangladesh", "England", "West Indies", "South Africa", "Zimbabwe", "New Zealand"
];

const associateTeams = [
  "Malaysia", "Nepal", "Germany", "Namibia", "Denmark", "Singapore",
  "Papua New Guinea", "Kuwait", "Vanuatu", "Jersey", "Oman", "Fiji",
  "Italy", "Botswana", "Belgium", "Uganda", "Canada", "United Arab Emirates",
  "Hong Kong", "Kenya", "United States of America", "Scotland", "Netherlands",
  "Bermuda", "Iran"
];

const domesticLeagues = [
  "IPL (India)", "BBL (Australia)", "PSL (Pakistan)", "CPL (West Indies)",
  "Vitality Blast (England)", "LPL (Sri Lanka)", "T20 Blast", "Super Smash (New Zealand)"
];

const womenTeams = [
  "India Women", "Australia Women", "England Women", "South Africa Women", 
  "New Zealand Women", "Pakistan Women", "Bangladesh Women", "Sri Lanka Women"
];

function Teams() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">International Test Teams</h2>
        <ul className="grid grid-cols-2 gap-2">
          {internationalTeams.map((team) => (
            <li key={team} className="bg-gray-100 p-2 rounded">{team}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Associate Teams</h2>
        <ul className="grid grid-cols-2 gap-2">
          {associateTeams.map((team) => (
            <li key={team} className="bg-gray-50 p-2 rounded">{team}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Domestic Leagues</h2>
        <ul className="grid grid-cols-2 gap-2">
          {domesticLeagues.map((league) => (
            <li key={league} className="bg-gray-50 p-2 rounded">{league}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Women Teams</h2>
        <ul className="grid grid-cols-2 gap-2">
          {womenTeams.map((team) => (
            <li key={team} className="bg-gray-100 p-2 rounded">{team}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Teams;
