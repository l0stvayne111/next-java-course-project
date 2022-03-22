import axios from "axios";

class Api {

    BASE_URL = `http://localhost:4567/api/v1/`;
    CLIENTS_URL = `clients/`;
    STAFF_URL = `employs/`;
    BICYCLES_URL = `bicycle/`;

    BICYCLES_TYPE_URL = `bicycle_types/`;
    RENTS_TYPE_URL = `rent_types/`;

    RENTS_URL = `rents/`;

    api = axios.create({
        baseURL: this.BASE_URL,
    })

    getClients() {
        return this.api.get(this.CLIENTS_URL)
            .then(res => {
                return res.data
            })
    }

    deleteClient(_id: number) {
        return this.api.delete(`${this.CLIENTS_URL}${_id}/`)
            .then(res => {
                return res.data
            })
    }

    patchClient(action: { _id: number, data: { name: string, phone: string } }) {
        return this.api.put(`${this.CLIENTS_URL}${action._id}/`, action.data)
            .then(res => {
                return res.data
            })
    }

    postClient(action: { name: string, phone: string }) {
        return this.api.post(this.CLIENTS_URL, action).then(res => {
            return res.data;
        });
    }


    getStaff() {
        return this.api.get(this.STAFF_URL)
            .then(res => {
                return res.data
            })
    }

    deleteStaff(_id: number) {
        return this.api.delete(`${this.STAFF_URL}${_id}/`)
            .then(res => {
                return res.data
            })
    }

    patchStaff(action: { _id: number, data: { name: string, phone: string } }) {
        return this.api.put(`${this.STAFF_URL}${action._id}/`, action.data)
            .then(res => {
                return res.data
            })
    }

    postStaff(action: { name: string, phone: string }) {
        return this.api.post(this.STAFF_URL, action).then(res => {
            return res.data;
        });
    }

    getBicycles() {
        return this.api.get(this.BICYCLES_URL)
            .then(res => {
                return res.data
            })
    }

    deleteBicycles(_id: number) {
        return this.api.delete(`${this.BICYCLES_URL}${_id}/`)
            .then(res => {
                return res.data
            })
    }

    patchBicycles(action: {
        _id: number, data:
            {
                model: string,
                rental_price: number,
                bicycle_type: {
                    id: number,
                    name: string
                }
            }
    }) {
        return this.api.put(`${this.BICYCLES_URL}${action._id}/`, action.data)
            .then(res => {
                return res.data;
            })
    }

    postBicycles(action: {
        model: string,
        rental_price: number,
        bicycle_type: {
            id: number,
            name: string
        }
    }) {

        return this.api.post(this.BICYCLES_URL, action)
            .then(res => {
                return res.data
            })
    }


    getBicyclesType() {
        return this.api.get(this.BICYCLES_TYPE_URL)
            .then(res => {
                return res.data
            })
    }

    postBicyclesType(action: { name: string }) {
        return this.api.post(this.BICYCLES_TYPE_URL, action)
            .then(res => {
                return res.data
            })
    }

    patchBicyclesType(action: { _id: number, data: { name: string } }) {
        return this.api.put(`${this.BICYCLES_TYPE_URL}${action._id}/`, action.data)
            .then(res => {
                return res.data
            })
    }

    deleteBicyclesType(_id: number) {
        return this.api.delete(`${this.BICYCLES_TYPE_URL}${_id}/`)
            .then(res => {
                return res.data
            })
    }

    getRentsType() {
        return this.api.get(this.RENTS_TYPE_URL)
            .then(res => {
                return res.data
            })
    }

    postRentsType(action: { name: string }) {
        return this.api.post(this.RENTS_TYPE_URL, action)
            .then(res => {
                return res.data
            })
    }

    patchRentsType(action: { _id: number, data: { name: string } }) {
        return this.api.put(`${this.RENTS_TYPE_URL}${action._id}/`, action.data)
            .then(res => {
                return res.data
            })
    }

    deleteRentsType(_id: number) {
        return this.api.delete(`${this.RENTS_TYPE_URL}${_id}/`)
            .then(res => {
                return res.data
            })
    }


    getRents() {
        return this.api.get(this.RENTS_URL)
            .then(res => {
                return res.data;
            })
    }

    deleteRent(id: number) {
        return this.api.delete(`${this.RENTS_URL}${id}/`).then(res => {
            return res.data
        })
    }

    patchRent(action: { _id: number, data: any }){
        return this.api.put(`${this.RENTS_URL}${action._id}/`, action.data).then(res => {
            return res.data;
        })
    }

    postRent(action: {payload:any}){
        return this.api.post(this.RENTS_URL, action.payload).then(res => {
            return res.data;
        })
    }



}

export const API = new Api();