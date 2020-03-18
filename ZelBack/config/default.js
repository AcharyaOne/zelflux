module.exports = {
  server: {
    zelfrontport: 16126,
    apiport: 16127,
    apiporthttps: 16128,
  },
  database: {
    url: '127.0.0.1',
    port: 27018,
    local: {
      database: 'zelfluxlocal',
      collections: {
        loggedUsers: 'loggedusers',
        activeLoginPhrases: 'activeloginphrases',
      },
    },
    global: {
      database: 'zelfluxglobal',
      collections: {
        registeredZelApps: 'registeredzelapps',
        zelAppsInfo: 'zelappsinfo',
      },
    },
  },
  zelTeamZelId: '132hG26CFTNhLM3MRsLEJhp9DpBrK6vg5N',
};
