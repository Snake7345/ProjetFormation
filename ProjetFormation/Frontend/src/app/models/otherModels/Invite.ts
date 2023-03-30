export class Invite {
  mail: string;
  password: number;

  constructor(mail: string, password: number) {
    this.mail = mail;
    this.password = password;
  }
}
