export declare const envConfig: (() => {
    node_env: string;
    port: number;
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        autoLoadEntities: boolean;
        synchronize: boolean;
    };
    system_name: string;
    cors_origin: string;
    jwt_secret_key: string;
    jwt_expires_time: string;
    upload_path: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    node_env: string;
    port: number;
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        autoLoadEntities: boolean;
        synchronize: boolean;
    };
    system_name: string;
    cors_origin: string;
    jwt_secret_key: string;
    jwt_expires_time: string;
    upload_path: string;
}>;
