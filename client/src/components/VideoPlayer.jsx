import React from 'react'
import { useSocketContext } from '../context/SocketContext'

const VideoPlayer = () => {

    const { call, callAccepted, myVideo, userVideo, stream, name, callEnded } = useSocketContext()

    return (
        <div className='flex items-center flex-wrap justify-center'>
            {/* My Own Video */}
            {stream && (
                <div className='flex-grow-1 flex-shrink-1 '>
                    <p className='text-white text-xl mb-2'>{name || 'Name'}</p>
                    <video ref={myVideo} playsInline muted autoPlay className='own-video h-96 max-w-[800px]' />
                </div>
            )}

            {/* User's Video */}
            {callAccepted && !callEnded && (
                <div className='flex-grow-1 flex-shrink-1 '>
                    <p>{call.name || 'Name'}</p>
                    <video className='users-video h-96 max-w-[800px]' ref={userVideo} playsInline autoPlay />
                </div>
            )}
        </div>
    )
}

export default VideoPlayer