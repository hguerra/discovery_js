import React, { createContext, useReducer } from 'react';

// Define a shape of the user data
type User = {
  name: string;
  email: string;
};

// Define the initial state
const initialState: User = {
  name: '',
  email: '',
};

// Define the context
type UserReducerAction = { type: string; payload: User };

export const UserContext = createContext<{
  state: User;
  dispatch: React.Dispatch<UserReducerAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Define the reducer
function userReducer(state: User, action: UserReducerAction) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

// Define the provider
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
