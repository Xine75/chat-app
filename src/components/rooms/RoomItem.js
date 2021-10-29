import React from 'react'

const RoomItem = () => {
    return (
        <div>

            <div className="d-flex justify-content-between align-itmes-center">
                <h3 className="text-disappear">Room Name</h3>
                <span></span>

            </div>
            
            <div className="d-flex align-items-center text-black-70">
                <span>No messages yet...</span>
            </div>
        </div>
    )
}

export default RoomItem
