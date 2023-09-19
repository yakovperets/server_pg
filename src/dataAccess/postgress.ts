import { Client } from "pg";
import chalk from "chalk";

export const client = new Client({
  user: "postgres",
  password: "1234567",
  host: "localhost",
  port: 5433,
  database: "University",
});

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(chalk.yellow("Connected to PostgreSQL"));
  } catch (error) {
    console.error(chalk.red("Error connecting to PostgreSQL:", error));
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await client.end();
    console.log("Disconnected from PostgreSQL");
  } catch (error) {
    console.error("Error disconnecting from PostgreSQL:", error);
  }
};
