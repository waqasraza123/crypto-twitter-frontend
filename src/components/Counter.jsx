import React, {Component} from "react";
import {useDispatch, useSelector} from "react-redux";
import {increment} from "../features/counter/counter-slice";

/**
 * below are 2 functional components
 *
 * functional components name starts with a
 * capital letter otherwise there would be an error
 * down the road
 *
 */

export default function Counter() {

    const count = useSelector( (state) => state.counter.value);
    const dispatch = useDispatch();

    function handleClick(){

        //dispatch events to update values in the redux store
        dispatch(increment());
    }

    return (
        <div>
            Count is {count}
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}