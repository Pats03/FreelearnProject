import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Formrow } from '../components';
import customFetch from '../utils/customFetch';
import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useActionData } from 'react-router-dom';
import { useState } from 'react';
import FormRowSelect from '../components/FormRowSelect';
const CLASS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const role = ['TEACHER', 'STUDENT'];
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };

  if (data.name.length < 3) {
    errors.msg = 'name too short';
    return errors;
  }

  if (data.role === 'STUDENT') {
    data.role = 'user';
  } else {
    data.role = 'admin';
  }

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const errors = useActionData();
  const [class1, setClass1] = useState('false');

  const handleClass = (e) => {
    if (e.target.value === 'STUDENT') {
      setClass1('true');
    } else {
      setClass1('false');
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo className="logo" />
        <h4>Register</h4>
        {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <Formrow type="text" name="name" />
        <Formrow type="text" name="email" labelText="Email" />
        <FormRowSelect
          labelText="Role"
          name="role"
          onChange={handleClass}
          list={Object.values(role)}
        />

        {class1 === 'true' && (
          <FormRowSelect
            labelText="standard"
            name="standard"
            list={Object.values(CLASS)}
          />
        )}
        <Formrow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
