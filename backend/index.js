import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import dotenv, { configDotenv } from "dotenv";
import { getLocationAQI } from "./Controllers/getAQI.js";
import cors from "cors"
import "./Controllers/addAQI.js"

const app = express();
const PORT = 8000;

dotenv.config({
	path: "./.env"
})

app.use(cors({
	origin : "*",
	credentials : true
}))
app.use(express.json());
app.use( urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/getData', getLocationAQI)


app.listen((PORT), () => {
	console.log(`App listening on port: ${PORT}`);
})