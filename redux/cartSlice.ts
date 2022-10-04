import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Define a type for the slice state
interface CartState {
	items: Product[];
}

// Define the initial state using that type
const initialState: CartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		addToCart: (state: CartState, action: PayloadAction<Product>) => {
			state.items = [...state.items, action.payload];
		},
		removeFromCart: (
			state: CartState,
			action: PayloadAction<{ id: string }>
		) => {
			const index = state.items.findIndex(
				(item) => item._id === action.payload.id
			);

			let newCart = [...state.items];

			if (index !== -1) {
				newCart.splice(index, 1);
			} else {
				console.log(
					`Can't remove product (id: ${action.payload.id}). It's not in the cart!`
				);
			}

			state.items = newCart;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemsWithId = (state: RootState, id: string) => {
	return state.cart.items.filter((item) => item._id === id);
};
export const selectCartTotal = (state: RootState) => {
	return state.cart.items.reduce(
		(total: number, item: Product) => (total += item.price),
		0
	);
};

export default cartSlice.reducer;
