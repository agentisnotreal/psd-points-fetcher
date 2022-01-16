# Plasma Security Division Points Fetcher

A Node.js code sample for retrieving a user's points, status (banned or blacklisted), and any notes added.

This sample does use quite a bit of memory though, so keep that in mind.

I've implemented this code in Lua form in a Roblox game, try it out [here](https://www.roblox.com/games/7530338250/Unofficial-PSD-Points-Checker).

---

## Usage

You'll need an API Key to access the Google Sheets API, and as such, you'll need a Google Cloud Platform account. Assuming you have already done that, you now have to:

1) Create a project
2) Enable the [Google Sheets API](https://console.cloud.google.com/marketplace/product/google/sheets.googleapis.com) for the project
3) [Create](https://console.cloud.google.com/apis/credential) an API key and restrict its access to the Google Sheets API
4) Set the `apiKey` variable in `index.js` to your newly created key

Afterwards, just do the usual Node.js stuff (`npm i` and `node index.js`), and it should be up and running. Go bonkers, but responsibly!
