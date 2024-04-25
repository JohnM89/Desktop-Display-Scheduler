import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const InstallPWA = () => {
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
const handler = (e) => {
  console.log("Event fired!");
  e.preventDefault();
  setPromptInstall(e);
};


    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = (e) => {
    if (!promptInstall) {
      return;
    }
    // show the install prompt
    promptInstall.prompt();
    // wait for the user to respond to the prompt
    promptInstall.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // remove the prompt after install button is clicked
      setPromptInstall(null);
    });
  };

  return (
    <Button
      className="install-button z-100 fixed"
      style={{ visibility: promptInstall ? 'visible' : 'hidden' }}
      onClick={handleInstallClick}
    >
      Install App
    </Button>
  );
};

export default InstallPWA;
