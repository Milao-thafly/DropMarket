import Express, { Router } from "express";
import { fileURLToPath } from "node:url";
import  cors  from "cors";
import path from "node:path"
import  router from "./route/index";


const app = Express();
const PORT = 3000;

app.use(cors(
));
app.use(Express.json())


// @ts-ignore
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(Express.urlencoded({ extended: true}));


app.use("/", router);


app.use(Express.static(path.join(__dirname, "public")));


app.use((req,res) => {
    res.status(404).send("Page non trouvée")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});