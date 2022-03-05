import { toast } from "react-toastify";

export const created = () => {
    toast.success("Successfuly created")
}

export const updated = () => {
    toast.success("Successfuly updated")
}

export const failed = () => {
    toast.error("Something wents wrong")
}
