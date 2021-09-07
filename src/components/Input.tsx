import { ReactElement, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

interface inputProps {
  type?: "text" | "email" | "password" | undefined,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
  label?: string,
  prependIcon?: ReactElement,
  appendIcon?: ReactElement,
  prependClick?: Function,
  appendClick?: Function,
  passwordIcon?: boolean
}

function Input({ type, value, setValue, label, prependIcon, appendIcon, prependClick, appendClick, passwordIcon }: inputProps) {
  const [visible, setVisible] = useState(false);
  const [rType, setRType] = useState(type);

  const setVisibleType = (b:boolean) => {
    if (b) {
      setVisible(b);
      setRType('text');
    } else {
      setVisible(b);
      setRType(type);
    }
  }

  return (
    <>
      {
        label &&
        <label>{label}</label>
      }
      <div className="flex items-center gap-2 focus:outline-none w-full bg-gray-600 my-2 rounded-md px-3 text-sm text-white shadow focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-500 focus:ring-white transition duration-150">
        {
          prependIcon &&
          <button className="js w-4 h-4 block cursor-pointer" onClick={ () => { if(prependClick) prependClick() } }>
            {prependIcon}
          </button>
        }
        <input type={rType} value={value} onChange={ e => setValue(e.target.value) } className="py-2" />
        {
          appendIcon &&
          <button className="js w-4 h-4 block cursor-pointer" onClick={ () => { if(appendClick) appendClick() } }>
            {appendIcon}
          </button>
        }
        {
          passwordIcon &&
          <button className="js w-4 h-4 block cursor-pointer" onClick={ () => setVisibleType(!visible) }>
            {
              visible &&
              <EyeIcon />
            }
            {
              !visible &&
              <EyeOffIcon />
            }
          </button>
        }
      </div>
    </>
  )
}

export default Input
