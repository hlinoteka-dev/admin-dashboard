'use client'

import { useState } from 'react';

export default function FormSwitches({ active, switchType }: { active: boolean; switchType: string }) {
  const [toggle, setToggle] = useState(active);

  return (
    <div className="flex items-center">
      <div className="form-switch">
        <input
          type="checkbox"
          id={`switch-${switchType}`}
          className="sr-only"
          checked={toggle}
          onChange={() => setToggle(!toggle)}
        />
        <label className="bg-slate-400 dark:bg-slate-700" htmlFor={`switch-${switchType}`}>
          <span className="bg-white shadow-sm" aria-hidden="true"></span>
          <span className="sr-only">Switch label</span>
        </label>
      </div>
    </div>
  );
}

