import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const myUserName = process.env.name;

console.log("Value: ", myUserName);

const db = process.env.database;

console.log("Database: ", db);

console.log("Start of Backend Project");

console.log("Going Great with Backend Project");
