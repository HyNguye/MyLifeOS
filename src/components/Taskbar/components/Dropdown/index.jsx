import {  useState } from 'react';
import { memo } from 'react';

function Dropdown({ dropdownItems , children }) {
    const [display, setDisplay] = useState(false);
    const handleDropdown = () => {
            setDisplay(!display);
       
    };

  
    return (
  
            <button onClick={handleDropdown} onBlur={()=>setDisplay(false)} className='h-full relative w-16 text-center flex justify-center items-center select-none'>
                {children}
                <div className={`${display ? '' : 'hidden'} h-fit w-64 absolute top-8 left-0`}>
                    {dropdownItems.map((item) => (
                        <div key={item.name} onClick={item.handleClick} className="text-left h-fit w-full p-3 border-b-2 border-b-black bg-old-0 hover:text-white hover:bg-black select-none">
                            {item.name}
                        </div>
                        
                    ))}
                </div>
            </button>
            
   
    );
}

export default memo(Dropdown);
