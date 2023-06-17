export interface IRes<T> {
    code: string;
    message: string;
    data: T;
}