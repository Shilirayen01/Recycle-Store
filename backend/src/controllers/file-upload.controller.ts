import {inject} from '@loopback/context';
import {post, Request, requestBody, Response, RestBindings} from '@loopback/rest';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import {v4 as uuidv4} from 'uuid';

const uploadPath = path.resolve(__dirname, '../../uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({storage});

export class FileUploadController {
  constructor() { }

  @post('/produits/upload', {
    responses: {
      '200': {
        description: 'File Upload Response',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async fileUpload(
    @requestBody({
      description: 'multipart/form-data value.',
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
    return new Promise<object>((resolve, reject) => {
      upload.single('file')(request, response, err => {
        if (err) {
          console.error('Multer error:', err);
          reject(err);
        } else {
          console.log('File Uploaded:', (request as any).file);
          resolve({
            filename: (request as any).file.filename,
            path: `/uploads/${(request as any).file.filename}`,
          });
        }
      });

    });
  }
}
