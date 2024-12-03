import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RecycleBdDataSource} from '../datasources';
import {Produit, ProduitRelations} from '../models';

export class ProduitRepository extends DefaultCrudRepository<
  Produit,
  typeof Produit.prototype.produit_id,
  ProduitRelations
> {
  constructor(
    @inject('datasources.recycle_bd') dataSource: RecycleBdDataSource,
  ) {
    super(Produit, dataSource);
  }
}
