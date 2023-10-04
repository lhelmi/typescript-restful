import { ResponseError } from "../error/response-error";

export class User{
    
    private _username!: string;
    private _email!: string;
    private _image!: string;
    private _password!: string;
    private _first_name!: string;
    private _last_name!: string;
    private _token!: string;

    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }
    
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    
    public get first_name(): string {
        return this._first_name;
    }
    public set first_name(value: string) {
        this._first_name = value;
    }
    
    public get last_name(): string {
        return this._last_name;
    }
    public set last_name(value: string) {
        this._last_name = value;
    }
    
    public get token(): string {
        return this._token;
    }
    public set token(value: string) {
        this._token = value;
    }
    
    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }

    
    
}