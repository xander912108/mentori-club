-- Create a test table
create table public.test_connection (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  message text
);

-- Insert some test data
insert into public.test_connection (message) values ('Hello from Supabase!');
insert into public.test_connection (message) values ('Connection is working!'); 