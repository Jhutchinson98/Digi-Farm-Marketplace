const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const masterSpreadsheetID = '1wsTF_6Rwclr_uLoDka2fy0Rtw0izfdfetXUWwG8kr-E';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const idCol = 0
const emailCol = 1
const nameCol = 2
const passwordCol = 3

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function returnAllProfiles(auth){
    const sheets = google.sheets({version: 'v4', auth})

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: masterSpreadsheetID,
        range: 'Profiles!A2:D',
      });
      const rows = res.data.values;
      if (!rows || rows.length === 0) {
        console.log('No data found.');
        return 0;
      }
    
    return rows;
}

async function userLogin(auth, cred){

  const allProf = await authorize().then(returnAllProfiles).catch(console.error);

  console.log(cred)

  for (let i = 0; i<allProf.length; i++){
    if(allProf[i][emailCol] == cred.email && allProf[i][passwordCol] == cred.password) return true
  }
  return false
}


async function createNewProfile(auth, user){
  
    const service = google.sheets({version: 'v4', auth});

    console.log(user)
  
    let values = [
      [
        user.id,
        user.email,
        user.name,
        user.password
      ]
    ];
  
    const resource = {
      values,
    };
  
    try{
      const result = await service.spreadsheets.values.append({
        spreadsheetId: masterSpreadsheetID,
        range: 'Profiles!A2:D',
        valueInputOption: "RAW",
        resource: resource
      });
      console.log(`Customer added: ${result.data.updates.updatedCells} cells appended`)
  
      const r = {status: 1}
      return r;
    }
    catch (err) {
      const r = {status: 0, message: err}
      return r;
    }
  
  }



exports.authorize = authorize
exports.returnAllProfiles = returnAllProfiles
exports.createNewProfile = createNewProfile
exports.userLogin = userLogin