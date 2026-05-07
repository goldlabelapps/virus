import type { T_UbereduxDispatch } from '../../NX/types';
import { setUbereduxKey } from '../../NX/Uberedux';
import { getFirebaseFirestore } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';
import deviceModels from './deviceModels.json';

function getDeviceInfo() {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const vendor = navigator.vendor || '';
    const isMobile = /Mobi|Android/i.test(ua);

    let browser = 'Unknown';
    if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Edg/i.test(ua)) browser = 'Edge';
    else if (/Chrome/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua)) browser = 'Safari';

    let os = 'Unknown';
    if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Mac/i.test(ua)) os = 'MacOS';
    else if (/Linux/i.test(ua)) os = 'Linux';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';

    let modelCode: string | null = null;
    const androidMatch = ua.match(/\((?:Linux; Android [^;]+; )([^;]+)\)/);
    if (androidMatch?.[1]) {
        modelCode = androidMatch[1].trim();
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
        const iosMatch = ua.match(/iPhone\d+,\d+|iPad\d+,\d+/i);
        if (iosMatch?.[0]) modelCode = iosMatch[0];
        else if (/iPhone/i.test(ua)) modelCode = 'iPhone';
        else if (/iPad/i.test(ua)) modelCode = 'iPad';
        else if (/iPod/i.test(ua)) modelCode = 'iPod';
    }

    let friendlyModel = modelCode;
    if (os && modelCode) {
        const osMap = (deviceModels as Record<string, Record<string, string>>)[os];
        if (osMap?.[modelCode]) friendlyModel = osMap[modelCode];
    }

    return {
        browser,
        os,
        ...(friendlyModel !== null && { model: friendlyModel }),
        ...(modelCode !== null && { modelCode }),
        isMobile,
        platform,
        vendor,
        languages: navigator.languages ?? [],
    };
}

export const parseDevice = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            const fingerprint = getState()?.redux?.virus?.fingerprint;
            if (!fingerprint || typeof fingerprint !== 'string') return;

            const device = getDeviceInfo();

            const db = getFirebaseFirestore();
            const ref = doc(db, 'fingerprints', fingerprint);
            await updateDoc(ref, { device, updated: Date.now() });
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
