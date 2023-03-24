import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateSubDocDto } from 'src/products/dtos/subDoc.dtos';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly skills: any;
  @ApiProperty({ type: () => [CreateSubDocDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
