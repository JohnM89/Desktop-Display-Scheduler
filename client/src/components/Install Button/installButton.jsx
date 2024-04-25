import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const InstallPWA = () => {
  const [promptInstall, setPromptInstall] = useState(null);

useEffect(() => {
  const handler = (e) => {
    console.log("beforeinstallprompt event fired"); // Confirm event firing
    e.preventDefault(); // Prevent the mini-infobar
    setPromptInstall(e); // Save the event
  };

  window.addEventListener('beforeinstallprompt', handler);

  return () => {
    window.removeEventListener('beforeinstallprompt', handler);
  };
}, []);

const handleInstallClick = () => {
  console.log("Install button clicked"); // Log when the button is clicked
  if (!promptInstall) {
    console.log("No install prompt available");
    return;
  }
  promptInstall.prompt();
  promptInstall.userChoice.then((choiceResult) => {
    console.log(`User choice result: ${choiceResult.outcome}`); // Log the outcome
    setPromptInstall(null); // Remove the prompt
  });
};

  return (
    <Button
      className="install-button z-100 fixed bottom-0 right-0 m-4"

      style={{ visibility: promptInstall ? 'visible' : 'hidden' }}
      onClick={handleInstallClick}
    >
      Install App
    </Button>
  );
};

export default InstallPWA;
