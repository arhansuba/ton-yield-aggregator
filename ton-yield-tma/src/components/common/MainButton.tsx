import { useEffect } from 'react';
import  WebApp  from '@twa-dev/sdk';

interface MainButtonProps {
  text: string;
  onClick: () => void;
  show?: boolean;
  disabled?: boolean;
  progress?: boolean;
  color?: string;
}

export default function MainButton({
  text,
  onClick,
  show = true,
  disabled = false,
  progress = false,
  color
}: MainButtonProps) {
  useEffect(() => {
    WebApp.MainButton.setText(text);
    WebApp.MainButton.onClick(onClick);

    if (color) {
      WebApp.MainButton.setParams({ color });
    }

    if (show) {
      WebApp.MainButton.show();
    } else {
      WebApp.MainButton.hide();
    }

    if (disabled) {
      WebApp.MainButton.disable();
    } else {
      WebApp.MainButton.enable();
    }

    if (progress) {
      WebApp.MainButton.showProgress();
    } else {
      WebApp.MainButton.hideProgress();
    }

    return () => {
      WebApp.MainButton.offClick(onClick);
    };
  }, [text, onClick, show, disabled, progress, color]);

  return null;
}