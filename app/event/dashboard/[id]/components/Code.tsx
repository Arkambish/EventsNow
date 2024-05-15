import React from 'react'
import Container from './Container'
import { error } from '@/util/Toastify'



export default function Code() {
    const [ticketCode, setTicketCode] = React.useState("")

    const  handleMarkAttendence = async  ()=>  {
        // Add code to mark attendence
        console.log(ticketCode)
        console.log("ashan")
        if(ticketCode.length ==8) {
            const res = await fetch('/api/v1/attendant/markAttendenceUsingCode', {
                method: 'POST',
                body: JSON.stringify({ticketCode}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok) {
                const data = await res.json()
                console.log(data)
            }
            else {
                error("Invalid Ticket Code")
            }
        }
    
    
    
    else{
        error("Invalid Ticket Code")
    }}
  return (
    <div>
        <Container>
            <div className=" text-[#455273]  mr-8">
                Enter your Ticket code
            </div>

            <div className="flex items-center">
                <input
                    type="text"
                    className="w-full px-3 py-[6px] border rounded-md focus:outline-none"
                    onChange={(e) => setTicketCode(e.target.value)}
                    />
                <button 
                    className="bg-slate-400 text-white px-4 py-2 rounded-lg ml-2"
                    onClick={handleMarkAttendence}
                >
                    Mark
                </button>
            </div>


        </Container>
    </div>
  )
}
