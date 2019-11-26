import React from 'react';
import './styles.css'
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';
import {IoMdImages} from 'react-icons/io';

const NewCard = (props) => {

    console.log(props);
    //const deckId = props.match.params.deckId;

    const iconStyle = {
        display: 'block',
        float: 'right',
        size: 60 // does not work,
    };

    const handleCreate = (event) => {
        event.preventDefault();
        document.getElementById('area-front').value = '';
        document.getElementById('area-back').value = '';
    };


    return (
        <div className='NewCard'>
            <h3>Deck: {props.match.params.deckId}</h3>
            <form> 
                <label>Front</label><hr/>
                <textarea id='area-front' name='front' rows='3'/>
                <IoMdImages size={30} style={iconStyle}/> <br/>
                <label>Back</label><hr/>
                <textarea id='area-back' name='back' rows='3' />
                <IoMdImages size={30} style={iconStyle}/><br/>
                <Link to='/app/decks' ><button className='btn-cancel'>Cancel <TiCancel/></button></Link>
                <button className='btn-create' onClick={handleCreate}>Create <MdAdd/></button>
            </form>
        </div>
    );
};

export default NewCard;