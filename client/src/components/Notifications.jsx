import React from 'react'
import { useSocketContext } from '../context/SocketContext'

const Notifications = () => {
    const { call, callAccepted, answerCall } = useSocketContext()

    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <div className='text-white flex flex-col items-center justify-center mb-5'>
                    <p className='text-lg p-3'>{call.name} is calling you...</p>
                    <button onClick={answerCall} className='text-xl bg-green-700 hover:bg-green-500 px-2 py-1'>Answer</button>
                </div>
            )}
        </>
    )
}

export default Notifications