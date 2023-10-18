import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, LoginDto, RegisterDto } from './auth.dto';

@ApiTags('auth')
@ApiConsumes('application/json')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Login user' })
  @ApiOkResponse({
    type: AuthResponse,
    description: 'fetched success',
  })
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Register user' })
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('doctor')
  loginDoctor(@Body() data: LoginDto) {
    return this.authService.loginDoctor(data);
  }

  @Post('admin')
  loginAdmin(@Body() data: LoginDto) {
    return this.authService.loginAdmin(data);
  }
}
