import { getFirebaseFirestore } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { setFeedback } from '../../NX/DesignSystem';

export const newVirus = (payload: any, onSuccess?: () => void) => async (dispatch: any) => {
	try {
		const db = getFirebaseFirestore();
		const now = Date.now();
		await addDoc(collection(db, 'viruses'), {
			...payload,
			created: now,
			updated: now,
		});
		dispatch(setFeedback({
			severity: 'success',
			title: 'New Virus° created',
		}));
		if (onSuccess) onSuccess();
	} catch (e: any) {
		dispatch(setFeedback({
			severity: 'error',
			title: e?.message
		}));
	}
};
