import {Entity, model, property} from '@loopback/repository';

@model()
export class Produit extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  produit_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nom_produit: string;

  @property({
    type: 'number',
    required: true,
  })
  prix: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  image_url?: string;

  @property({
    type: 'date',
    required: true,
  })
  create_date: string;

  @property({
    type: 'date',
    required: true,
  })
  update_date: string;

  constructor(data?: Partial<Produit>) {
    super(data);
  }
}

export interface ProduitRelations {
  // describe navigational properties here
}

export type ProduitWithRelations = Produit & ProduitRelations;
