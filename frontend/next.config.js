/** @type {import('next').NextConfig} */
module.exports = {
	env: {
		NODE_ENV: process.env.NODE_ENV || 'development'
	},
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'leonardo.osnova.io',
			'uajournal-post.s3.amazonaws.com',
			'uajournal-post.s3.eu-central-1.amazonaws.com'
		]
	}
}
