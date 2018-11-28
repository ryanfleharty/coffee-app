const initialState = {
    roasts: [],
    currentRoast: {
        "name": null,
        "origin": null,
        "color": null,
        "description": null,
        "roaster": {
            "name": null,
            "_id": null
        },
        "reviews": []
    }
}

const roastReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOAD_ROAST":
            return{
                ...state,
                currentRoast: action.payload
            }
        case "CREATE_ROAST":
            return{
                ...state
            }
        case "CREATE_ROAST_REVIEW":
            return{
                ...state,
                currentRoast: {
                    ...state.currentRoast,
                    reviews: [...state.currentRoast.reviews, action.payload]
                }
            }
        case "LOAD_ROASTS":
            return{
                ...state,
                roasts: action.payload
            }
        default:
            return state;
    }
}

export default roastReducer;