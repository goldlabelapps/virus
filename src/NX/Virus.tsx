'use client';
import * as React from 'react';
import { useDispatch } from '../NX/Uberedux';
import { 
  initVirus,
  useDoc,
  useVirus,
  VirusDialog,
  VirusButton,
  checkFingerprint,
  useSubFingerprint,
  parseDevice,
} from '../Virus';

export default function Virus() {
  const dispatch = useDispatch();
  const slice = useVirus();
  const doc = useDoc();

  React.useEffect(() => {
    if (!slice || Object.keys(slice).length === 0) {
      dispatch(initVirus());
    }
  }, [dispatch, slice]);

  React.useEffect(() => {
    if (slice?.fingerprint) {
      dispatch(checkFingerprint());
    }
  }, [slice?.fingerprint]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (doc && Object.keys(doc).length > 0 && !doc.device) {
      dispatch(parseDevice());
    }
  }, [doc]);

  useSubFingerprint();

  return (<>
            <VirusDialog />
            <VirusButton />
          </>);
}