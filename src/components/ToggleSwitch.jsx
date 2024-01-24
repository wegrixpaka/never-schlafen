import PropTypes from 'prop-types';
import React from 'react';

function ToggleSwitch({ checked, text, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value={checked} checked={checked} className="sr-only peer" onChange={onChange} />
      <div className={`w-14 h-7 peer-focus:outline-none ${checked ? 'peer-checked:bg-green-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white' : 'bg-gray-200'} peer-focus:ring-2 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700  after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600`} />
      <span className="ms-2 text-md font-bold text-gray-900 dark:text-gray-300">{text}</span>
    </label>
  );
}

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  text: PropTypes.string,
  onChange: PropTypes.func,
};

export default ToggleSwitch;
