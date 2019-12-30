import React, { useState } from 'react';
import './styles.css'
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';
import {IoMdImages} from 'react-icons/io';
import api from '../../services/api';

const NewCard = (props) => {

    const deckId = props.match.params.deckId;
    const [frontTxt, setFrontTxt] = useState('');
    const [backTxt, setBackTxt] = useState('');

    const iconStyle = {
        display: 'block',
        float: 'right',
        size: 60 // does not work,
    };

    async function handleCreate (event){
        event.preventDefault();
        try{
            await api.post(`/deck/${deckId}/card`, {front: frontTxt, back: backTxt});
        }catch(err){
            console.log(err);
            alert('Failed to create card');
        }
        setFrontTxt('');
        setBackTxt('');
    };


    return (
        <div className='NewCard'>
            <h3>Deck: {props.match.params.deckId}</h3>
            <form> 
                <label>Front</label><hr/>
                <textarea id='area-front' name='front' rows='3' 
                    value={frontTxt} 
                    onChange={e => setFrontTxt(e.target.value)} />
                <IoMdImages size={30} style={iconStyle}/> <br/>
                <label>Back</label><hr/>
                <textarea id='area-back' name='back' rows='3' 
                    value={backTxt}
                    onChange={e => setBackTxt(e.target.value)} />
                <IoMdImages size={30} style={iconStyle}/><br/>
                <Link to='/app/decks' ><button className='btn-cancel'>Cancel <TiCancel/></button></Link>
                <button className='btn-create' onClick={handleCreate}>Create <MdAdd/></button>
            </form>
        </div>
    );
};

export default NewCard;