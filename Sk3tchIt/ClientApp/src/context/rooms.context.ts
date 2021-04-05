import React, { useState } from "react";

export interface RoomsContext {
    rooms: string[],
    setRooms: (rooms: string[]) => void
}

export function CreateRoomsContext(): RoomsContext {
    const [rooms, setRooms] = useState([] as string[]);

    return {
        rooms, setRooms
    }
}

export const RoomsContext = React.createContext<RoomsContext>({} as RoomsContext);