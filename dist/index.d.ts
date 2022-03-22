import { AxiosInstance, AxiosRequestConfig } from "axios";
export declare interface ResponseModel<T = any> {
    code: number;
    data?: T;
    msg?: string;
}
export declare interface PageQuery {
    page?: number;
    pageSize?: number;
    asc?: boolean;
}
/**
 * PageQueryRes对应Java后端的MybatisPlus框架的的IPage响应格式
 * @link https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/metadata/IPage.java
 */
export declare interface PageQueryRes<T = any> {
    total: number;
    size: number;
    current: number;
    orders: Array<any>;
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: number | null;
    maxLimit: number | null;
    pages: number;
    records: Array<T>;
}
export declare type errorHandle = (e: any) => Promise<any>;
/**
 * 默认的get/post/put/patch/delete方法需要自行try/catch，否则出现异常会终止流程
 * 若业务不需要捕获异常，即使出现异常也需要继续往下执行请使用unsafeGet/unsafePost等方法
 */
export declare class LogicAxios {
    _instance: AxiosInstance;
    private _errorHandle;
    constructor(instance: AxiosInstance, errorHandle: errorHandle);
    get instance(): AxiosInstance;
    get errorHandle(): (e: any) => Promise<any>;
    set errorHandle(value: (e: any) => Promise<any>);
    request<T>(config: AxiosRequestConfig): Promise<T>;
    unsafeRequest<T = any>(r: <T = any>(path: string, data?: any, options?: AxiosRequestConfig) => Promise<T>, path: string, data?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<any>;
    get<T = any>(path: string, params?: any, options?: AxiosRequestConfig): Promise<T>;
    page(path: string, params?: PageQuery, options?: AxiosRequestConfig): Promise<PageQueryRes>;
    post<T = any>(path: string, data?: any, options?: AxiosRequestConfig): Promise<T>;
    put<T = any>(path: string, data?: any, options?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(path: string, data?: any, options?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(path: string, params?: any, options?: AxiosRequestConfig): Promise<T>;
    unsafeCatch(e: any, errorHandle?: errorHandle): void | Promise<any>;
    unsafeGet<T = any>(path: string, params?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<T | void>;
    unsafePost<T = any>(path: string, data?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<T | void>;
    unsafePut<T = any>(path: string, data?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<T | void>;
    unsafePatch<T = any>(path: string, data?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<T | void>;
    unsafeDelete<T = any>(path: string, params?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<T | void>;
}
export declare const createLogicAxios: (baseURL: string, timeout?: number, errorHandle?: errorHandle | undefined, options?: AxiosRequestConfig<any> | undefined) => LogicAxios;
