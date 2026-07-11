const { Client } = require("pg");

const connectionString = "postgresql://postgres.pwntwrtycgqxjeryezpr:dJ%21C%2AqyBh%40mG_3%23@aws-0-eu-west-1.pooler.supabase.com:6543/postgres";

const sql = `
-- Enable storage RLS policies for the 'assets' bucket
CREATE POLICY "Public Read Access for Assets" ON storage.objects
    FOR SELECT USING (bucket_id = 'assets');

CREATE POLICY "Admin Insert Access for Assets" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Update Access for Assets" ON storage.objects
    FOR UPDATE USING (bucket_id = 'assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Delete Access for Assets" ON storage.objects
    FOR DELETE USING (bucket_id = 'assets' AND auth.role() = 'authenticated');

-- Enable storage RLS policies for the 'dossiers' bucket if not already set
CREATE POLICY "Public Read Access for Dossiers" ON storage.objects
    FOR SELECT USING (bucket_id = 'dossiers');

CREATE POLICY "Client Insert Access for Dossiers" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'dossiers' AND auth.role() = 'authenticated');

CREATE POLICY "Client Update Access for Dossiers" ON storage.objects
    FOR UPDATE USING (bucket_id = 'dossiers' AND auth.role() = 'authenticated');

CREATE POLICY "Client Delete Access for Dossiers" ON storage.objects
    FOR DELETE USING (bucket_id = 'dossiers' AND auth.role() = 'authenticated');
`;

async function main() {
  console.log("Connecting to Supabase PostgreSQL database to set storage policies...");
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log("✓ Connected successfully!");

    console.log("Applying Storage RLS policies...");
    await client.query(sql);
    console.log("🎉 Storage policies configured successfully!");
  } catch (err) {
    if (err.message.includes("already exists")) {
      console.log("✓ Storage policies already configured.");
    } else {
      console.error("❌ Failed to configure storage policies:", err.message);
    }
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}

main();
