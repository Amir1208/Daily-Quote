let twilio = require('twilio');
let accountSid = YOUR ACCOUNTSID;
let authToken = YOURAUTHTOKEN;

const client = twilio(accountSid, authToken);
const fetch = require("node-fetch")

async function main() {
  // Choose a random number
  const min = 0;
  const max = 1643;
  let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;

  // Call the api
  try {
    let response = await fetch("https://type.fit/api/quotes");
    let result = await response.json();

    // retrun the quote
    return result[ranNum];
  } catch(error) {
    console.error(error);
  }
}

// Create actuall message
async function createMessage() {
  try {
    let result = await main();

    let body = `\n
    Quote of the day
    “${result.text}”
    \n- ${result.author}
    `;
    let message = await client.messages.create({
      body: body,
      from: YOUR TWILIO NUMBER,
      to: YOUR ACTUALL NUMBER
    });
    console.log('Success');
  } catch(error) {
    console.error(error);
  }
}

createMessage();
