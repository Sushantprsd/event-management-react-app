import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'


const initialState = {
   toolbar: {
      navLinks: [
         {
            name: "addProduct",
            displayValue: "Add Product",
            link: "/shop/soft",
         },
         {
            name: "allProduct",
            displayValue: "View All Product",
            link: "/shop/soft",
         },
         {
            name: "recent",
            displayValue: "View Recent",
            link: "/shop/soft",
         },
      ]
   },
}

const setNavigation = (state, action) => {
   return {
      ...state,
      toolbar: {
         ...state.toolbar,
         ...state.toolbar.navLinks.push({
            name: "profile",
            displayValue: action.data.email,
            link: "/shop/",
            specialStyleClass:"ProfileNav",
            listItems: [
               {
                  name: "logout",
                  link:'/logout'
               },
               {
                  name: "2",
                  link:'/logout'

               },
            ]
            // specialStyle: {
            //    display: "inline-block",
            //    width: "7rem",
            //    marginRight: "1rem",
            //    // paddingRight:"2rem",
            // },

         })
      }
   }
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SET_NAVIGATION: return setNavigation(state, action)
      default:
         return state
   }
}

export default reducer;