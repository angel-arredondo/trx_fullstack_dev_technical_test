
interface Options {
    statusCode: number;
    message: string;
    name: string;
}
export class CustomError extends Error {
    constructor(public readonly options: Options) {
        const { name, message } = options
        super(message)
        this.name = name
    }

    static badRequest(message: string) {
        return new CustomError({
            name: "BadRequest",
            message,
            statusCode: 400
        })
    }

    static unauthorized(message: string) {
        return new CustomError({
            name: "Unauthorized",
            message,
            statusCode: 401
        })
    }

    static notFound(message: string) {
        return new CustomError({
            name: "NotFound",
            message,
            statusCode: 404
        })
    }

    static internalServer(message: string = "Internal Server Error") {
        return new CustomError({
            name: "InternalServerError",
            message,
            statusCode: 500
        })
    }

}