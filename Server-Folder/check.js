import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({ host: 'http://127.0.0.1:7700' });

const taskUid = 20; // Replace with your actual taskUid

async function checkTaskStatus() {
  try {
    const taskStatus = await client.getTask(taskUid);
    
    console.log('Task Status:', taskStatus);
  } catch (error) {
    console.error('Error checking task status:', error);
  }
}

// Call the function to check the status
checkTaskStatus();
