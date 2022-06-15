const DarkModeReducer = (state, action) => {
    switch(action.type){
        case 'DARK':{
            return{
                darkMode:true
            }
        }
        case 'LIGHT':{
            return{
                darkMode:false
            }
        }
        case "TOGGLE": {
            return {
                darkMode: !state.darkMode,
            }
        }
        default: {}
    }
}

export default DarkModeReducer