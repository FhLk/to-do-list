"use client"
import React, { useEffect } from 'react'
import TodoList from "@/components/TodoPage/TodoList"
import ProtectedRoute from '@/components/ProtectedRoute'

function page() {
  return (
    <ProtectedRoute>
      <TodoList status='done'/>
    </ProtectedRoute>
  )
}

export default page
