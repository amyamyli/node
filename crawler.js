// 爬虫

var http = require('http');
var cheerio = require('cheerio'); // 类JQ 模块
var url = 'http://www.imooc.com/course/list?c=nodejs';

function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $('.course-card-container');
	var courseData = [];
	chapters.each(function(chapter){
		var chapter = $(this);
		var chapterTitle = chapter.find('.course-card-name').text();
		var content = chapter.find('p').text();
		var chapterData = {
			chapterTitle:chapterTitle,
			content:content
		}

		// videos.each(function(video){
		// 	var video = $(this).find('.studyvideo');
		// 	var videoTitle = video.text();
		// 	var id = video.attr('href').split('video/')[1];
		// 	chapterData.videos.push({
		// 		title:videoTitle,
		// 		id:id
		// 	})
		// })
		courseData.push(chapterData);
	});
	return courseData;
}

function printCourseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle;
		var content = item.content;
		console.log(chapterTitle + '\n');
		console.log(content + '\n');
		// item.videos.forEach(function(video){
		// 	console.log('['+video.id+']' + video.title + '\n');
		// });
	});
}
http.get(url,function(res){
	var html = '';
	res.on('data',function(data){
		html += data; 
	});
	res.on('end',function(){
		console.log(html);  // 爬取到的页面源码
		var courseData = filterChapters(html); // 组装页面爬取的重点信息
		printCourseInfo(courseData); //打印爬取信息
	})
}).on('error',function(){
	console.log('获取课程数据出错！');
})