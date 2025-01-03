import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); // Corrected here by adding parentheses
  const [user, setUser] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/user/login',
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      if (res.data.success) {
        toast({
          title: 'Login Successful',
          description: res.data.msg,
          status: 'success'
        });
        navigate("/"); // Redirect after login
      } else {
        toast({
          title: 'Login Failed',
          description: res.data.msg || 'An error occurred',
          status: 'error'
        });
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.response?.data?.msg || 'An error occurred',
        status: 'error'
      });
    }
  };

  return (
    <div className="m-10 flex flex-col gap-4">
      <Input
        type="text"
        name="email"
        onChange={changeHandler}
        value={user.email}
        placeholder="Email"
      />
      <Input
        type="password"
        name="password"
        onChange={changeHandler}
        value={user.password}
        placeholder="Password"
      />
      <Button onClick={loginHandler}>Login</Button>
    </div>
  );
}

export default Login;