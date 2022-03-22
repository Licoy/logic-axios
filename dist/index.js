import axios from "axios";
/**
 * 默认的get/post/put/patch/delete方法需要自行try/catch，否则出现异常会终止流程
 * 若业务不需要捕获异常，即使出现异常也需要继续往下执行请使用unsafeGet/unsafePost等方法
 */
export class LogicAxios {
    _instance;
    _errorHandle;
    constructor(instance, errorHandle) {
        this._instance = instance;
        this._errorHandle = errorHandle;
    }
    get instance() {
        return this._instance;
    }
    get errorHandle() {
        return this._errorHandle;
    }
    set errorHandle(value) {
        this._errorHandle = value;
    }
    request(config) {
        return this._instance(config).then((response) => response.data).catch(error => (error));
    }
    async unsafeRequest(r, path, data, errorHandle, options) {
        try {
            return await r(path, data, options);
        }
        catch (e) {
            return errorHandle != null ? errorHandle(e) : console.error(e);
        }
    }
    get(path, params, options) {
        return this.request({
            ...options,
            method: 'GET',
            url: path,
            params: params
        });
    }
    page(path, params, options) {
        return this.get(path, params, options);
    }
    post(path, data, options) {
        return this.request({
            ...options,
            method: 'POST',
            url: path,
            data: data
        });
    }
    put(path, data, options) {
        return this.request({
            ...options,
            method: 'PUT',
            url: path,
            data: data
        });
    }
    patch(path, data, options) {
        return this.request({
            ...options,
            method: 'PATCH',
            url: path,
            data: data
        });
    }
    delete(path, params, options) {
        return this.request({
            ...options,
            method: 'DELETE',
            url: path,
            params: params
        });
    }
    unsafeGet(path, params, errorHandle, options) {
        return this.unsafeRequest(this.get, path, params, errorHandle, options);
    }
    unsafePost(path, data, errorHandle, options) {
        return this.unsafeRequest(this.post, path, data, errorHandle, options);
    }
    unsafePut(path, data, errorHandle, options) {
        return this.unsafeRequest(this.put, path, data, errorHandle, options);
    }
    unsafePatch(path, data, errorHandle, options) {
        return this.unsafeRequest(this.patch, path, data, errorHandle, options);
    }
    unsafeDelete(path, params, errorHandle, options) {
        return this.unsafeRequest(this.delete, path, params, errorHandle, options);
    }
}
export const createLogicAxios = (baseURL, timeout = 3000, errorHandle, options) => {
    if (errorHandle == null) {
        errorHandle = (e) => {
            return Promise.reject(e);
        };
    }
    return new LogicAxios(axios.create({
        baseURL: baseURL,
        withCredentials: false,
        timeout: timeout,
        ...options
    }), errorHandle);
};
//# sourceMappingURL=index.js.map