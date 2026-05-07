import type { T_UbereduxDispatch } from '../../../NX/types';
import { setUbereduxKey } from '../../../NX/Uberedux';
import { setVirus } from '../../../Virus';
import { getFirebaseFirestore } from '../../utils/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const VIRUS_JUST_DELETED_SESSION_KEY = 'virus.justDeletedFingerprint';

const RETURNING_VISITOR_MARKDOWN = `Your device's unique fingerprint was recognised by [FingerprintJS](https://fingerprintjs.com/). With no personal data collected, it is a stable identifier derived from your device and browser characteristics used to  
- Recognise you across sessions without requiring a login
- Track how viruses spread across unique visitors
- Personalise your experience over time
`.trim();

const NEW_VISITOR_MARKDOWN = `Your device has been assigned a unique fingerprint by [FingerprintJS](https://fingerprintjs.com/). With no personal data collected, it is a stable identifier derived from your device and browser characteristics used to  
- Recognise you across sessions without requiring a login
- Track how viruses spread across unique visitors
- Personalise your experience over time
`.trim();

export const checkFingerprint = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            
            const state = getState();
            const fingerprint = state?.redux?.virus?.fingerprint;
            // console.log('Checking fingerprint...', fingerprint);

            if (!fingerprint || typeof fingerprint !== 'string') {
                console.log('checkFingerprint: no valid fingerprint, bailing.');
                return;
            }

            if (typeof window !== 'undefined') {
                const justDeleted = window.sessionStorage.getItem(VIRUS_JUST_DELETED_SESSION_KEY) === '1';
                if (justDeleted) {
                    // console.log('checkFingerprint: justDeleted flag set, bailing.');
                    window.sessionStorage.removeItem(VIRUS_JUST_DELETED_SESSION_KEY);
                    dispatch(setVirus('fingerprintDoc', null));
                    return;
                }
            }

            const db = getFirebaseFirestore();
            const docRef = doc(db, 'fingerprints', fingerprint);
            // console.log('checkFingerprint: calling getDoc for', fingerprint);
            const snapshot = await getDoc(docRef);
            // console.log('checkFingerprint: snapshot.exists() =', snapshot.exists());

            if (!snapshot.exists()) {
                console.log('No existing fingerprint found. Creating new document...');
                const now = Date.now();
                await setDoc(docRef, {
                    created: now,
                    updated: now,
                });
                dispatch(setVirus('title', 'You have been fingerprinted'));
                dispatch(setVirus('clever', NEW_VISITOR_MARKDOWN));
            } else {
                await updateDoc(docRef, { updated: Date.now() });
                dispatch(setVirus('title', `Device fingerprint recognised`));
                dispatch(setVirus('clever', RETURNING_VISITOR_MARKDOWN));
            }

        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };