import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly role: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  readonly customer: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
