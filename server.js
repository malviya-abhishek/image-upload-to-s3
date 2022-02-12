require("dotenv").config();

const cors = require("cors");
const express = require("express");
const busboy = require("connect-busboy");
const app = express();

// Global middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = require("./app/config/cors.domains").domains;

app.use( cors({origin: whitelist}));
app.use(busboy({highWaterMark: 2 * 1024 * 1024}));

require("./routes/routes.api.images").routesConfig(app);

app.listen( process.env.PORT ||  8080, () => console.log("listening on port 8080"));