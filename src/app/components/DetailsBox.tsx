import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { cssInterop } from 'nativewind'

cssInterop(LinearGradient, { className: 'style' });

const DetailsBox = React.forwardRef(({ className, ...props }: any, ref?: any) => {
    return (
        <LinearGradient
            {...props}
            className={className}
            ref={ref}
        />
    );
});

export default DetailsBox;