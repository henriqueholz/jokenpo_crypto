import React, { useState, useEffect } from 'react';
import { Dashboard, getDashboard, setBid, setCommission, upgrade } from '../services/Web3Service';
import Header from '../components/Header';

function Admin() {
    const [message, setMessage] = useState("");
    const [dashboard, setDashboard] = useState<Dashboard>();

    useEffect(() => {
        getDashboard()
            .then(dashboard => setDashboard(dashboard))
            .catch(err => setMessage(err.message));
    }, [])

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDashboard(prevState => ({ ...prevState, [event.target.id]: event.target.value }));
    }

    function onUpgradeClick() {
        if (!dashboard?.address)
            return setMessage("Address is required!");

        upgrade(dashboard?.address)
            .then(tx => setMessage("Success. Tx: " + tx))
            .catch(err => setMessage(err.message));
    }

    function onChangeCommissionClick() {
        if (!dashboard?.commission)
            return setMessage("Commission is required!");

        setCommission(dashboard?.commission)
            .then(tx => setMessage("Success. Tx: " + tx))
            .catch(err => setMessage(err.message));
    }

    function onChangeBidClick() {
        if (!dashboard?.bid)
            return setMessage("Bid is required!");

        setBid(dashboard?.bid)
            .then(tx => setMessage("Success. Tx: " + tx))
            .catch(err => setMessage(err.message));
    }

    return (
        <div className="container mx-auto px-4">
            <Header />
            <main>
                <div className="py-5 text-center">
                    <img className="block mx-auto mb-4" src="/logo512.png" alt="JoKenPo" width="72" />
                    <h2 className="text-2xl font-bold">Administrative Panel</h2>
                    <p className="lead text-lg">Change the players' bid, your commission and upgrade the contract.</p>
                    <p className="lead text-red-600">{message}</p>
                </div>
                <div className="md:w-4/5 lg:w-full mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor='bid' className='block text-sm font-medium'>Bid (wei):</label>
                            <div className='flex'>
                                <input type="number" className="form-input flex-1" id="bid" value={dashboard?.bid || ""} onChange={onInputChange} />
                                <span className='flex items-center px-3 bg-gray-200'>wei</span>
                                <button type='button' className='btn btn-primary ml-2 inline-flex items-center px-4 py-2 bg-blue-500 text-white' onClick={onChangeBidClick}>Change Bid</button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor='commission' className='block text-sm font-medium'>Commission (%):</label>
                            <div className='flex'>
                                <input type="number" className="form-input flex-1" id="commission" value={dashboard?.commission || ""} onChange={onInputChange} />
                                <span className='flex items-center px-3 bg-gray-200'>%</span>
                                <button type='button' className='btn btn-primary ml-2 inline-flex items-center px-4 py-2 bg-blue-500 text-white' onClick={onChangeCommissionClick}>Change Commission</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 space-y-2">
                        <label htmlFor='address' className='block text-sm font-medium'>New Contract (address):</label>
                        <div className='flex'>
                            <input type="text" className="form-input flex-1" id="address" value={dashboard?.address || ""} onChange={onInputChange} />
                            <button type='button' className='btn btn-primary ml-2 inline-flex items-center px-4 py-2 bg-blue-500 text-white' onClick={onUpgradeClick}>Upgrade Contract</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Admin;