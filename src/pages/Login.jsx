import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (supabase.auth.user()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await supabase.auth.signIn({ email });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='row pt-4'>
      <div className='col-md-4 offset-md-4'>
        <form onSubmit={handleSubmit} className='card card-body'>
          <input
            type='email'
            name='email'
            placeholder='johnDoe@mail.com'
            className='form-control mb-2'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className='btn btn-primary'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
