import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
} from "sequelize-typescript";

export interface token {
  userId: number;
  token: string;
}

@Table({
  tableName: "token",
  timestamps: false,
})
export class Token extends Model<token> {
  @PrimaryKey
  @Column
  userId: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  token: string;
}
