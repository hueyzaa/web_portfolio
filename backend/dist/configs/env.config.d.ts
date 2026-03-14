export declare const envConfig: (() => {
    port: number;
    database: {
        host: string | undefined;
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
        type: string;
        port: number;
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
        host: string | undefined;
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
        type: string;
        port: number;
        autoLoadEntities: boolean;
        synchronize: boolean;
    };
    system_name: string;
    system_frontend_url: string;
    jwt_secret_key: string;
    jwt_expires_time: string;
    upload_dir: string;
}>;
