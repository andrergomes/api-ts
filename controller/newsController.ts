import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';
import Helper from '../infra/helper';
import * as redis from 'redis';

class NewsController {

    async get(req, res) {
        try {
            let client = redis.createClient(6379, '192.168.99.100');
            await client.get('news', async function (err, reply) {
                if (reply) {
                    console.log('redis');
                    Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));

                } else {
                    console.log('db');
                    let result = NewsService.get();
                    client.set('news', JSON.stringify(result));
                    //client.expire('news', 20);
                    Helper.sendResponse(res, HttpStatus.OK, result);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async getById(req, res) {
        try {
            const _id = req.params.id;
            let result = await NewsService.getById(_id)
            Helper.sendResponse(res, HttpStatus.OK, result);

        } catch (error) {
            console.error(error);
        }
    }

    async create(req, res) {
        try {
            let news = req.body;
            await NewsService.create(news);
            Helper.sendResponse(res, HttpStatus.OK, 'Notícia cadastrada com sucesso!');

        } catch (error) {
            console.error(error);
        }
    }

    async update(req, res) {
        try {
            const _id = req.params.id;
            let news = req.body;
            await NewsService.update(_id, news);
            Helper.sendResponse(res, HttpStatus.OK, 'Notícia atualizada com sucesso!');

        } catch (error) {
            console.error(error);
        }
    }

    async delete(req, res) {
        try {
            const _id = req.params.id;
            await NewsService.delete(_id)
            Helper.sendResponse(res, HttpStatus.OK, 'Notícia excluída com sucesso!');

        } catch (error) {
            console.error(error);
        }
    }
}

export default new NewsController();