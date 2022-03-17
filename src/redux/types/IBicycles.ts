export type IBicycles = {
    id: number,
    model: string,
    rental_price: number,
    bicycle_type: {
        id: number,
        name: string,
    }
}