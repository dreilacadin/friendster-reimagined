import { Field, ID, ObjectType, registerEnumType } from "type-graphql"
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { UserGender } from "../enums"

registerEnumType(UserGender, {
  name: "UserGender",
  description: "Gender options"
})

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field()
  @Column({ unique: true })
  username!: string

  @Field()
  @Column({ unique: true })
  email!: string

  @Field()
  @Column()
  firstName!: string

  @Field()
  @Column()
  lastName!: string

  @Field()
  @Column()
  dateOfBirth!: Date

  @Field(() => UserGender, { nullable: true })
  @Column()
  gender: UserGender

  @Column()
  password!: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
