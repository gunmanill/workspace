var app = require('main:app');

module.exports = app.Model.extends({
	defaults: {
		menu_default : [
			{
				filter: 'popular',
				name: app.i18n('Header:menu', 'Popular')
			},
			{
				filter: 'posts',
				name: app.i18n('Header:menu', 'Posts')
			},
			{
				filter: 'event',
				name: app.i18n('Header:menu', 'Events')
			},
			{
				filter: 'collection',
				name: app.i18n('Header:menu', 'Collections')
			},
			{
				filter: 'gallery',
				name: app.i18n('Header:menu', 'Groups')
			},
			{
				filter: 'result',
				name: app.i18n('Header:menu', 'Blogs')
			},
			{
				filter: 'pages',
				name: app.i18n('Header:menu', 'Pages')
			}
		],
		menu_authorized: [
			{
				filter: 'feed',
				name: app.i18n('Header:menu', 'Feed')
			},
			{
				filter: 'media',
				name: app.i18n('Header:menu', 'Media')
			},
			{
				filter: 'levels',
				name: app.i18n('Header:menu', 'Levels')
			},
			{
				filter: 'events',
				name: app.i18n('Header:menu', 'Events')
			},
			{
				filter: 'result',
				name: app.i18n('Header:menu', 'Blogs')
			},
			{
				filter: 'gallery',
				name: app.i18n('Header:menu', 'Groups')
			},
			{
				filter: 'pages',
				name: app.i18n('Header:menu', 'Pages')
			},
			{
				filter: 'resumes',
				name: app.i18n('Header:menu', 'Resumes')
			},
			{
				filter: 'user_info',
				name: app.i18n('Header:menu', 'User_info')
			}
		]
	},
});