import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from "sequelize-typescript";

export interface UserI{
    id?: number
    username: string
    password: string
}

@Table(
    {
        tableName: "user",
        timestamps: false
    }
)
export class User2 extends Model<UserI>{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number
    
    @AllowNull(false)
    @NotEmpty
    @Column
    username!: string


    @AllowNull(false)
    @NotEmpty
    @Column
    password!: string;

}
