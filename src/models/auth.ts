export interface LoginPayload {
	email: string
	password: string,
	remember_me: boolean
}

export interface RegisterPayload extends LoginPayload {
	birthday?: string
	phone?: number
	job?: string
}