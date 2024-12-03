import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  Request,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import * as fs from 'fs';
import multer from 'multer';
import path from 'path';
import {promisify} from 'util';
import {Produit} from '../models';
import {ProduitRepository} from '../repositories';

// Configure the storage destination for uploaded files
const uploadDir = path.join(__dirname, '../../public/images');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {recursive: true});
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({storage});


export class ProduitController {
  constructor(
    @repository(ProduitRepository)
    public produitRepository: ProduitRepository,
  ) { }

  @post('/produits')
  @response(200, {
    description: 'Produit model instance',
    content: {'application/json': {schema: getModelSchemaRef(Produit)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produit, {
            title: 'NewProduit',
            exclude: ['produit_id'],
          }),
        },
      },
    })
    produit: Omit<Produit, 'id'>,
  ): Promise<Produit> {
    return this.produitRepository.create(produit);
  }

  @get('/produits/count')
  @response(200, {
    description: 'Produit model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Produit) where?: Where<Produit>,
  ): Promise<Count> {
    return this.produitRepository.count(where);
  }

  @get('/produits')
  @response(200, {
    description: 'Array of Produit model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Produit, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Produit) filter?: Filter<Produit>,
  ): Promise<Produit[]> {
    return this.produitRepository.find(filter);
  }

  @patch('/produits')
  @response(200, {
    description: 'Produit PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produit, {partial: true}),
        },
      },
    })
    produit: Produit,
    @param.where(Produit) where?: Where<Produit>,
  ): Promise<Count> {
    return this.produitRepository.updateAll(produit, where);
  }

  @get('/produits/{id}')
  @response(200, {
    description: 'Produit model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Produit, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Produit, {exclude: 'where'}) filter?: FilterExcludingWhere<Produit>
  ): Promise<Produit> {
    return this.produitRepository.findById(id, filter);
  }

  @patch('/produits/{id}')
  @response(204, {
    description: 'Produit PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produit, {partial: true}),
        },
      },
    })
    produit: Produit,
  ): Promise<void> {
    await this.produitRepository.updateById(id, produit);
  }

  @put('/produits/{id}')
  @response(204, {
    description: 'Produit PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() produit: Produit,
  ): Promise<void> {
    await this.produitRepository.replaceById(id, produit);
  }

  @del('/produits/{id}')
  @response(204, {
    description: 'Produit DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.produitRepository.deleteById(id);
  }

  // File upload method
  @post('/products/{id}/upload', {
    responses: {
      '200': {
        description: 'Image uploaded successfully',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async uploadImage(
    @param.path.string('id') produit_id: number,
    @requestBody({
      description: 'Upload a product image',
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: {type: 'string', format: 'binary'},
            },
          },
        },
      },
    })
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    const multerMiddleware = promisify(upload.single('file'));

    // Handle the file upload
    await multerMiddleware(request as any, response as any);

    const file = (request as any).file;
    if (!file) {
      throw new Error('No file uploaded');
    }

    // Update the product with the file path
    const imageUrl = `/images/${file.filename}`;
    await this.produitRepository.updateById(produit_id, {image_url: imageUrl});

    return {message: 'File uploaded successfully', imageUrl};
  }
}
