function Notification({ message, type, onClose }) {
    try {
        const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

        React.useEffect(() => {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }, []);

        return (
            <div data-name="notification" className={`notification fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2`}>
                <i data-name="notification-icon" className={`fas ${icon}`}></i>
                <span data-name="notification-message">{message}</span>
                <button data-name="notification-close" onClick={onClose} className="ml-4">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        );
    } catch (error) {
        console.error('Notification component error:', error);
        reportError(error);
        return null;
    }
}
