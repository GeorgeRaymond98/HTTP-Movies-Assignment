import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateMovie({match,history})  {
    const[update, setUpdate] = useState({
        id: null,
        title: "",
        director: "",
        metascore: "",
        stars: []
    })
    useEffect(() => {
        const item = match.params.id
        axios.get(`http://localhost:5000/api/movies/${item}`)
        .then(res => setUpdate(res.data))
        .catch(err => console.log(err))
    }, [match.params.id])

    const changeHandler = event =>  {
        let value = event.target.value;
        if(event.target.name === 'stars') {
            value = value.split(',')
        }
        setUpdate({
            ...update,
            [event.target.name]: value
        })
    }
    const submitHandler = event => {
        event.preventDefault();
        const item = match.params.id
        axios
        .put(`http://localhost:5000/api/movies/${item}`, update)
        .then( res => {
        setUpdate({
            title: "",
            director: "",
            metascore: "",
            stars: []
          });
          history.push('/');
        })
        .catch( err => console.log(err.response));
    }
    return (
        <div className="form">
            <h1>UpdateMovie</h1>
            <form onSubmit={submitHandler}>
                <input type="text" name="title" placeholder="Title" value={update.title} onChange={changeHandler} />
                <input type="text" name="director" placeholder="Director" value={update.director} onChange={changeHandler} />
                <input type="number" name="metascore" placeholder="Metascore" value={update.metascore} onChange={changeHandler} />
                <input type="text" name="stars" placeholder="Stars" value={update.stars} onChange={changeHandler} />
                <button>Zip Zap Update </button>
            </form>
        </div>
    )
}
export default UpdateMovie