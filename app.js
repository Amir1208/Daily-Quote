const twilio = require('twilio');
const fetch = require("node-fetch");

const accountSid = YOUR ACCOUNTSID;
const authToken = YOUR AUTHTOKEN;

const client = twilio(accountSid, authToken);

async function main() {
  // Choose a random number
  const min = 0;
  const max = 1643;
  let ran = Math.floor(Math.random() * (max - min + 1)) + min;

  // Call the api
  try {
    let response = await fetch("https://type.fit/api/quotes");
    let data = await response.json();

    // Retrun the quote
    return data[ran];
  } catch(error) {
    console.log(error);
  }
}

// Create actuall message
async function createMessage() {
  try {
    let result = await main();

    let body = `\n
    Quote of the day
    ${result.text}

    - ${result.author}
    `;
    let message = await client.messages.create({
      body: body,
      from: YOUR TWILIO NUMBER,
      to: YOUR ACTUALL NUMBER
    });
    console.log('Success');
  } catch(error) {
    console.log(error);
  }
}

createMessage();
