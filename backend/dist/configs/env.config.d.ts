export declare const envConfig: (() => {
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
    system_frontend_url: string;
    jwt_secret_key: string;
    jwt_expires_time: string;
    upload_dir: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
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
    system_frontend_url: string;
    jwt_secret_key: string;
    jwt_expires_time: string;
    upload_dir: string;
}>;
