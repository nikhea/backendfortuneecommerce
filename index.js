import Http from "http";
import App from "./src/app.js";
const port = process.env.PORT;
const Server = Http.createServer(App);
Server.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
