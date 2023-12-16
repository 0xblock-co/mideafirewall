import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

export const newInfoAlert = (title, message, actionButtonText, icon, isCancelBtn = false, cancelButtonText = "Cancel", isBackDropAllow = true) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: title,
            text: message,
            icon: icon,
            confirmButtonText: actionButtonText,
            // showCancelButton: isCancelBtn,
            // cancelButtonText: cancelButtonText,
            customClass: {
                confirmButton: `ff_new_alert_btn mb-1`,
                popup: `ff_popup_bg`,
                title: `ff_popup_title`,
            },
            allowOutsideClick: isBackDropAllow,
            showCloseButton: true,
            showDenyButton: isCancelBtn,
            denyButtonText: cancelButtonText,
        }).then((result) => {
            console.log("result111: ", result);
            if (result?.isConfirmed) {
                resolve("action button press");
            } else if (result?.isDenied) {
                reject("cancel Press");
            }
        });
    });
};

export class ToastMessage {
    private static toastOptions = {
        toast: true,
        position: "top-end" as SweetAlertPosition,
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
    };

    private static showToast(color: string, message: string, icon: SweetAlertIcon): void {
        const toast = Swal.mixin({
            ...this.toastOptions,
            customClass: {
                popup: `color-${color}`,
            },
        });

        toast.fire({
            icon,
            title: message,
        });
    }

    static success(message: string): void {
        this.showToast("success", message, "success");
    }

    static error(message: string): void {
        this.showToast("error", message, "error");
    }

    static warning(message: string): void {
        this.showToast("warning", message, "warning");
    }

    static info(message: string): void {
        this.showToast("info", message, "info");
    }
}
