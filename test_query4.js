const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.split('\n').find(line => line.startsWith('NOTION_TOKEN=')).split('=')[1].trim();

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: token });

async function testQuery4() {
  try {
    const dbId = '367d4bd5-7a29-8023-92c3-000b58290fbb'; // Sermons DB
    console.log("Querying Sermons DB:", dbId);
    
    // Try dataSources.query
    try {
      const resp = await notion.dataSources.query({ data_source_id: dbId });
      console.log("dataSources.query SUCCESS! Items:", resp.results.length);
    } catch(e) {
      console.error("dataSources.query FAILED:", e.body || e.message);
    }
    
    // Try databases.query
    try {
      const resp2 = await notion.databases.query({ database_id: dbId });
      console.log("databases.query SUCCESS! Items:", resp2.results.length);
    } catch(e) {
      console.error("databases.query FAILED:", e.body || e.message);
    }
  } catch (error) {
    console.error("Overall Error:", error);
  }
}
testQuery4();
