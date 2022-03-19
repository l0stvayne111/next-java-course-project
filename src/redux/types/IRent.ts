import {IStaff} from "./IStaff";
import {IBicycles} from "./IBicycles";
import {IClient} from "./IClient";
import {IType} from "./IType";

export type IRent = {
    id: number,
    employ: IStaff,
    bicycle: IBicycles,
    client: IClient,
    rent_type: IType,
    price: number | string,
    start_of_rental: string,
    end_of_rental: string,
    house?: string | number,
    model?: string,
    rental_price?: number | string,
    bicycle_type?: IType
}