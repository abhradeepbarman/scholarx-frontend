export interface RegisterInput {
    email: string;
    password: string;
}

export interface RegisterResponse {
    status: number;
    message: string;
    success: boolean;
    data: {
        id: string;
        role: string;
        access_token: string;
    };
}
