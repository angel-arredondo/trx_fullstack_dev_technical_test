
interface Options {
    message: string;
    name: string;
}
export class CustomError extends Error {
    constructor(public readonly options: Options) {
        const { name, message } = options
        super(message)
        this.name = name
    }

    static mapper(message: string) {
        return new CustomError({
            name: "MapperError",
            message
        })
    }

    static dto(message: string) {
        return new CustomError({
            name: "DtoError",
            message
        })
    }

    static fetch(message: string){
        return new CustomError({
            name: "FetchError",
            message
        })
    }

}