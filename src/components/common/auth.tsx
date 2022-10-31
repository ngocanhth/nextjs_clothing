import { useAuth } from '@/src/hooks'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export interface AuthProps {
	children: any
}

export function Auth({ children }: AuthProps) {
	const router = useRouter()
	const { profile, isLoading } = useAuth()

	useEffect(() => {
		if (!isLoading && !profile) router.push('/')
	}, [router, profile, isLoading])

	if (!profile) return <p>Loading...</p>

	return <div>{children}</div>
}
