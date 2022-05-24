/** 
 * type User = { 
 * 	its: string, 
 * 	email: string, 
 * 	password: string 
 * }
*/

import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import Papa from "papaparse";

dotenv.config();

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : "";
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : "";
if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "")
  console.error("Error: env not accessible");

const csvFilePath: string = process.env.FILE_PATH ? process.env.FILE_PATH : ""
// console.log(csvFilePath);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


async function signIn(member: User): Promise<void> {
  const { user, session, error } = await supabase.auth.signUp(
    {
      email: member.email,
      password: member.password,
    },
    { // Modify this data according to your needs for additional data in the user object
      data: {
        its: member.its,
      },
    }
  );
  console.log(
    "-----------------------------------------Error-----------------------------------------"
  );
  console.log(error);
  console.log(
    "----------------------------------------Session----------------------------------------"
  );
  console.log(session);
  console.log(
    "-----------------------------------------User------------------------------------------"
  );
  console.log(user);
}


const readCSV = async (filePath: string): Promise<User[]> => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      transformHeader: (header) => header.trim(),
      complete: (results: Papa.ParseResult<User>) => {
        console.log("Complete", results.data.length, "records.");
        resolve(results.data);
      },
    });
  });
};

const test = async () => {
  let parsedData: User[] = await readCSV(csvFilePath);
  await Promise.all(parsedData.map(async (member: User) => {
		await signIn(member);
	}));

};

// test();