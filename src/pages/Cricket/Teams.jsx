import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import hook

// 2. Use keys for team names for translation
const internationalTeams = [
  "india", "afghanistan", "ireland", "pakistan", "australia", "sri_lanka",
  "bangladesh", "england", "west_indies", "south_africa", "zimbabwe", "new_zealand"
];

const associateTeams = [
  "malaysia", "nepal", "germany", "namibia", "denmark", "singapore",
  "papua_new_guinea", "kuwait", "vanuatu", "jersey", "oman", "fiji",
  "italy", "botswana", "belgium", "uganda", "canada", "united_arab_emirates",
  "hong_kong", "kenya", "united_states", "scotland", "netherlands",
  "bermuda", "iran"
];

const domesticLeagues = [
  "ipl", "bbl", "psl", "cpl",
  "vitality_blast", "lpl", "t20_blast", "super_smash"
];

const womenTeams = [
  "india_women", "australia_women", "england_women", "south_africa_women", 
  "new_zealand_women", "pakistan_women", "bangladesh_women", "sri_lanka_women"
];

function Teams() {
  const { t } = useTranslation(); // 3. Call hook

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 4. Use t() function for all text */}
      <h1 className="text-2xl font-bold mb-4">{t('teams')}</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t('international_test_teams')}</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {internationalTeams.map((teamKey) => (
            <li key={teamKey} className="bg-gray-100 p-2 rounded">{t(teamKey)}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t('associate_teams')}</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {associateTeams.map((teamKey) => (
            <li key={teamKey} className="bg-gray-50 p-2 rounded">{t(teamKey)}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t('domestic_leagues')}</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {domesticLeagues.map((leagueKey) => (
            <li key={leagueKey} className="bg-gray-50 p-2 rounded">{t(leagueKey)}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t('women_teams')}</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {womenTeams.map((teamKey) => (
            <li key={teamKey} className="bg-gray-100 p-2 rounded">{t(teamKey)}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Teams;
