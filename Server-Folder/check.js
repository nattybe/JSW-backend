import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({ host: "http://127.0.0.1:7700" });

const taskUid = 20; // Replace with your actual taskUid

async function checkTaskStatus() {
  try {
    const setFilterableAttributes = await client.getTask(
      (
        await client
          .index("jobs")
          .updateFilterableAttributes(["from", "unixDATE", "date"])
      ).taskUid
    ); // set
    const setSortableAttributes = await client.getTask(
      (
        await client
          .index("jobs")
          .updateSortableAttributes(["from", "unixDATE"])
      ).taskUid
    ); //not set

    console.log('Task Status:', (await client.index('jobs').getTask(120)));
    // const today = new Date();

    const dateFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" });
    const formattedDate = dateFormatter.format(new Date());

    console.log(formattedDate);
  } catch (error) {
    console.error("Error checking task status:", error);
  }
}

// Call the function to check the status
checkTaskStatus();
