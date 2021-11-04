import { Field, ID, ObjectType, registerEnumType } from "type-graphql"
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { UserGender } from "../enums"
import { Profile } from "./Profile"

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

  @Field(() => String, { nullable: true })
  @Column()
  gender: UserGender

  @Column()
  password!: string

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
