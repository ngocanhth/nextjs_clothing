export interface LoginPayload {
	email: string
	password: string
}

export interface RegisterPayload extends LoginPayload {
	birthday?: string
	phone?: number
	job?: string
}