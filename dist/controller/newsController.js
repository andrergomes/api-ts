"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = require("../services/newsService");
const HttpStatus = require("http-status");
const helper_1 = require("../infra/helper");
const redis = require("redis");
class NewsController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let client = redis.createClient(6379, '192.168.99.100');
                yield client.get('news', function (err, reply) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (reply) {
                            console.log('redis');
                            helper_1.default.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                        }
                        else {
                            console.log('db');
                            let result = newsService_1.default.get();
                            client.set('news', JSON.stringify(result));
                            //client.expire('news', 20);
                            helper_1.default.sendResponse(res, HttpStatus.OK, result);
                        }
                    });
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                let result = yield newsService_1.default.getById(_id);
                helper_1.default.sendResponse(res, HttpStatus.OK, result);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let news = req.body;
                yield newsService_1.default.create(news);
                helper_1.default.sendResponse(res, HttpStatus.OK, 'Notícia cadastrada com sucesso!');
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                let news = req.body;
                yield newsService_1.default.update(_id, news);
                helper_1.default.sendResponse(res, HttpStatus.OK, 'Notícia atualizada com sucesso!');
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                yield newsService_1.default.delete(_id);
                helper_1.default.sendResponse(res, HttpStatus.OK, 'Notícia excluída com sucesso!');
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = new NewsController();
