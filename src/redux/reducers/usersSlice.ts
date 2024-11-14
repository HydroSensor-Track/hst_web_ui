import { createAsyncThunk, createSlice  } from '@reduxjs/toolkit';
import { UserState, CreateUserParams, UpdateUserParams } from '../../interfaces/redux';
import { UserCompleteInfo } from '../../interfaces/userInfo';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../../services/users';


const INITIAL_STATE: UserState = {
    users: [],
    user: {},
    loading: false,
    error: null,
};


export const getUsersList = createAsyncThunk<any, void>(
    'users/getUsers',
    async () => {
        const response = await getUsers();
        const userList: UserCompleteInfo[] = response;
        return userList;
    }
);

export const getUser = createAsyncThunk<any, string | undefined>(
    'users/getUser',
    async (id) => {
        const response = await getUserById(id);
        const user: UserCompleteInfo = response;
        return user;
    }
);

export const newUser = createAsyncThunk<any, CreateUserParams>(
    'users/newUser',
    async (data) => {
        const response = await createUser(data);
        const newUser: UserCompleteInfo = response;
        return newUser;
    }
);

export const updateUserById = createAsyncThunk<any, { id: string | undefined, data: UpdateUserParams }>(
    'users/updateUser',
    async ({ id, data }) => {
        const response = await updateUser(id, data);
        const updatedUser: UserCompleteInfo = response;
        return updatedUser;
    }
);

export const deleteUserById = createAsyncThunk<any, string>(
    'users/deleteUser',
    async (id) => {
        const response = await deleteUser(id);
        return response;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUsersList.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getUsersList.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(getUsersList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching users';
        });
        builder.addCase(getUser.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching user';
        });
        builder.addCase(newUser.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(newUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        });
        builder.addCase(newUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error creating user';
        });
        builder.addCase(updateUserById.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateUserById.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.users.findIndex(user => user.userId === action.payload.userId);
            state.users[index] = action.payload;
        });
        builder.addCase(updateUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error updating user';
        });
        builder.addCase(deleteUserById.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.filter(user => user.userId !== `auth0|${action.meta.arg}`);
        });
        builder.addCase(deleteUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error deleting user';
        });
    }
});

export default usersSlice.reducer;