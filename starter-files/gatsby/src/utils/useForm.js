import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = +value;
    }
    setValues({
      // copy existing values into it
      ...values,
      // update new value that changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
