import { authApi } from '@/api-client'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'
import { LoginPayload } from '../models'

// Auth --> Protected Pages
// <Auth>{children}</Auth>
export function useAuth(options?: Partial<PublicConfiguration>) {
	const {
		data: profile,
		error,
		mutate,
	} = useSWR('/user', {
		dedupingInterval: 60 * 60 * 1000, // 1hr
		revalidateOnFocus: false,
		...options,
	})

	const isLoading = profile === undefined && error === undefined

	async function login(payload: LoginPayload) {
		await authApi.login(payload)

		await mutate()
	}

	async function logout() {
		await authApi.logout()
		mutate(null, false)
	}

	return {
		profile,
		error,
		login,
		logout,
		isLoading,
	}
}
