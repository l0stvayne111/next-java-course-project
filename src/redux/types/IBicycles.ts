import {IType} from "./IType";

export type IBicycles = {
    id: number,
    model: string,
    rental_price: number | string,
    bicycle_type: IType
}