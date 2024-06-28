import React from 'react'

const ErrorMessage = ({ error, title }) => {
    // console.log(error.errors)
    if (error && error.errors && error.errors[title]) {
        console.log(error?.errors[title])   
        return <>
            <p className="error-input-msg">{error?.errors[title]}</p>
        </>
    }
    return (
        <>
        </>
    )
}

export default ErrorMessage