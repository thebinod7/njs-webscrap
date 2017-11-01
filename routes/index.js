const express = require('express');
const router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
const scrapeIt = require("scrape-it");
var fs = require('fs');

router.get('/',function (req,res) {
    res.render('index');
});

router.get('/scrape', function(req, res){

    request('https://news.ycombinator.com', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('span.comhead').each(function(i, element){
                var a = $(this).prev();
                var rank = a.parent().parent().text();
                var title = a.text();
                var url = a.attr('href');
                var subtext = a.parent().parent().next().children('.subtext').children();
                var points = $(subtext).eq(0).text();
                var username = $(subtext).eq(1).text();
                var comments = $(subtext).eq(2).text();
                // Our parsed meta data object
                var metadata = {
                    rank: parseInt(rank),
                    title: title,
                    url: url,
                    points: parseInt(points),
                    username: username,
                    comments: parseInt(comments)
                };
                console.log(metadata);
            });
        }
    });
});

router.get('/europe-country', function(req, res){
    const url = 'https://www.countries-ofthe-world.com/countries-of-europe.html';
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var aa = $('li', '.column').text();
            console.log(aa);
            res.send('Check console mate!!!');
        }
    });
});

router.get('/realagents', function(req, res){
    const url = 'http://www.realagents.com/';
    request(url, function (error, response, html) {
      console.log(html);
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            const titles = [];
            $('.properties__address-street').each(function(i, elem) {
              titles[i] = $(this).text();
            });
            titles.join(',');
            console.log('PROPERTY TITLES:' + '\r\n',titles);
            res.send('Check your console !!!');
        }
    });
});

module.exports = router;
