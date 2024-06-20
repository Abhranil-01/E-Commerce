import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Input({
    className,
    placeholderText,
    type = 'text',
    icon ,
    register,
    ...props
}) {
    // console.log('fwf',{...register} );
    return (
        <div className={`mb-3 position-relative ${className}`}>
            <input
                type={type}
                className="form-control"
                placeholder={placeholderText}
                {...register} 
                {...props}
                style={{ padding: '12px 35px', fontWeight: '600' }}
            />
            <span className='position-absolute text-secondary' style={{ bottom: '22%', left: '2%', fontSize: '18px' }}>
                <FontAwesomeIcon icon={icon} />
            </span>
        </div>
    );
}

export default Input;
