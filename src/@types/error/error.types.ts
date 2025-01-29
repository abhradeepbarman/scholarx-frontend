export interface ErrorType {
    status: number;
    data: {
        status: number;
        message: string;
        success: boolean;
    };
}
