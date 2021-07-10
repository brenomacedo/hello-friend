import { AxiosError } from "axios"
import { toast } from "react-toastify"

export default function ThrowAxiosErrors(e: any) {
    const errors = e as AxiosError

    if(!errors.response)
        return toast.error('An error ocurred unfollowing this category, please try again')
    else {
        errors.response.data.errors.forEach((error: string) => {
            toast.error(error)
        })
    }
}
