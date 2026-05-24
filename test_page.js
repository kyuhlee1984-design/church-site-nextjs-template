const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const token = env.split('\n').find(line => line.startsWith('NOTION_TOKEN=')).split('=')[1].trim();

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: token });

async function testPage() {
  try {
    const pageId = '369d4bd57a2980d6b18cd92c59f68579';
    console.log("Fetching page:", pageId);
    const response = await notion.pages.retrieve({ page_id: pageId });
    console.log("Success! Page title:", response.properties?.title?.title?.[0]?.plain_text || response.id);
  } catch (error) {
    console.error("Page Error:", error.body || error.message);
  }
}
testPage();
