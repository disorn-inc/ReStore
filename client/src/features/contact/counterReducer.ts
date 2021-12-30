export const INCRESEMENT_COUNTER = 'INCRESEMENT_COUNTER';
export const DECRESEMENT_COUNTER = 'DECRESEMENT_COUNTER';

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC'
}

export function increment(amount = 1) {
    return {
        type: INCRESEMENT_COUNTER,
        payload: amount
    }
}

export function decrement(amount = 1) {
    return {
        type: DECRESEMENT_COUNTER,
        payload: amount
    }
}

export default function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case INCRESEMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload
            }
        case DECRESEMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }
    
        default:
            return state;
    }
}