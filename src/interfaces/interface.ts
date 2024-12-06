// ||===================||
// ||       USER        ||
// ||===================||
export interface IUser {
   id?: number;
   firstname: string;
   surname: string;
   email: string;
   password: string;
}

// ||=======================||
// ||       CATEGORY        ||
// ||=======================||

export interface ICategory {
   id?: number;
   name: string;
   slug: string;
   use_in_menu: boolean;
}

// ||======================||
// ||       PRODUCT        ||
// ||======================||

export interface IProduct {
   id?: number;
   enabled: boolean;
   name: string;
   slug: string;
   stock: number;
   description: string;
   price: number;
   price_with_discount: number;
}

export interface IProductImages {
   type: string;
   content: string;
}

export interface IProductOptions {
   title: string;
   shape: string;
   radius: string;
   type: string;
   value: string[];
}