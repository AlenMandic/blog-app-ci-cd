import React, { useState } from "react"
import { NotificationError, NotificationSuccess } from "../components/Notification";

export const useNotification = () => {

    const [notificationError, setNotificationError] = useState(null);
    const [notificationSuccess, setNotificationSuccess] = useState(null);

    const showErrorNotification = (infoMessage) => {

        setNotificationError(infoMessage)
        setTimeout(() => setNotificationError(null), 5000)
    }

    const showSuccessNotification = (infoMessage) => {

        setNotificationSuccess(infoMessage)
        setTimeout(() => setNotificationSuccess(null), 5000)
    }

    const ErrorNotification = () => notificationError ? <NotificationError message={notificationError} /> : null;
    const SuccessNotification = () => notificationSuccess ? <NotificationSuccess message={notificationSuccess} /> : null;

    return {
        ErrorNotification,
        SuccessNotification,
        showErrorNotification,
        showSuccessNotification
    }
}
