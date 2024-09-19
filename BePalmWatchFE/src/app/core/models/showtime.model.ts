import { SeatStatus } from "../enum/seat-status.enum"

export interface Showtime {
    date: string,
    time: string,
    totalPrice: number,
}

export interface Ticket {
    id: number,
    row: number,
    seat: number,
    status: SeatStatus,
    date: string,
    time: string,
    price: number,
}