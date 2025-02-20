const authService = require('../../services/authService');

// /Users/mac/Desktop/projects/side-projects/audiophile/audiophile-node-api/tests/unit/register.test.js


describe('registerUser', () => {
  it('should register a user successfully', async () => {
    const userData = { first_name: 'Jane', last_name: "Doe", "email": "daraoloye99@gmail.com",  password: 'password123' };
    const result = await authService.registerUser(userData);
    expect(result).toHaveProperty('id');
    expect(result.first_name).toBe(userData.first_name);
    expect(result.last_name).toBe(userData.last_name);
    expect(result.email).toBe(userData.email);
  });

  it('should throw an error if email is already taken', async () => {
    const userData = { first_name: "Another Jane", last_name: "Another Joe", email: 'daraoloye99@gmail.com', password: 'password123' };
    await expect(authService.registerUser(userData)).rejects.toThrow(`User with email(${userData.email}) already exists`);
  });

  it('should throw an error if password is too short', async () => {
    const userData = { password: 'short' };
    await expect(authService.registerUser(userData)).rejects.toThrow('Password must be at least 6 characters long');
  });
});