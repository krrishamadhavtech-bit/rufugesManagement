import React from 'react';
import './Button.css';

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "medium",
    shape = "rounded",
    className = "",
    disabled = false,
    loading = false,
    icon = null,
    style = {},
    ...props
}) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'outline': return 'btn-outline';
            case 'danger': return 'btn-primary btn-danger-bg';
            case 'success': return 'btn-success';
            case 'action': return 'action-btn';
            case 'edit': return 'action-btn edit';
            case 'delete': return 'action-btn delete';
            case 'view': return 'action-btn view';
            case 'sub': return 'action-btn sub';
            case 'logout': return 'logout-btn-admin';
            case 'link': return 'view-all-btn';
            default: return 'btn-primary';
        }
    };

    const getSizeClass = () => {
        if (size === 'small') return 'btn-small';
        if (size === 'large') return 'btn-large';
        return '';
    };

    const getShapeClass = () => {
        if (shape === 'pill') return 'btn-pill';
        return '';
    };

    return (
        <button
            type={type}
            className={`${getVariantClass()} ${getSizeClass()} ${getShapeClass()} ${className} ${loading ? 'btn-loading' : ''}`}
            onClick={onClick}
            disabled={disabled || loading}
            style={style}
            {...props}
        >
            {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    {icon && <i className={`fas fa-${icon} ${children ? 'with-icon' : ''}`}></i>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;
