import React from 'react';
import { AppSetting, AppStep } from '../lib/type';

export default function setting({
  appSetting,
  setAppSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppSetting: React.Dispatch<React.SetStateAction<AppSetting>>;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return <div>this is setting page</div>;
}
