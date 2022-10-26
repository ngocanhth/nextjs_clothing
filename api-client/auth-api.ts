import { LoginPayload, RegisterPayload } from '@/models'
import axiosClient from './axios-client'

export const authApi = {
	register(payload: RegisterPayload) {
		return axiosClient.post('/auth/register', payload)
	},

	login(payload: LoginPayload) {
		return axiosClient.post('/auth/login', payload)
	},

	refreshToken() {
		return axiosClient.post('/auth/refresh-token')
	},

	logout() {
		return axiosClient.post('/logout')
	},

	getProfile() {
		return axiosClient.get('/profile')
	},
}
