import React, { useCallback, useEffect, useState } from 'react';
import { Tooltip } from 'flowbite-react';
import InformationIcon from '/information.svg';
import ProgressBar from './components/ProgressBar';
import ToggleSwitch from './components/ToggleSwitch';
import Toasty from './components/Toasty';

function App() {
  const [wakeLock, setWakeLock] = useState(null);
  const [wakeLockError, setWakeLockError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleToastDismissal = () => {
    const dismissTime = 3000;
    setTimeout(() => {
      setShowToast(false);
    }, dismissTime);
  };
  const enableWakeLock = async () => {
    try {
      const wakeLockSentinel = await navigator.wakeLock.request('screen');
      setWakeLock(wakeLockSentinel);
      setShowToast(true);
      handleToastDismissal();
    } catch (err) {
      setWakeLockError(err);
      setShowToast(false);
    }
  };

  const releaseWakeLock = useCallback(async () => {
    if (wakeLock) {
      await wakeLock.release();
      setWakeLock(null);
      setWakeLockError(null);
      setShowToast(false);
    }
  }, [wakeLock]);

  const toggleWakeLock = async () => {
    const isWakeLockSupported = 'wakeLock' in navigator;

    if (isWakeLockSupported) {
      if (wakeLock === null) {
        await enableWakeLock();
      } else {
        await releaseWakeLock();
      }
    }
  };

  const handleVisibilityChange = useCallback(async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      setWakeLock(await navigator.wakeLock.request('screen'));
    } else {
      await releaseWakeLock();
    }
  }, [releaseWakeLock, wakeLock]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return (
    <section>
      <div className="flex items-center justify-center">
        <h1 className="text-4xl text-center font-bold">Never Sleep</h1>
        <Tooltip
          content="For NeverSleep to do it's job you cannot minimize the window or switch tabs."
          animation="duration-300"
        >
          <img className="w-4 ml-0.5" src={InformationIcon} alt="" />
        </Tooltip>
      </div>

      <p className="lg:max-w-2xl">
        The app works like magic, but needs a hero like you to turn it on.
      </p>

      <ProgressBar wakeLock={wakeLock} wakeLockError={wakeLockError} />

      <div className="flex items-center justify-center mt-5">
        <ToggleSwitch
          checked={wakeLock !== null}
          text={wakeLock === null ? 'Off' : 'On'}
          onChange={toggleWakeLock}
        />
      </div>

      <Toasty
        show={showToast}
        title="How to make sure NeverSleep works."
        text="Do not minimize the window or switch tabs. Just leave the window somewhere in the Abyss."
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
          />
        </svg>
      </Toasty>
    </section>
  );
}

export default App;
