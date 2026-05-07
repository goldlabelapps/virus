'use client';
import * as React from 'react';
import moment from 'moment';
import {
    Box,
    CardHeader,
    CardContent,
    Typography,
} from '@mui/material';
import { 
    Icon,
    CleverText,
} from '../../NX/DesignSystem';
import {
    useFingerprint,
    useVirus,
    useDoc,
} from '../../Virus'

export default function Fingerprint() {

    const virus = useVirus();
    const title = virus.title;
    const fp = useFingerprint();
    const doc = useDoc();
    const firstSeen = doc?.created ? `First seen ${moment(doc.created).fromNow()}` : undefined;
    const clever = virus?.clever || `This is the fingerprint of ${title}. It is a unique identifier that can be used to track the virus across different systems and networks. The fingerprint is generated using a combination of various attributes of the virus, such as its code, behavior, and network activity. By analyzing the fingerprint, security researchers can gain insights into the virus's capabilities and potential impact.`;
    return (
        <Box>
            <CardHeader
                avatar={<><Icon icon="fingerprint" /></>}
                // sx={{ alignItems: 'flex-start' }}
                title={<Typography variant="body1">
                        {title}
                    </Typography>} 
                subheader={firstSeen ?? fp}
            />
            <CardContent>
                {/* <pre>doc: {JSON.stringify(doc, null, 2)}</pre> */}
                <CleverText
                    options={{
                        id: 'fingerprint',
                        markdown: clever,
                        onFinish: () => {
                            console.log('finished')
                        }
                    }}
                />
            </CardContent>
        </Box>
    );
}

