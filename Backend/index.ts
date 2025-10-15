import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import  router from "./route/index";

const app = express();
const PORT = 3000;

app.use(cors(
));
app.use(express.json())


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use(express.static(path.join(__dirname, "public")));


app.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
