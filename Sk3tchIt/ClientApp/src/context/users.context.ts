import React, { useState } from "react";
import { UserModel } from "../models/user.model";

export interface UsersContext {
    users: UserModel[],
    setUsers: (users: UserModel[]) => void
}

export function CreateUsersContext(): UsersContext {
    const [users, setUsers] = useState([] as UserModel[]);

    return {
        users, setUsers
    }
}

export const UsersContext = React.createContext<UsersContext>({} as UsersContext);