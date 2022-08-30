import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSocketContext } from '../context/SocketContext'


const Options = ({ children }) => {
    const { callAccepted, name, setName, callEnded, me, callUser, leaveCall } = useSocketContext()

    const [idToCall, setIdToCall] = useState('')

    return (
        <div>
            <div>
                <div className='flex items-center justify-center flex-wrap gap-5'>
                    {/* My info  */}
                    <div className='flex-grow-1 flex-shrink-1 flex items-start flex-col'>

                        <label className='text-[#fff] text-lg my-2 '>Account Info</label>

                        <p className='text-[#000] text-lg bg-white px-2 font-bold'>
                            Name: <input className='outline-none font-semibold py-3 px-1 text-gray-600' onChange={(e) => setName(e.target.value)} value={name} />
                        </p>

                        <CopyToClipboard className='px-2 py-1 text-lg bg-slate-300 text-black my-2 w-full hover:bg-slate-500' text={me}>
                            <button>Copy Your ID</button>
                        </CopyToClipboard>
                    </div>

                    {/* Make a call  */}
                    <div className='flex-grow-1 flex-shrink-1 flex items-start flex-col'>

                        <label className='text-[#fff] text-lg my-2 '>Make a call</label>

                        <p className='text-[#000] text-lg bg-white px-2 font-bold'>
                            ID to call: <input className='outline-none font-semibold py-3 px-1 text-gray-600' onChange={(e) => setIdToCall(e.target.value)} value={idToCall} />
                        </p>

                        {callAccepted && !callEnded ? (
                            <button className='px-2 py-1 text-lg bg-slate-300 text-black my-2 w-full hover:bg-slate-500' onClick={leaveCall}>
                                Hang up
                            </button>
                        ) : (
                            <button className='px-2 py-1 text-lg bg-slate-300 text-black my-2 w-full hover:bg-slate-500' onClick={() => callUser(idToCall)}>
                                Call
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {children}
        </div >
    )
}

export default Options