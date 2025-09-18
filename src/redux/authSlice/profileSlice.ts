import { createSlice } from '@reduxjs/toolkit';

// Function to get user profile from local storage
const getLocalStorageUser = () => {
    try {
        const profileJSON = localStorage.getItem('zeework_user');
        if (profileJSON) {
            return JSON.parse(profileJSON);
        }
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
    return {}; // Return empty object if unable to parse or not found
};

// Initial state from local storage
const initialState = {
    profile: getLocalStorageUser(),
    agency: {} // Assuming agency is another piece of data you want to manage
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        profileData: (state, action) => {
            const { profile } = action.payload;
            state.profile = profile;
            localStorage.setItem("zeework_user", JSON.stringify(profile));
        },
        agencyData: (state, action) => {
            const { agency } = action.payload;
            state.agency = agency;
        },
        clearProfileData: (state) => {
            state.profile = {};
            state.agency = {};
            localStorage.removeItem('zeework_user');
        },
    },
});

export const { profileData, clearProfileData, agencyData } = profileSlice.actions;

export default profileSlice.reducer;
