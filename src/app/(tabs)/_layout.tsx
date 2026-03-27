import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#ddd',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
            backgroundColor: '#3B82F6',
        }
    }}>
        <Tabs.Screen name="index" options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={24} color="white"></Ionicons>
        }} />
        <Tabs.Screen name="Release" options={{
            title: "Jadwal",
            tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={24} color="white"></Ionicons>
        }} />
        <Tabs.Screen name="AllAnime" options={{
            title: "Semua",
            tabBarIcon: ({ color, size }) => <Ionicons name="tv-outline" size={24} color="white"></Ionicons>
        }} />
    </Tabs>
  )
}

export default TabLayout