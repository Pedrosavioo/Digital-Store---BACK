export interface IUser {
   id?: number
   firstname: string,
   surname: string,
   email: string,
   password: string,
};

export interface ICategory {
   id?: number
   name: string,
   slug: string,
   use_in_menu: boolean,
};