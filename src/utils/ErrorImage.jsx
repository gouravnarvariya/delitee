import React from 'react'

const ErrorImage = ({ error, title }) => {
    if (error && error.errors && error.errors[title]) {
        return <>
            <p className="error-input-msg">{error?.errors[title]}</p>
        </>
    }
    return (
        <>
        </>
    )
}

export default ErrorImage