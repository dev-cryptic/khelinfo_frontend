const axios = require('axios');
const fs = require('fs');

const API_TOKEN = 'RNBgCrPjJRNNYnIGSDTYlgHR7RDH7G71RdUXMpw07yRdf5jiYTtup0N1G9WP';
const url = `https://cricket.sportmonks.com/api/v2.0/teams?api_token=${API_TOKEN}&per_page=200`;

async function fetchTeams() {
  try {
    const response = await axios.get(url);
    const teams = response.data.data;

    const formatted = {};
    teams.forEach(team => {
      formatted[team.id] = {
        id: team.id,
        name: team.name,
        code: team.code,
        image: team.image_path,
        country_id: team.country_id,
        isNational: team.national_team
      };
    });

    // Save to file
    fs.writeFileSync('./src/data/teams.json', JSON.stringify(formatted, null, 2));
    console.log('✅ teams.json created successfully');
  } catch (err) {
    console.error('❌ Error fetching teams:', err.message);
  }
}

fetchTeams();
