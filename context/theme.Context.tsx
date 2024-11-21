import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native"

//define my themes

const DarkTheme = {
    dark: true,
    color: {
        backgroundColor: "#000000",
        text: "#ffffff"
    }  
}

const LightTheme = {
    dark: false,
    color: {
        backgroundColor: "#ffffff",
        text: "#000000"
    }  
}

const ThemeContext = createContext({
    theme: DarkTheme,
    toggleTheme: () => {}
})

export const ThemeProvider = ({children}: any) => {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme === "dark" ? DarkTheme : LightTheme);

    useEffect(() => {
        const loadTheme = async () => {
            const loadedTheme = await AsyncStorage.getItem("userTheme");
            if (loadedTheme){
                setTheme(loadedTheme === "dark" ? DarkTheme : LightTheme)
            } else {
                setTheme(systemTheme === "dark" ? DarkTheme : LightTheme)
            }
        }

        loadTheme
    }, [theme])

    const toggleTheme = async () => {
        const newTheme = theme.dark ? LightTheme : DarkTheme
        setTheme(newTheme);

        await AsyncStorage.setItem("userTheme", newTheme.dark ? "dark" : "light")

    }


    return <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
}