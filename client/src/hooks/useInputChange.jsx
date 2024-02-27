import { useState } from 'react';

function useInputChange(initialState, validation) {
  const [userData, setUserData] = useState(initialState);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    const fieldErrors = validation({ [name]: value });

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: fieldErrors[name]
    }));

    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  }

  return { userData, errors, handleChange };
}

export default useInputChange;
