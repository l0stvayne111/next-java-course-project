import { IModal } from "../../redux/types/IModal";

export const getModal = (arr: Array<IModal>, value: string) => {
    let result = arr.filter((modal: IModal) => modal.id === value);
    return result.length ? result[0] : {id: 'default', isOpen: false};
}