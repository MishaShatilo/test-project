import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
} from "sequelize-typescript";

export interface video {
  id?: number;
  userId: number;
  videoName: string;
  videoLink: string;
}

@Table({
  tableName: "video",
  timestamps: false,
})
export class Video extends Model<video> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  userId!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  videoName!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  videoLink!: string;
}
