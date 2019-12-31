import React from 'react';
import './styles.css'
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';
import {IoMdImages} from 'react-icons/io';
import api from '../../services/api';

export default class EditCard extends React.Component {

    state = {
        card: {}
    }
    
    componentDidMount(){
        this.loadCard(this.props.match.params.cardId);
    }

    loadCard= async(cardId) => {
        try{
            const response = await api.get(`/card/${cardId}`); 
            this.setState({card: response.data});     
        }catch(err){
            console.log(err);
        }
    }

    handleUpdate = async (event) => {
        event.preventDefault();
        const card = this.state.card;
        try{
            await api.put(`/deck/${card.deck}/card/${card._id}`, card);
            this.props.history.goBack();
        }catch(err){
            console.log(err);
            alert('Failed to save card');
        }
    };

    render(){
        let {card} = this.state;

        const iconStyle = {
            display: 'block',
            float: 'right',
            size: 60 // does not work,
        };

        return (
            <div className='EditCard'>
                <form> 
                    <label>Front</label><hr/>
                    <textarea id='area-front' name='front' rows='3' 
                        value={card.front} 
                        onChange={ e=> {
                            card.front= e.target.value;
                            this.setState({card});
                        }} />
                    <IoMdImages size={30} style={iconStyle}/> <br/>
                    <label>Back</label><hr/>
                    <textarea id='area-back' name='back' rows='3' 
                        value={card.back}
                        onChange={e => { 
                            card.back = e.target.value; 
                            this.setState({card});
                            }} />
                    <IoMdImages size={30} style={iconStyle}/><br/>
                    <Link to='/app/decks' ><button className='btn-cancel'>Cancel<TiCancel/></button></Link>
                    <button className='btn-create' onClick={this.handleUpdate}>Save<MdAdd/></button>
                </form>
            </div>
        );
    }
};