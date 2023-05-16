import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../customButton/customButton'

const SocialSignInButtons = () => {
    const onSignInFacebook = () => {
        console.warn("facebook");
    }

    const onSignInGoogle = () => {
        console.warn("google");
    }

    const onSignInApple = () => {
        console.warn("apple");
    }


    return (
        <>
            <CustomButton
                text="Sign Up with Facebook"
                onPress={onSignInFacebook}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />

            <CustomButton
                text="Sign Up with Google"
                onPress={onSignInGoogle}
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />

            <CustomButton
                text="Sign Up with Apple"
                onPress={onSignInApple}
                bgColor="#e3e3e3"
                fgColor="#363636"
            />
        </>
    )
}

export default SocialSignInButtons