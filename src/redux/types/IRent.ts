import {IStaff} from "./IStaff";
import {IBicycles} from "./IBicycles";
import {IClient} from "./IClient";

export type IRent = {
    id: number,
    employ: IStaff,
    bicycle: IBicycles,
    client: IClient,
    rent_type: {
        id: number,
        name: string
    },
    price: number,
    start_of_rental: string,
    end_of_rental: string,
}