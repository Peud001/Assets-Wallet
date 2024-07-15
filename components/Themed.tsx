import {Text as DefaultText, View as DefaultView} from 'react-native'
import { useColorScheme } from 'nativewind'
import Color from '@/constants/Color'

type ThemeProps = {
    lightColor?: string
    darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']

export const useThemeColor = () => {
    const {colorScheme: theme} = useColorScheme()
    return Color[theme ?? 'light']
}

export const Text = ({className, ...props}: TextProps) => {
    const theme = useThemeColor()
    return <DefaultText style={theme} className={`text-primary ${className}`} {...props}/>
}

export const View = ({className, ...props}: ViewProps ) => {
    const theme = useThemeColor()
    return <DefaultView style={theme} className={`text-primary ${className}`} {...props}/>
}
