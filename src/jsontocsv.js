const supabase = require("./supabase"); // Import your Supabase client instance
const fs = require("fs");
const { parse } = require("json2csv"); // json2csv library for converting JSON to CSV

// Fetch data from Supabase table
supabase
  .from("products")
  .select("*")
  .then(({ data, error }) => {
    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    // If data is successfully fetched, convert it to CSV
    const csv = parse(data); // Use the parse method from json2csv

    // Save the CSV to a file
    fs.writeFileSync("export.csv", csv);

    console.log("Data successfully exported to export.csv");
  });

// if (!error) {
//   // Convert data to CSV (use a library like `json2csv` in Node.js)
//   const csv = json2csv(data);
//   // Save CSV file
//   fs.writeFileSync("export.csv", csv);
// }
