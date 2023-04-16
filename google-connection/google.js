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

const userCols = {
  id: 0,
  email: 1,
  name: 2,
  password: 3
}
const productCols = {
  id: 0,
  userId: 1,
  name: 2,
  quantity: 3,
  count: 4,
  trade: 5,
  counter: 6,
  price: 7
}
const ids = {
  users: 0,
  products: 0
}

function setCurrentId() {
  authorize().then(returnAllProfiles).then(profiles => {
    ids.users = Math.max(...profiles.map(p => p[userCols.id]))+1
  })
  authorize().then(returnAllProducts).then(products => {
    ids.products = Math.max(...products.map(p => p[productCols.id]))+1
  })
}

setCurrentId()

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
    let rows = res.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return [];
    }
    return rows;
}

async function returnAllProducts(auth){
  const sheets = google.sheets({version: 'v4', auth})

  const res = await sheets.spreadsheets.values.get({
      spreadsheetId: masterSpreadsheetID,
      range: 'Products!A2:H',
  });
  let rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return [];
  }
  return rows;
}

async function getProfiles(auth){
  const profs = await returnAllProfiles(auth)
  return profs.map(p => ({
      email: p[userCols.email],
      name: p[userCols.name],
  }))
}

async function getProductsByUserId(auth, userId){
  const products = await returnAllProducts(auth)
  return products.filter(p => p[productCols.userId] == userId).map(p => ({
    name: p[productCols.name],
    quantity: Number(p[productCols.quantity]),
    count: Number(p[productCols.count]),
    trade: Boolean(Number(p[productCols.trade])),
    counter: Boolean(Number(p[productCols.counter])),
    price: Number(p[productCols.price])
  }))
}

async function getUserByEmail(auth, email){
  const allProf = await returnAllProfiles(auth).catch(console.error);
  return allProf.filter(p => p[userCols.email] == email).map(p => ({
    id: p[userCols.id],
    email: p[userCols.email],
    name: p[userCols.name],
    password: p[userCols.password],
  }))[0]
}

async function userLogin(auth, cred){
  const allProf = await returnAllProfiles(auth).catch(console.error);
  for (let i = 0; i<allProf.length; i++){
    if(allProf[i][userCols.email] == cred.email && allProf[i][userCols.password] == cred.password) return true
  }
  return false
}


async function createNewProfile(auth, user){
  
    const service = google.sheets({version: 'v4', auth});
  
    let values = [
      [
        ids.users,
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
      })
      if (result.status == 200) {
        const r = {status: 1}
        ids.users += 1
        return r;
      }else {
        const r = {status: 0, message: err}
        return r;
      }
    }
    catch (err) {
      const r = {status: 0, message: err}
      return r;
    }
  
}

async function createNewProduct(auth, product){
  
  const service = google.sheets({version: 'v4', auth});

  let values = [
    [
      ids.products,
      product.userId,
      product.name,
      product.quantity,
      product.count,
      product.trade,
      product.counter,
      product.price
    ]
  ];

  const resource = {
    values,
  };

  try{
    const result = await service.spreadsheets.values.append({
      spreadsheetId: masterSpreadsheetID,
      range: 'Products!A2:H',
      valueInputOption: "RAW",
      resource: resource
    })
    if (result.status == 200) {
      const r = {status: 1}
      ids.products += 1
      return r;
    }else {
      const r = {status: 0, message: err}
      return r;
    }
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
exports.getUserByEmail = getUserByEmail
exports.returnAllProducts = returnAllProducts
exports.createNewProduct = createNewProduct
exports.getProductsByUserId = getProductsByUserId
exports.getProfiles = getProfiles