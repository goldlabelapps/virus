"use client";
import React, { useEffect } from "react";
import {
    Box,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useDispatch } from '../../NX/Uberedux';
import { 
    Icon, 
    CleverText, 
} from '../../NX/DesignSystem';
import { setVirus, useVirus } from '../../Virus';

export default function VirusButton() {

    const dispatch = useDispatch();
    const virus = useVirus();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const toggleText = virus?.toggleText || '';
    const icon = virus?.icon || 'virus';

    useEffect(() => {
        if (!toggleText) return;
        const timeout = setTimeout(() => {
            dispatch(setVirus('toggleText', ''));
        }, 2500);
        return () => clearTimeout(timeout);
    }, [dispatch, toggleText]);

    const handleIconClick = () => {
        dispatch(setVirus('dialogOpen', true));
    };

    return <>
        <Box sx={{
            display: 'flex',
            gap: 1,
        }}>
            {!isMobile && <Box>
                <CleverText options={{
                    id: 'infoPaneCleverText',
                    markdown: toggleText,
                }} />
            </Box>}
            <Box>
                <IconButton
                    sx={{ m: 1 }}
                    color="primary"
                    onClick={handleIconClick}>
                    <Icon icon={icon} />
                </IconButton>
            </Box>
        </Box>

    </>

}


/* 
<pre>{JSON.stringify(firestoreDoc, null, 2)}</pre> 
*/