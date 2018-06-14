
export class Book {
  id: string;
  name : string;
  storeQuantity : number;
  cartQuantity: number;
  price : number;
  description: string;
  pictureName: string;
  date : Date;
  category: any;
 
  constructor(book:any){
    
      this.id = book._id;
      this.name = book.name;
      this.description = book.description;
      this.pictureName = book.pictureName;
      this.price = book.price;
      this.date = book.date;
      this.storeQuantity = book.quantity;
      this.cartQuantity = 0;
      this.category = book.category;
   }

   
 }