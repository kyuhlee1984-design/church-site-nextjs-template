import { useEffect, useState } from "react";

/**
 * Custom hook to close a modal when the mobile hardware back button is pressed.
 * It pushes a dummy state to the history stack when the modal opens,
 * and intercepts the back button to close the modal instead of navigating.
 */
export function useModalBackButton(isOpen: boolean, onClose: () => void) {
    const [historyPushed, setHistoryPushed] = useState(false);

    // Manage pushing and cleaning up the dummy history state
    useEffect(() => {
        if (isOpen && !historyPushed) {
            window.history.pushState({ modalOpen: true }, '');
            setHistoryPushed(true);
        } else if (!isOpen && historyPushed) {
            // If the modal was closed normally (e.g. clicking X),
            // we should pop the dummy state we created.
            // We check if the state is still there to avoid popping real history.
            if (window.history.state?.modalOpen) {
                window.history.back();
            }
            setHistoryPushed(false);
        }
    }, [isOpen, historyPushed]);

    // Listen for the hardware back button
    useEffect(() => {
        const handlePopState = () => {
            if (isOpen) {
                onClose();
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isOpen, onClose]);
}
