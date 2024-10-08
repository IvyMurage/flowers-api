import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateFlowerDto {
  @MaxLength(50)
  name: string;

  @MaxLength(50)
  color: string;

  @IsInt()
  price: number;

  @IsNumber()
  stock: number;

  @IsEnum(
    ['rose', 'tulip', 'daisy', 'lily', 'sunflower', 'hydrangea', 'lavender'],
    {
      message: 'Invalid flower type',
    },
  )
  type: string;

  @IsBoolean()
  onSale: boolean;

  @MaxLength(255)
  @IsUrl()
  image_url: string;
}
