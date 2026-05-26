import { useEffect, useState, useRef } from "react";

/**
 * Custom hook to close a modal when the mobile hardware back button is pressed.
 * It handles stacked modals gracefully by using unique IDs.
 */
export function useModalBackButton(isOpen: boolean, onClose: () => void) {
    const idRef = useRef(Math.random().toString(36).substring(2, 9));
    const [historyPushed, setHistoryPushed] = useState(false);

    useEffect(() => {
        if (isOpen && !historyPushed) {
            window.history.pushState({ modalId: idRef.current }, '');
            setHistoryPushed(true);
        } else if (!isOpen && historyPushed) {
            // Only pop if the current history state is EXACTLY our modalId
            // This prevents popping if the user already navigated back using hardware button
            if (window.history.state?.modalId === idRef.current) {
                window.history.back();
            }
            setHistoryPushed(false);
        }
    }, [isOpen, historyPushed]);

    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            if (isOpen && historyPushed) {
                // If the new state matches our ID, we just became the active top-most state again.
                if (e.state?.modalId === idRef.current) {
                    return;
                }
                // Otherwise, the user popped to a state BEFORE us, so we must close.
                onClose();
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isOpen, historyPushed, onClose]);
}
