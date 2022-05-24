## Automated Supabase Auth user creation from CSV file

- To automatically generate users of supabase from a csv file containing their passwords:
  1. Place the CSV file in the project at your convenience.
  2. Create the file: `types/index.d.ts` and create a type for User containing the keys for the csv object. Example illustrated below
  3. Create `.env` file containing following values:

```
NEXT_PUBLIC_SUPABASE_URL # Available on Supabase Auth Settings Page
NEXT_PUBLIC_SUPABASE_ANON_KEY # Available on Supabase Auth Settings Page
FILE_PATH # Path to your csv file in the project
```
- Edit the data obj in `supabase.auth.singUp` function according to your needs
- Run `yarn start`


[Note: Example User is given in comment at the top in index.ts]
##### Congrats for completing the automated task!