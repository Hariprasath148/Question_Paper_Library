import React from 'react'
import { Staff_card } from '../components/staff_card'
import { Staff_Library } from '../components/Staff_Library'
import { Admin_Table } from "../components/Admin_Table"
import { useState } from 'react'

export const Staff_layout = () => {
    const [isAdmin,setAdmin] = useState(true);

    return (
      <>
        <Staff_card />
        {isAdmin && <Admin_Table />}
        <Staff_Library />
      </>
    )
};
