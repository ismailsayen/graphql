import { LogOut } from "../js/auth/logOut.js";
import { failureToast } from "../js/notif/failureToast.js";

export function VerifyError(data) {
    if (!data) {
        failureToast('Error while fetch data please try later.')
        return false
    }

    if (data.errors && Array.isArray(data.errors)) {
        const jwtError = data.errors.find(
            (err) => err.extensions?.code === 'invalid-jwt'
        );
        if (jwtError) {
            failureToast('Looks like you need to log in again. Catch you later!');
            LogOut()
            return;
        }
    }
}