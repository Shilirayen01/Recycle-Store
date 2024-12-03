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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['user_id'],
          }),
        },
      },
    })
    user: Omit<User, 'user_id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @post('/login')
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {type: 'string'},
              password: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: {username: string; password: string},
  ): Promise<Partial<User>> {
    const {username, password} = credentials;

    const user = await this.userRepository.findOne({
      where: {username: username.toLowerCase()},
    });

    if (!user) {
      throw new HttpErrors.NotFound('User not found');
    }

    if (user.password !== password) {
      throw new HttpErrors.Unauthorized('Invalid credentials');
    }

    const {user_id, username: uname, role} = user;
    return {user_id, username: uname, role};
  }

  @post('/register')
  @response(200, {
    description: 'User registration',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async register(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              first_name: {type: 'string'},
              last_name: {type: 'string'},
              username: {type: 'string'},
              email: {type: 'string'},
              password: {type: 'string'},
              role: {type: 'string'},
            },
            required: ['username', 'email', 'password'],
          },
        },
      },
    })
    userData: Omit<User, 'user_id'>,
  ): Promise<Partial<User>> {
    const {username, email} = userData;

    // Check if username or email already exists
    const existingUser = await this.userRepository.findOne({
      where: {or: [{username: username.toLowerCase()}, {email}]},
    });

    if (existingUser) {
      throw new HttpErrors.Conflict('Username or email already exists');
    }

    // Save the new user
    const newUser = await this.userRepository.create({
      ...userData,
      username: username.toLowerCase(),
    });

    const {user_id, username: uname, role} = newUser;
    return {user_id, username: uname, role};
  }
}
