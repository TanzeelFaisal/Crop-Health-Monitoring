import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../Config/supabase'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div style={{position: 'fixed', left: 0, top: 0, width: '100%', backgroundColor: 'black', height: '#333333', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <p>CropSense</p>
        <div style={{display: 'flex', gap: 20, alignItems: 'center'}}>
            <Link to="/home">Home</Link>
            <Link to="/history">History</Link>
            <Link to="/dashboard">Upload</Link>
            <button style={{height: '30px', padding: '7px', borderRadius: '5px', backgroundColor: 'red', color: 'white'}} onClick={async () => {
                await supabase.auth.signOut();
                navigate('/');
            }}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Navbar