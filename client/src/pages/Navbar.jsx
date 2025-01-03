import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true });
      if (response.data.success) {
        toast({
          title: 'Logout Successful',
          description: response.data.message,
          status: 'success'
        });
        navigate("/login");
      } else {
        toast({
          title: 'Logout Failed',
          description: response.data.message || 'An error occurred',
          status: 'error'
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: 'Logout Failed',
        description: 'An error occurred while logging out. Please try again.',
        status: 'error'
      });
    }
  };

  return (
    <div className='bg-gray-800 m-9 p-5'>
      <div className='max-w-100xl flex items-center justify-between'>
        <h1 className='font-bold text-zinc-100'>Kalp MERN</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
}

export default Navbar;