import React, { useState } from 'react';

const Alert = ({ type, message, onClose }) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
        onClose();
    };

    return (
        visible && (
            <div className={`alert alert-${type}`} role="alert">
                {message}
                <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
        )
    );
};

export default Alert;
