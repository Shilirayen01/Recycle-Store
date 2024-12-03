export class Product {
   public produit_id?: number; // Optional for new products
   public nom_produit!: string;
   public prix!: number;
   public description!: string;
   public image_url!: string;
   public create_date!: Date;
   public update_date!: Date | null;

   constructor(
    nom_produit: string,
    image_url: string,
    prix: number,
    description: string,
    create_date: Date,
    update_date: Date,
   ){
    this.nom_produit = nom_produit;
    this.image_url = image_url;
    this.prix = prix;
    this.description = description;
    this.create_date = create_date;
    this.update_date = update_date;
   }


  }
  