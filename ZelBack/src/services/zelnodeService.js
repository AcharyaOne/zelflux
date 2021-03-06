const cmd = require('node-cmd');
const path = require('path');

const packageJson = require('../../../package.json');
const serviceHelper = require('./serviceHelper');

// eslint-disable-next-line consistent-return
async function updateZelFlux(req, res) {
  const authorized = await serviceHelper.verifyZelTeamSession(req.headers);
  if (authorized === true) {
    const zelnodedpath = path.join(__dirname, '../../../');
    const exec = `cd ${zelnodedpath} && npm run updatezelflux`;
    cmd.get(exec, (err) => {
      if (err) {
        const errMessage = serviceHelper.createErrorMessage(`Error updating ZelFlux: ${err.message}`, err.name, err.code);
        return res.json(errMessage);
      }
      const message = serviceHelper.createSuccessMessage('ZelFlux successfully updated');
      return res.json(message);
    });
  } else {
    const errMessage = serviceHelper.errUnauthorizedMessage();
    return res.json(errMessage);
  }
}

// eslint-disable-next-line consistent-return
async function rebuildZelFront(req, res) {
  const authorized = await serviceHelper.verifyZelTeamSession(req.headers);
  if (authorized === true) {
    const zelnodedpath = path.join(__dirname, '../../../');
    const exec = `cd ${zelnodedpath} && npm run zelfrontbuild`;
    cmd.get(exec, (err) => {
      if (err) {
        const errMessage = serviceHelper.createErrorMessage(`Error rebuilding ZelFlux: ${err.message}`, err.name, err.code);
        return res.json(errMessage);
      }
      const message = serviceHelper.createSuccessMessage('ZelFlux successfully rebuilt');
      return res.json(message);
    });
  } else {
    const errMessage = serviceHelper.errUnauthorizedMessage();
    return res.json(errMessage);
  }
}

// eslint-disable-next-line consistent-return
async function updateZelCash(req, res) {
  const authorized = await serviceHelper.verifyZelTeamSession(req.headers);
  if (authorized === true) {
    const zelnodedpath = path.join(__dirname, '../../../helpers');
    const exec = `cd ${zelnodedpath} && sh updateZelCash.sh`;
    cmd.get(exec, (err) => {
      if (err) {
        const errMessage = serviceHelper.createErrorMessage(`Error updating ZelCash: ${err.message}`, err.name, err.code);
        return res.json(errMessage);
      }
      const message = serviceHelper.createSuccessMessage('ZelCash successfully updated');
      return res.json(message);
    });
  } else {
    const errMessage = serviceHelper.errUnauthorizedMessage();
    return res.json(errMessage);
  }
}

// eslint-disable-next-line consistent-return
async function startZelCash(req, res) {
  const authorized = await serviceHelper.verifyAdminSession(req.headers);
  if (authorized === true) {
    const exec = 'zelcashd';
    cmd.get(exec, (err, data) => {
      if (err) {
        const errMessage = serviceHelper.createErrorMessage(`Error starting ZelCash: ${err.message}`, err.name, err.code);
        return res.json(errMessage);
      }
      console.log(data);
      const message = serviceHelper.createSuccessMessage('ZelCash successfully started');
      return res.json(message);
    });
  } else {
    const errMessage = serviceHelper.errUnauthorizedMessage();
    return res.json(errMessage);
  }
}

// eslint-disable-next-line consistent-return
async function restartZelCash(req, res) {
  const authorized = await serviceHelper.verifyAdminSession(req.headers);
  if (authorized === true) {
    const zelnodedpath = path.join(__dirname, '../../../helpers');
    const exec = `cd ${zelnodedpath} && sh restartZelCash.sh`;
    cmd.get(exec, (err) => {
      if (err) {
        const errMessage = serviceHelper.createErrorMessage(`Error restarting ZelCash: ${err.message}`, err.name, err.code);
        return res.json(errMessage);
      }
      const message = serviceHelper.createSuccessMessage('ZelCash successfully restarted');
      return res.json(message);
    });
  } else {
    const errMessage = serviceHelper.errUnauthorizedMessage();
    console.log(errMessage);
    return res.json(errMessage);
  }
}

// eslint-disable-next-line consistent-return
async function reindexZelCash(req, res) {
  const authorized = await serviceHelper.verifyAdminSession(req.headers);
  if (authorized === true) {
    const zelnodedpath = path.join(__dirname, '../../../helpers');
    const exec = `cd ${zelnodedpath} && sh reindexZelCash.sh`;
    cmd.get(exec, (err) => {
      if (err) {
        const errMessage = serviceHelper.createErrorMessage(`Error reindexing ZelCash: ${err.message}`, err.name, err.code);
        return res.json(errMessage);
      }
      const message = serviceHelper.createSuccessMessage('ZelCash successfully reindexing');
      return res.json(message);
    });
  } else {
    const errMessage = serviceHelper.errUnauthorizedMessage();
    return res.json(errMessage);
  }
}

function getZelFluxVersion(req, res) {
  const { version } = packageJson;
  const message = serviceHelper.createDataMessage(version);
  return res.json(message);
}

module.exports = {
  startZelCash,
  updateZelFlux,
  rebuildZelFront,
  updateZelCash,
  restartZelCash,
  reindexZelCash,
  getZelFluxVersion,
};
