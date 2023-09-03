import {Button, TextField} from "@material-ui/core";
import React from "react";

interface RegisterFormProps {
    onOpenRegister: () => void;
    onOpenLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({onOpenRegister, onOpenLogin}) => {
    return (
        <div>
            <form>
                <TextField
                    className='mb-20'
                    size='small'
                    label='Имя и Фамилия'
                    variant='outlined'
                    fullWidth
                    required
                />
                <TextField
                    className='mb-20'
                    size='small'
                    label='Почта'
                    variant='outlined'
                    fullWidth
                    required
                />
                <TextField
                    className='mb-20'
                    size='small'
                    label='Пароль'
                    variant='outlined'
                    type='password'
                    fullWidth
                    required
                />
                <div className="d-flex align-center justify-between">
                    <Button color='primary' variant='contained'>
                        Зарегестрироваться
                    </Button>
                    <Button onClick={onOpenLogin} color='primary' variant='text' c>
                        Войти
                    </Button>
                </div>
            </form>
        </div>
    )
};