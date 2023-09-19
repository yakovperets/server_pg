import express from "express";
import router from "./router/router";
const app = express();
import chalk from "chalk";
import morgan from "./logger/morgan";
import cors from "./cors/cors";

import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./dataAccess/postgress";
//תעוף מכאן
connectToDatabase();

app.use(morgan);
app.use(cors);
app.use(express.json());
app.use(router);

const PORT = 8181;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
  // main()
  //   .then((message) => {
  //     console.log(chalk.yellowBright(message));
  //   })
  //   .then((error) => {
  //     console.log(error);
  //   });
  // generateInitialUsers()
  // .then(() => console.log(chalk.magentaBright("Initial Users Created!")))
  // .catch((error) => console.log(error));
});
