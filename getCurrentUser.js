import { account } from './AppwriteConfig'; // Assuming this is your Appwrite configuration

export const getCurrentUser = async () => {
  try {
    const user = await account.get(); // Get the current logged-in user's details
    return { name: user.name }; // Adjust based on the actual user object structure
  } catch (error) {
    console.log('Please Login')
    return ''; // Return null if the user is not logged in
    
  }
};
