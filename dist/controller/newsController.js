"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = require("../services/newsService");
const HttpStatus = require("http-status");
const helper_1 = require("../infra/helper");
const redis = require("redis");
class NewsController {
    get(req, res) {
        let client = redis.createClient(6379, '192.168.99.100');
        client.get('news', function (err, reply) {
            if (reply) {
                console.log('redis');
                helper_1.default.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
            }
            else {
                console.log('db');
                newsService_1.default.get()
                    .then(news => {
                    client.set('news', JSON.stringify(news));
                    //client.expire('news', 20);
                    helper_1.default.sendResponse(res, HttpStatus.OK, news);
                })
                    .catch(error => console.error.bind(console, `Error ${error}`));
            }
        });
    }
    getById(req, res) {
        const _id = req.params.id;
        newsService_1.default.getById(_id)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    create(req, res) {
        let news = req.body;
        newsService_1.default.create(news)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    update(req, res) {
        const _id = req.params.id;
        let news = req.body;
        newsService_1.default.update(_id, news)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, 'Notícia atualizada com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        newsService_1.default.delete(_id)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, 'Notícia removida com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
}
exports.default = new NewsController();
