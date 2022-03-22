import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export declare interface ResponseModel<T = any> {
    code: number;
    data?: T;
    msg?: string;
}

export declare interface PageQuery {
    // 当前页
    page?: number,
    // 每页大小
    pageSize?: number,
    // 升序排列
    asc?: boolean
}

/**
 * PageQueryRes对应Java后端的MybatisPlus框架的的IPage响应格式
 * @link https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/metadata/IPage.java
 */
export declare interface PageQueryRes<T = any> {
    total: number,
    size: number,
    current: number,
    orders: Array<any>,
    optimizeCountSql: boolean,
    searchCount: boolean,
    countId: number | null,
    maxLimit: number | null,
    pages: number,
    records: Array<T>
}

export type errorHandle = (e: any) => Promise<any>

/**
 * 默认的get/post/put/patch/delete方法需要自行try/catch，否则出现异常会终止流程
 * 若业务不需要捕获异常，即使出现异常也需要继续往下执行请使用unsafeGet/unsafePost等方法
 */
export class LogicAxios {

    _instance: AxiosInstance
    private _errorHandle: errorHandle

    constructor(instance: AxiosInstance, errorHandle: errorHandle) {
        this._instance = instance
        this._errorHandle = errorHandle
    }

    get instance(): AxiosInstance {
        return this._instance;
    }

    get errorHandle(): (e: any) => Promise<any> {
        return this._errorHandle;
    }

    set errorHandle(value: (e: any) => Promise<any>) {
        this._errorHandle = value;
    }

    request<T>(config: AxiosRequestConfig): Promise<T> {
        return this._instance(config).then((response: AxiosResponse) => response.data).catch(error => (error));
    }

    async unsafeRequest<T = any>(r: <T = any>(path: string, data?: any, options?: AxiosRequestConfig) => Promise<T>, path: string,
                                 data?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig) {
        try {
            return await r<T>(path, data, options);
        } catch (e: any) {
            return errorHandle != null ? errorHandle(e) : console.error(e)
        }
    }

    get<T = any>(path: string, params?: any, options?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({
            ...options,
            method: 'GET',
            url: path,
            params: params
        })
    }

    page(path: string, params?: PageQuery, options?: AxiosRequestConfig): Promise<PageQueryRes> {
        return this.get<PageQueryRes>(path, params, options)
    }

    post<T = any>(path: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({
            ...options,
            method: 'POST',
            url: path,
            data: data
        })
    }

    put<T = any>(path: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({
            ...options,
            method: 'PUT',
            url: path,
            data: data
        })
    }

    patch<T = any>(path: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({
            ...options,
            method: 'PATCH',
            url: path,
            data: data
        })
    }

    delete<T = any>(path: string, params?: any, options?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({
            ...options,
            method: 'DELETE',
            url: path,
            params: params
        })
    }

    unsafeCatch(e: any, errorHandle?: errorHandle) {
        return errorHandle != null ? errorHandle(e) : console.error(e)
    }

    async unsafeGet<T = any>(path: string, params?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<T | void> {
        try {
            return await this.get(path, params, options);
        } catch (e: any) {
            return this.unsafeCatch(e, errorHandle)
        }
    }

    async unsafePost<T = any>(path: string, data?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<T | void> {
        try {
            return await this.post(path, data, options);
        } catch (e: any) {
            return this.unsafeCatch(e, errorHandle)
        }
    }

    async unsafePut<T = any>(path: string, data?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<T | void> {
        try {
            return await this.put(path, data, options);
        } catch (e: any) {
            return this.unsafeCatch(e, errorHandle)
        }
    }

    async unsafePatch<T = any>(path: string, data?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<T | void> {
        try {
            return await this.patch(path, data, options);
        } catch (e: any) {
            return this.unsafeCatch(e, errorHandle)
        }
    }

    async unsafeDelete<T = any>(path: string, params?: any, errorHandle?: errorHandle, options?: AxiosRequestConfig): Promise<T | void> {
        try {
            return await this.delete(path, params, options);
        } catch (e: any) {
            return this.unsafeCatch(e, errorHandle)
        }
    }

}

export const createLogicAxios = (baseURL: string, timeout: number = 3000, errorHandle?: errorHandle,
                                 options?: AxiosRequestConfig): LogicAxios => {
    if (!errorHandle) {
        errorHandle = (e) => {
            return Promise.reject(e)
        }
    }
    return new LogicAxios(axios.create({
        baseURL: baseURL,
        withCredentials: false,
        timeout: timeout,
        ...options
    }), errorHandle)
}
