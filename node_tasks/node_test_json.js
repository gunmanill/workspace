module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');

	grunt.registerTask('test_json', 'test_json', function () {

		var yeoman = grunt.config.get('yeoman');
		grunt.file.defaultEncoding = 'utf8';

		var testJson = {};
		testJson.post_list = [];

		testJson.post_fiter = [
			{
				id : 1,
				name : 'video'
			},
			{
				id : 2,
				name : 'text'
			},
			{
				id : 3,
				name : 'collection'
			},
			{
				id : 4,
				name : 'result'
			},
			{
				id : 5,
				name : 'event'
			},
			{
				id : 6,
				name : 'gallery'
			}
		]

		for (var i = 0; i < 50; i++) {
			testJson.post_list.push(
				{
					name: 'post' + i,
					id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
					type: 'result',
					fade : true,
					img: {
						path: '/images/post-list/POPULAR_grid_2.png',
						width: '231',
						height: '303'
					},
					list: [
						{
							count: 40,
							text: 'First inactive variant'
						},
						{
							count: 60,
							text: 'Chosen variant'
						},
						{
							count: 30,
							text: 'Second inactive variant'
						},
						{
							count: 70,
							text: 'Third inactive variant'
						},
						{
							count: 80,
							text: 'Fourth inactive variant'
						}
					],
					total_voted: 280,
					author: {
						name: 'Michael',
						last_name: 'Covent',
						id: '1',
						user_pic : '/images/post-list/user_1.png'
					},
					description: 'Voting post result - a question in the header',
					time: '12:30'
				},
				{
					name: 'post' + i,
					id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
					type: 'event',
					img: {
						path: '/images/post-list/POPULAR_grid.png',
						width: '231',
						height: '303'
					},
					total_voted: 280,
					author: {
						name: 'Ciara',
						last_name: 'Brixton',
						id: '2',
						user_pic : '/images/post-list/user_2.png'
					},
					description: 'Event name in header',
					time: '12:30'
				},
				{
					name: 'post' + i,
					id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
					type: 'collection',
					img: {
						path: '/images/post-list/POPULAR_grid_1.png',
						width: '231',
						height: '303'
					},
					total_voted: 280,
					author: {
						name: 'Bryan',
						last_name: 'Depfort',
						id: '3',
						user_pic : '/images/post-list/user_3.png'
					},
					description: 'Collection',
					time: '12:30'
				},
				{
					name: 'post' + i,
					id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
					type: 'video',
					img: {
						path: '/images/post-list/POPULAR_grid_3.png',
						width: '231',
						height: '303'
					},
					total_voted: 280,
					author: {
						name: 'Ciara',
						last_name: 'Brixton',
						id: '4',
						user_pic : '/images/post-list/user_3.png'
					},
					description: 'Video post with play icon in the middle',
					time: '12:30'
				},
				{
					name: 'post' + i,
					id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
					type: 'gallery',
					img: {
						path: '/images/post-list/POPULAR_grid_4.png',
						width: '231',
						height: '303'
					},
					total_voted: 280,
					author: {
						name: 'Ken',
						last_name: 'Chelsea',
						id: '5',
						user_pic : '/images/post-list/user_5.png'
					},
					description: 'Gallery with 7 photos in it',
					time: '12:30'
				}
			);
		}

		grunt.file.write('./test-json/test.json', JSON.stringify(testJson));

	});
};