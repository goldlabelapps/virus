
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    TextField,
    Button,
    Collapse,
    IconButton,
} from '@mui/material';
import { Icon, navigateTo } from '../../NX/DesignSystem';
import { useDispatch } from '../../NX/Uberedux';
import { useAccount } from '../../NX/Paywall';
import { 
    newVirus, 
    randomVirus,
} from '../../Virus'

export default function NewVirus() {
    const dispatch = useDispatch();
    const router = useRouter();
    const account = useAccount();
    const { name } = account || {};
    const [open, setOpen] = React.useState(true);
    const [form, setForm] = React.useState(() => ({
        name: randomVirus(),
        score: 1,
        message: '',
    }));

    const [errors, setErrors] = React.useState<any>({});
    const [isValid, setIsValid] = React.useState(false);

    const validate = React.useCallback((nextForm = form) => {
        const errs: any = {};
        if (!nextForm.message) errs.message = 'Message is required';
        setErrors(errs);
        setIsValid(Object.keys(errs).length === 0);
        return Object.keys(errs).length === 0;
    }, [form]);

    React.useEffect(() => {
        validate(form);
    }, [form, validate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const nextForm = { ...prev, [name]: value };
            validate(nextForm);
            return nextForm;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(form)) return;
        dispatch(newVirus(form, () => {
            setForm({
                name: '',
                message: '',
                score: 1,
            });
            setOpen(false);
        }));
    };

    return (<>
    <Box sx={{ mb: 3}}>
                <Box display="flex">
                    <Box sx={{flexGrow:1}} />
                    <Button
                        variant='outlined'
                        startIcon={<Icon icon="virus" />}
                        onClick={() => {
                            dispatch(navigateTo(router, '/viruses'));
                        }}
                    >
                        Viruses°
                    </Button>
                </Box>
            </Box>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box component="form" onSubmit={handleSubmit} 
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Virus° name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        variant="filled"
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="Random Virus°"
                                    onClick={() => {
                                        const virus = randomVirus();
                                        setForm(prev => ({ ...prev, name: virus }));
                                    }}
                                    edge="end"
                                >
                                    <Icon icon="virus" />
                                </IconButton>
                            )
                        }}
                    />
                    {/* Removed 'To' and 'Email' fields as requested */}
                    
                    <TextField
                        label="Message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        minRows={4}
                        required
                        variant="filled"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button 
                            fullWidth
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            endIcon={<Icon icon="tick" />} 
                            disabled={!isValid}>
                            Create Virus
                        </Button>
                    </Box>
                </Box>
            </Collapse>
    </>        
    );
}

