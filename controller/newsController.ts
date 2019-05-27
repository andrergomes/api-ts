import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';
import Helper from '../infra/helper';
import * as redis from 'redis';

class NewsController {

    get(req, res) {
        let client = redis.createClient(6379,'192.168.99.100');

        client.get('news', function (err, reply) {
            if (reply) {
                console.log('redis');
                Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));

            } else {
                console.log('db');
                
                NewsService.get()
                    .then(news => {
                        client.set('news', JSON.stringify(news));
                        //client.expire('news', 20);
                        Helper.sendResponse(res, HttpStatus.OK, news);
                    })    
                    .catch(error => console.error.bind(console, `Error ${error}`));
            }
        });

    }

    getById(req, res) {
        const _id = req.params.id;

        NewsService.getById(_id)
            .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    create(req, res) {
        let news = req.body;

        NewsService.create(news)
            .then(news => Helper.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    update(req, res) {
        const _id = req.params.id;
        let news = req.body;

        NewsService.update(_id, news)
            .then(news => Helper.sendResponse(res, HttpStatus.OK, 'Notícia atualizada com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    delete(req, res) {
        const _id = req.params.id;

        NewsService.delete(_id)
            .then(news => Helper.sendResponse(res, HttpStatus.OK, 'Notícia removida com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
}

export default new NewsController();