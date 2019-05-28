"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const newsController_1 = require("../controller/newsController");
const newsRouter = express.Router();
//news
newsRouter.route("/api/v1/news").get(newsController_1.default.get);
newsRouter.route("/api/v1/news/:id").get(newsController_1.default.getById);
newsRouter.route("/api/v1/news").post(newsController_1.default.create);
newsRouter.route("/api/v1/news/:id").put(newsController_1.default.update);
newsRouter.route("/api/v1/news/:id").delete(newsController_1.default.delete);
exports.default = newsRouter;
