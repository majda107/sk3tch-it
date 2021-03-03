import { useState } from "react";

export function useInput(val: string) {
    const [value, setValue] = useState(val);

    // const reset = () => setValue(val);
    const bind = {
        value,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
        }
    }

    return [
        value,
        setValue,
        // reset,
        bind
    ]
};