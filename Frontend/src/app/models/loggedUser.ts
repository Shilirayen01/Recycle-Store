export class LoggedUser {
    id!: number;
    
    constructor(
      public username: string,
      public role: string // Removed password field here
    ) {}
  }
  