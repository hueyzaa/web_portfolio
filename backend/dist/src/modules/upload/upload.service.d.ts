export declare class UploadService {
    getMulterOptions(): {
        storage: import("multer").StorageEngine;
        fileFilter: (req: any, file: {
            originalname: string;
        }, callback: (error: Error | null, acceptFile: boolean) => void) => void;
        limits: {
            fileSize: number;
        };
    };
}
