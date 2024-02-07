import React from 'react';

const EditEquipmentModal = ({ isOpen, onClose, equipmentDetail }) => {
    return (
        <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
            <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="modal-container bg-white w-96 mx-auto mt-10 p-6 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Edit Equipment</h2>
                <div>
                    
                </div>
                <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Close</button>
            </div>
        </div>
    );
};

export default EditEquipmentModal;
