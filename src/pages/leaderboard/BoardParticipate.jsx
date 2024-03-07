import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '../../Components/Input';
import { useForm } from 'react-hook-form';
import MainLayout from '../../Components/MainLayout';
const LeaderboardForm = () => {
const userState = useSelector((state)=>state.user)
  
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    isLoading,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      leaderboardname:"",
      password:"",
      username:userState?.userInfo?.user?.username
    },
    mode: "onChange",
  });
  console.log(userState?.userInfo?.user?.username)
  const handleSubmitParticipate = async ({leaderboardname,password,username}) => {
    const formData= {
      leaderboardname:leaderboardname,
      password:password
    }
    try {
      const response = await fetch('http://localhost:8000/ipl2/lb_participation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData,userState.userInfo.user.username),
      });

      if (response.ok) {
        // Redirect or perform any action upon successful submission
        window.location.href = '/'; // Redirect to home page
      } else {
        // Handle error
        const responseData = await response.json(); // Parse JSON response
    console.error('Error:', responseData.error); // Log error to console
    window.alert(responseData.error); // Display error message to user
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = (data) => {
    const {leaderboardname,password} = data
     handleSubmitParticipate({leaderboardname,password,username:userState?.userInfo?.user?.username})
  
  };
  return (
    <MainLayout>
      <div className='mt-24 flex justify-center items-center h-[500px]'>
      <form onSubmit={handleSubmit} className='w-[50%] p-5 border-2'>
      
      <Input
                  label="Leaderboard Name"
                  id="leaderboardname"
                  type="text"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
                 <Input
                label="Password"
                id="password"
                type="password"
                register={register}
                errors={errors}
                disabled={isLoading}
              />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
      </div>
    </MainLayout>
  );
};

export default LeaderboardForm;
