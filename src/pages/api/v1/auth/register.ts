// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	message: string
}

export const config = {
	api: {
		bodyParser: false,
	},
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		return res.status(404).json({ message: 'method not supported' })
	}

	return new Promise((resolve) => {
		// console.log('testapi');
		
		// don't send cookies to API server
		req.headers.cookie = ''

		const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
			let body = ''
			proxyRes.on('data', function (chunk) {
				//  console.log("proxyRes", proxyRes);
				body += chunk
			})

			proxyRes.on('end', function () {
				try {
					// console.log(proxyRes);
					const isSuccess =
						proxyRes.statusCode && proxyRes.statusCode >= 200 && proxyRes.statusCode < 300
					if (!isSuccess) {
						;(res as NextApiResponse).status(proxyRes.statusCode || 500).json(body)
						return resolve(true)
					}

					const { access_token, exp } = JSON.parse(body)
					const decoded = jwtDecode<JwtPayload>(access_token)
					
					console.log("decoded", decoded);

					// console.log({ access_token, refresh_token, err, mes, exp });

					// convert token to cookies
					const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' })
					cookies.set('access_token', access_token, {
						httpOnly: true,
						sameSite: 'lax',
						expires: new Date(exp),
					})
					;(res as NextApiResponse).status(200).json({ message: 'register successfully' })
				} catch (error: any) {
					;(res as NextApiResponse).status(500).json({ message: error.message as string })
				}

				resolve(true)
			})
		}

		proxy.once('proxyRes', handleLoginResponse)
		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: true,
		})
	})
}
