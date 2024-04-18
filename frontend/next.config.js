/** @type {import('next').NextConfig} */
module.exports = {
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			config.optimization.minimize = false
		}

		return config
	}
}
