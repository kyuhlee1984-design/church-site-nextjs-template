const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.split('\n').find(line => line.startsWith('NOTION_TOKEN=')).split('=')[1].trim();

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: token });

async function search() {
  try {
    const response = await notion.search({
      filter: { property: 'object', value: 'database' }
    });
    console.log("All accessible databases:", response.results.map(db => ({ id: db.id, title: db.title?.[0]?.plain_text })));
  } catch (error) {
    console.log("Notion search failed for database. Falling back to data_source");
    try {
      // maybe `data_source`? (From the error earlier)
      const response2 = await notion.search({
        filter: { property: 'object', value: 'data_source' }
      });
      console.log("All accessible data_sources:", response2.results.map(db => ({ id: db.id, title: db.title?.[0]?.plain_text })));
    } catch (e2) {
      console.error(e2.body || e2.message);
    }
  }
}
search();
