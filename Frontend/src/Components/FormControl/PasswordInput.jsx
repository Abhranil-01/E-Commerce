import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';

function PasswordInput({
    placeholderText,
    type = 'text',
    icon = faUser,
    iconTwo = faEye,
    register,
    ...props
}) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="mb-3 position-relative">
            <span className='position-absolute text-secondary' style={{ bottom: '22%', left: '2%', fontSize: '18px' }}>
                <FontAwesomeIcon icon={icon} />
            </span>
            <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control"
                placeholder={placeholderText}
                {...register}
                {...props}
                style={{ padding: '12px 35px', fontWeight: '600' }}
            />
            <span className='position-absolute text-secondary' style={{ bottom: '22%', right: '2%', fontSize: '18px',cursor:'pointer' }} onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
        </div>
    );
}

export default PasswordInput;
