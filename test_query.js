const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.split('\n').find(line => line.startsWith('NOTION_TOKEN=')).split('=')[1].trim();

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: token });

async function testQuery() {
  try {
    const dbId = '369d4bd5-7a29-8085-b9cb-e5f13d1a35a3';
    console.log("Querying database:", dbId);
    const response = await notion.databases.query({ database_id: dbId });
    console.log("Success! Items found:", response.results.length);
  } catch (error) {
    console.error("Query Error:", error.body || error.message);
  }
}
testQuery();
