export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: number;
    message: string;
    success: boolean;
    data: {
        id: string;
        role: string;
        access_token: string;
    };
}
