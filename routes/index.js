const express = require('express');
const router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
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

router.get('/europe_country', function(req, res){
    request('https://www.countries-ofthe-world.com/countries-of-europe.html', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
           // var aa = $('li', '.column').text();
            $('li', '.column').each(function(i, items_list){

                $(items_list).find('li').each(function(j, li){
                    console.log(li.text());
                });
            });
          //  console.log('data:' + aa);
            res.send('Check console mate!!!');
        }
    });
});

module.exports = router;