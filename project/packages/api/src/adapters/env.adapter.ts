import { get } from 'env-var'
export const envs = Object.freeze({
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    MONGO_PARAMS: get('MONGO_PARAMS').required().asString(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    PORT: get('PORT').required().asString(),
})