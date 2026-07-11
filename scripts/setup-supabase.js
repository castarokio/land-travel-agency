const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://pwntwrtycgqxjeryezpr.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bnR3cnR5Y2dxeGplcnllenByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mzc3ODM0MSwiZXhwIjoyMDk5MzU0MzQxfQ.2x_EyRCLfbYw_IxbkNFyaUDsmFZjgP-CWDCMM1FDJMI";

async function createBucket(supabase, bucketName) {
  try {
    console.log(`Creating '${bucketName}' storage bucket...`);
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: true,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
      fileSizeLimit: 10 * 1024 * 1024, // 10MB
    });

    if (error) {
      if (error.message.includes("already exists")) {
        console.log(`✓ '${bucketName}' storage bucket already exists!`);
      } else {
        throw error;
      }
    } else {
      console.log(`🎉 '${bucketName}' storage bucket created successfully!`, data);
    }
  } catch (err) {
    console.error(`❌ Failed to create '${bucketName}' storage bucket:`, err.message);
  }
}

async function main() {
  console.log("Connecting to Supabase Admin client...");
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  await createBucket(supabase, "dossiers");
  await createBucket(supabase, "assets");
}

main();
