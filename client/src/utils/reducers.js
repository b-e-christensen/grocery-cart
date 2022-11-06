

// Notice we moved the initial state object from our CarComponent to the reducer itself
const initalState = {
 categories: [],
 products: []
};

// Here we pass a default value of initalState if none is provided
export default function reducer(state = initalState, action) {
  switch (action.type) {

  }
}
