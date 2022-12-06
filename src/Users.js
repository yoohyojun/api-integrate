import React, {useState, useEffect, useReducer} from 'react';
import axios from "axios";

function reducer(state, action) {

    switch (action.type) {
        case 'LOADING' :
            return {
                loading: true,
                data: null,
                error: null
            }
        case 'SUCCESS' :
            return {
                loading: false,
                data: action.data,
                error: null
            }
        case 'ERROR' :
            return {
                loading: false,
                data: null,
                error: action.error
            }
    }

}
function Users() {
    const initializer = {
        loading: false,
        data: null,
        error: null,
    }
    const [state, dispatch] = useReducer(reducer, initializer);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        //시작전 로딩바
        dispatch({type:'LOADING'})
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            dispatch({type:'SUCCESS', data:response.data});
        } catch (e) {
            dispatch({type:'ERROR'});
        }
    };

    let {loading, error, data} = state;

    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러발생...</div>
    if(!data) return null;

    return (
        <>
            <ul>
                {data.map(user => (
                <li key={user.id}>
                    {user.username} ({user.name})
                </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    )

}

export default Users;