import { createContext, useContext, useEffect, useState} from "react";
import api from "../utils/api";



interface AuthContextType {
  user: any;
  loading:any;
  signin: (email: string, password: string) => Promise<void>;
  signup: (name:string,email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType |null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading,setLoading]=useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/user/me");
                setUser(res.data);
            }
            catch (err) {
                setUser(null);
            }
            finally{
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    const signin = async (email: string, password: string) => {
        await api.post("/api/v1/signin", { email, password });
        const res = await api.get("/user/me");
        setUser(res.data);
    };

    const signup = async (name: string, email: string, password: string) => {
        await api.post("/api/v1/signup", { name, email, password });
    };

    const logout = async () => {
        await api.post("/api/v1/logout");
        setUser(null);
    };

    if(loading){

        return<div>loading...</div>
    }

    return (
        <AuthContext.Provider value={{ user,loading, signin, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
