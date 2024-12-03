export class User {
    id!: number;


    constructor(
    public first_name: string,
    public last_name: string,
    public username: string, // Add password field
    public email: string,
    public password: string, // Add password field
    public role: string
    ){

    }
  }