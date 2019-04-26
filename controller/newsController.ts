import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';

class NewsController {

    sendResponse = function(res, statusCode, data) {
        res.status(statusCode).json({ result: data });
    };

    get(req, res) {
        NewsService.get()
            .then(news => this.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    getById(req, res) {
        const _id = req.params.id;

        NewsService.getById(_id)
            .then(news => this.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    create(req, res) {
        let news = req.body;

        NewsService.create(news)
            .then(news => this.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    update(req, res) {
        let _id = req.params.id;
        let news = req.body;

        NewsService.update(_id, news)
            .then(news => this.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    delete(req, res) {
        let _id = req.params.id;        

        NewsService.delete(_id)
            .then(news => this.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
}

export default new NewsController();