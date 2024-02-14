import User from './user.js';

export async function createUser(userData) {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUser(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

export async function updateUser(userId, updatedUserData) {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true, // Return the updated user document
    });
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    await User.findByIdAndDelete(userId);
    return true; // Indicate successful deletion
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}