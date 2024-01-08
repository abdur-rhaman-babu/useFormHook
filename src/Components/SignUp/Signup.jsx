import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Signup = () => {
const validationSchema = yup.object().shape({
     username: yup
    .string()
    .matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores are allowed')
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must not exceed 20 characters'),

    email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),

    password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    ),

    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords didnot match')
    .required('Confirm Password is required'),
});

const {register,control,handleSubmit,formState:{errors}} = useForm({
    resolver:yupResolver(validationSchema)
})


const onSubmit = (data)=>{
    console.log('submitted data', data);
}
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">User Name</label><br />
                <input type="text" id="username" {...register('username')}/>
                {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label><br />
                <input type="text" id="email" {...register('email')}/>
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label><br />
                <input type="text" id="password" {...register('password')}/>
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label><br />
                <input type="text" id="confirmPassword" {...register('confirmPassword')}/>
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit">submit</button>
        </form>
        <DevTool control={control} /> 
    </div>
    );
};

export default Signup;