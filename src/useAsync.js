import { useReducer, useEffect} from "react";

function reducer(state, action) {
    switch(action.type) {
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
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

//리듀서는 action으로 변화값을 받고 type에 따라 state를 변경하여 리턴
function useAsync(callback, deps=[], isRender=false) {

    const [state, dispatch] = useReducer(reducer, {
       loading: false,
       data: null,
       error: null
    });

    const fetchData = async () => {
        dispatch({type:'LOADING'});
        try {
            const data = await callback();
            dispatch({type:'SUCCESS', data:data})
        } catch (e) {
            dispatch({type:'ERROR'});
        }
    }

    useEffect(() => {
        if(isRender) {
            fetchData()
        }
    }, deps);


    return [state, fetchData];

}

export default useAsync;



