const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.split('\n').find(line => line.startsWith('NOTION_TOKEN=')).split('=')[1].trim();

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: token });

async function findDb() {
  try {
    const pageId = '369d4bd57a2980d6b18cd92c59f68579';
    console.log("Checking children of page:", pageId);
    const response = await notion.blocks.children.list({ block_id: pageId });
    const databases = response.results.filter(block => block.type === 'child_database');
    console.log("Databases found in page:", JSON.stringify(databases, null, 2));
    
    console.log("Searching all accessible databases...");
    const searchResponse = await notion.search({
      filter: { property: 'object', value: 'database' }
    });
    console.log("Accessible databases:", JSON.stringify(searchResponse.results.map(db => ({ id: db.id, title: db.title?.[0]?.plain_text })), null, 2));
  } catch (error) {
    console.error("Error:", error.body || error.message);
  }
}
findDb();
