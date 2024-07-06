import axios from "axios";
import bodyParser from "body-parser";
import express, { response } from "express";

const app = express();
const port = 3000;
const API_URL = "https://api.giphy.com/v1/gifs";
const myAPIKey = "YOUR API KEY FROM GIPHY";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {   
        const response = await axios.get(API_URL + '/trending', {
            params: {
                api_key: myAPIKey,
                limit: 10,
            }
        });
        const result = response.data.data;
        res.render("index.ejs", {content: result});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.post("/get-gif", async (req, res) => {
    const search = req.body.gifsearch;
    try {   
        const response = await axios.get(API_URL + `/search`, {
            params: {
                api_key: myAPIKey,
                limit: 10,
                q: search
            }
        });
        const result = response.data.data;
        res.render("gif.ejs", {content: result});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(3000, () => {
    console.log(`Listening to port ${port}`);
});