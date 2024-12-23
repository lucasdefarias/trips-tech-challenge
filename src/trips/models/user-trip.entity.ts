import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from './trip.interface';
import { TripType } from './trip-type.type';
import { MinLength, MaxLength, IsString, Min } from 'class-validator';

@Entity({ name: 'trip' })
export class UserTrip implements Trip {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column('varchar')
  @MinLength(3)
  @MaxLength(3)
  @IsString()
  public origin: string;

  @Column('varchar')
  @MinLength(3)
  @MaxLength(3)
  @IsString()
  public destination: string;

  @Column('float')
  @Min(0)
  public cost: number;

  @Column('float')
  @Min(0)
  public duration: number;

  @Column('varchar')
  @IsString()
  public type: TripType;

  @Column('varchar')
  @MaxLength(255)
  @IsString()
  public display_name: string;
}
