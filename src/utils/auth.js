// Predefined list of users
export const users = [
  {
    email: "alimokdad961@gmail.com",
    password: "Ali1234",
    name: "Ali Mokdad",
  },
  {
    email: "test@example.com",
    password: "Test1234",
    name: "Test User",
  },
  {
    email: "admin@example.com",
    password: "Admin1234",
    name: "Admin User",
  },
];

// Function to authenticate user
export const authenticateUser = (email, password) => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  return user || null;
};

// Function to check if user exists (for signup)
export const userExists = (email) => {
  return users.some((user) => user.email === email);
};
