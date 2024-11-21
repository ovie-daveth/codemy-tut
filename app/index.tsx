import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from "expo-secure-store"
import { Redirect } from 'expo-router'

const Root = () => {

  const [isLoggedIn, setIsLogedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const subscription = async() => {
        const token = SecureStore.getItem("accessToken");
        setIsLogedIn(token ? true : false)
        setIsLoading(false)
    }
    subscription()
  }, [])
  return (
    <>
      {
        isLoading ? <></> : (
          <Redirect href={!isLoggedIn ? "/(routes)/onboarding" : "/(tabs)"} />
        )
      }
    </>
  )
}

export default Root