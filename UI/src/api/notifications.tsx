import toast, { Toast } from "react-hot-toast";
import { XIcon } from "../components/icons/XIcon";

export const errorToast = (text: string) => {
    toast.error(
        (t: Toast) => (
            <div className="toast-error-style toast-container">
                <div>{text}</div>
                <button className="toast-close-button" onClick={() => toast.dismiss(t.id)}>
                    <XIcon />
                </button>
            </div>
        ),
        {
            duration: 5000,
            position: "top-center",
            icon: null,
        }
    );
};

export const successToast = (text: string, duration = 5000) => {
    toast(
        (t: Toast) => (
            <div className="toast-success-style toast-container">
                <div>{text}</div>
                <button className="toast-close-button" onClick={() => toast.dismiss(t.id)}>
                    <XIcon />
                </button>
            </div>
        ),
        {
            duration,
            position: "top-center",
        }
    );
};

export const yellowInfoToast = (text: string, duration = 5000) => {
    toast(
        (t: Toast) => (
            <div className="toast-yellow-style toast-container">
                <div>{text}</div>
                <button className="toast-close-button" onClick={() => toast.dismiss(t.id)}>
                    <XIcon />
                </button>
            </div>
        ),
        {
            duration,
            position: "top-center",
        }
    );
};
