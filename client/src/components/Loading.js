import React from 'react'
import { Plane } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
            <Plane ariaLabel="loading-indicator" />
        </div>
    )
}

export default Loading