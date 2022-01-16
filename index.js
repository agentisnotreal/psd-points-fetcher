const spreadsheetId = '1HXdIeQ5O-0wwb1i2JrO8gzzJcsw0YZqvHz-8Pjt9M6k';
const apiKey = '';

async function getPoints(username) {
    return new Promise(async(resolve, reject) => {
        try {
            // Loop through each row (incredibly annoying and slow, but that seems to be the only way to do it)
            for (let i of(await (await require('node-fetch')(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=true&ranges=A3:D&key=${apiKey}`)).json()).sheets[0].data[0].rowData) {
                let row = i['values'];
                if (row) {
                    let name = (row[0].effectiveValue['stringValue'] || row[0].effectiveValue['numberValue'].toString() || '').replace(/\s/g, ''); // Some entries have spaces at the end (why?)
                    if (name.toLowerCase() === username.toLowerCase()) {

                        let data = {
                            username: name,
                            points: 0,
                            banned: false,
                            blacklisted: false,
                            notes: null
                        }

                        // Check if user is marked as blacklisted, otherwise set points in data.points
                        if ((row[1].effectiveValue == undefined) && (row[2].effectiveValue !== undefined) && (row[2].effectiveValue.stringValue === 'Blacklisted')) {
                            data.points = null;
                            data.blacklisted = true
                        } else data.points = row[1].effectiveValue.numberValue || row[1].effectiveValue.stringValue || 0;

                        // Set data.banned to true if the user has less than or equal to -3 points
                        if (data.points <= -3) data.banned = true;

                        // Check if the user has notes added (only checks column D)
                        if ((row[3].effectiveValue !== undefined) && ((row[3].effectiveValue.stringValue) || (row[3].effectiveValue.numberValue))) data.notes = row[3].effectiveValue.stringValue || row[3].effectiveValue.numberValue;

                        return resolve(data);
                    }
                }
            }
            return reject(new Error('Not found'));
        } catch (e) { return reject(e) }
    })
}

// Add the name of the person to check here
getPoints('agentisnotreal').then(data => console.log(data)).catch(e => console.error(e));