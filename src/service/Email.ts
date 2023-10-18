import nodemailer from 'nodemailer';
import Config from '../config/Config';
import { ResponseError } from '../error/ResponseError';

export class Email{
    private host:string;
    private port:number;
    private user?:string;
    private pass?:string;

    private _from: string = "";
    private _to: string = "";
    private _subject: string = "";
    private _text: string = "";

    constructor(){
        this.host = Config.emailHost;
        this.port = Config.emailPort;
        this.user = Config.emailUser;
        this.pass = Config.emailPass;

    }

    public get from(): string {
        return this._from;
    }

    public set from(value: string) {
        this._from = value;
    }
    
    public get to(): string {
        return this._to;
    }
    public set to(value: string) {
        this._to = value;
    }
    
    public get subject(): string {
        return this._subject;
    }
    public set subject(value: string) {
        this._subject = value;
    }
    
    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        this._text = value;
    }

    async send(){
        const transporter = this.transporter();

        transporter.sendMail(this.mailOption(), (error:any, info:any) => {
            if (error) {
                throw new ResponseError(550, `Gagal Mengirim Email ${error}`);
              } else {
                return `Email terkirim:, ${info.response}`;
              }
        });
    }

    private transporter(){
        return nodemailer.createTransport({
            host: this.host,
            port : this.port,
            secure : false,
            auth: {
                user: this.user,
                pass: this.pass,
              },
        });
    }

    private mailOption(){
        return {
            from : this.from,
            to : this.to,
            subject : this.subject,
            test : this.text
        }
    }


}