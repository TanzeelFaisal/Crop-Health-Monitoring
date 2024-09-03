import React, { useEffect, useState } from 'react'
import supabase from '../Config/supabase'
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  useEffect(() =>
  {
    const fetchHistory = async () =>
    {
        document.body.style.overflowY= 'auto';
        const {data, error} = await supabase.auth.getSession();

        if (data.session)
        {
            const response = await fetch(`http://localhost:8000/history?user_id=${data.session.user.id}`);
            const d = await response.json();
            setHistory(d.latest_records);

        }
        else{
            navigate('/');
        }
    }
    fetchHistory();
  }, [])
  return (
    <div style={{minHeight: '100vh'}}>
    <h1 style={{color: 'white'}}>History</h1>
    {
        history.length ?
        history.map(item =>
            <div key={item.id} >
                {
                    item.history.image &&
                    <img
                        width={'250px'}
                        height={'250px'}
                        style={{cursor: 'pointer'}}
                        src={`data:image/png;base64, ${item?.history.image}`}
                    />
                }
                {
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', flexWrap: 'wrap'}}>
                        <p style={{color: 'white'}}>Prediction:</p>
                        <p  style={{color: 'white'}}>{item.history.image ? item.history.prediction : item.history.predictions.map(r => r + ', ')}</p>
                    </div>
                }
                <br />
                <hr />
                <br />
            </div>
            )
        :
        <p>No history yet...</p>
        }
    </div>
  )
}

export default History
