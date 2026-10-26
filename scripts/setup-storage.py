import psycopg2
from dotenv import dotenv_values

env = dotenv_values(".env.local")
conn = psycopg2.connect(env["DATABASE_URL"])
cur = conn.cursor()

# Create bucket
cur.execute("""
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('cms-images', 'cms-images', true)
    ON CONFLICT (id) DO UPDATE SET public = true;
""")

# Create policies
cur.execute("""
    DO $body$
    BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Access cms-images'
        ) THEN
            CREATE POLICY "Public Access cms-images" ON storage.objects
            FOR SELECT USING (bucket_id = 'cms-images');
        END IF;

        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow Upload cms-images'
        ) THEN
            CREATE POLICY "Allow Upload cms-images" ON storage.objects
            FOR INSERT WITH CHECK (bucket_id = 'cms-images');
        END IF;

        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow Update cms-images'
        ) THEN
            CREATE POLICY "Allow Update cms-images" ON storage.objects
            FOR UPDATE USING (bucket_id = 'cms-images');
        END IF;
    END
    $body$;
""")

conn.commit()
print("Supabase storage bucket cms-images created with public policies successfully!")
