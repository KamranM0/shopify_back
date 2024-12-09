const port = 3000;

const { createClient } = require("@supabase/supabase-js");
// Middleware

// Define routes
const app = require("./app");

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
