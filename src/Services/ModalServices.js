import { result } from "lodash"
import Swal from "sweetalert2"

class Modal {
    async delete(text="Are you shure"){
        result = await Swal.fire({
            title: 'Do you really want to delete this row?',
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cencel`,
        })
        return result
    }
}

export const moadalService = new Modal()