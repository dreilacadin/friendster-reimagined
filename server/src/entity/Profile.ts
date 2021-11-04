import { Field, ID, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import { User } from "./User"

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ nullable: true })
  address: string

  @Field()
  @Column({ type: "int", default: 0 })
  views: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo: string

  @OneToOne(() => User, (user) => user.profile)
  user: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @CreateDateColumn()
  updatedAt: Date
}
