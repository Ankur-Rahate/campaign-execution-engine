import app from "./src/app.js";
import { config } from "./src/config/config.js";
import DBconnect from "./src/config/dbConfig.js";

const StartServer = async() => {
  await DBconnect();
const PORT = config.port || 3001;
app.listen(PORT, () =>{
  console.log(`Server Start on port${PORT}`)
});
}

StartServer();