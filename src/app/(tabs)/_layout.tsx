import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgb(212,220,236)',
        tabBarStyle: {
            backgroundColor: '#3B82F6',
        }
    }}>
        <Tabs.Screen name="index" options={{
            title: "Home",
            tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color}></Ionicons>
        }} />
        <Tabs.Screen name="Release" options={{
            title: "Jadwal",
            tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? "calendar" : "calendar-outline"} size={24} color={color}></Ionicons>
        }} />
        <Tabs.Screen name="AllAnime" options={{
            title: "Semua",
            tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? "tv" : "tv-outline"} size={24} color={color}></Ionicons>
        }} />
        <Tabs.Screen name="Settings" options={{
            title: "Pengaturan",
            tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={color}></Ionicons>
        }} />
    </Tabs>
  )
}

export default TabLayout