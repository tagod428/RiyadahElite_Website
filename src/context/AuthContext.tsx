import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define User type
type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  level: number;
  points: number;
  createdAt: string;
};

// Define AuthContextType
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Mock user data for demonstration
const MOCK_USER: User = {
  id: '1',
  username: 'gamer123',
  email: 'gamer@example.com',
  avatar: 'https://i.pravatar.cc/150?img=12',
  role: 'user',
  level: 42,
  points: 3750,
  createdAt: '2023-01-15',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate checking localStorage for saved auth
        const savedUser = localStorage.getItem('riyadah_user');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function (mock implementation)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation
      if (email && password) {
        setUser(MOCK_USER);
        localStorage.setItem('riyadah_user', JSON.stringify(MOCK_USER));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function (mock implementation)
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (username && email && password) {
        const newUser = {
          ...MOCK_USER,
          username,
          email,
          level: 1,
          points: 0,
        };
        
        setUser(newUser);
        localStorage.setItem('riyadah_user', JSON.stringify(newUser));
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('riyadah_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);