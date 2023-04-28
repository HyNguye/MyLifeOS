import Dropdown from './components/Dropdown';
import { HomeContext, actions } from '~/homepage-store';

import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useMemo, useRef } from 'react';
import { AppContext,actions as appActions } from '@comp/Application/app-store';

import PersonalInfo from '@comp/Application/PersonalInfo';
import NewText from '@comp/Application/NewText';
import ClockMini from '@app/Clock/components/Clockminimize';


function Taskbar() {
    const findInputRef = useRef();
    const navigate = useNavigate();
    const [state, dispatch] = useContext(HomeContext);
    const [stateApp, dispatchApp] = useContext(AppContext);
    const createTab = ([...tab], [...handleFunc]) => {
        let newTab = [...tab].map((x, index) => ({ name: x, handleClick: [...handleFunc][index] }));
        return newTab;
    };
    const handleChangeBG = useCallback(() => {
        dispatch(actions.changeBackground());
    }, []);
    const handleShowInfo = useCallback(() => {
        dispatchApp(appActions.setRunningAppsList(<PersonalInfo/>));

    }, []);
    const handleReset = useCallback(() => {
        navigate('/');
        window.location.reload();
    }, []);
    const handleLockScreen = useCallback(() => {
        
        dispatch(actions.lockScreen(true));
       
    }, []);
    const handleNewText = useCallback(() => {
        dispatchApp(appActions.setRunningAppsList(<NewText/>))
    }, []);
    const handleFindTaskBar = useCallback(() => {
        findInputRef.current.style.visibility = 'visible';
        findInputRef.current.focus();
    }, []);
    const handleFind = (e) => {
        dispatch(actions.findApp(e.target.value));
    };
    const cancelFindHandle = () => {
        findInputRef.current.style.visibility = 'hidden';
        //dang phat trien
    };
    const handleSortByKind = useCallback(() => {}, []);
    const handleSortByName = useCallback(() => {}, []);
    const infoTab = useMemo(
        () =>
            createTab(
                ['Personal Info', 'Lock Screen', 'Reset', 'Change Background'],
                [handleShowInfo, handleLockScreen, handleReset, handleChangeBG],
            ),
        [],
    );
    const fileTab = useMemo(() => createTab(['New Text', 'Find'], [handleNewText, handleFindTaskBar]), []);
    const viewTab = useMemo(
        () => createTab(['Sort By Name', 'Sort By Kind'], [handleSortByName, handleSortByKind]),
        [],
    );

    return (
        <div className="w-full h-8 bg-old-0 border-b-black border-b-2 relative top-0 left-0 flex justify-between items-center \"
        style={{zIndex: 3}}>
            <div className="logo flex justify-evenly items-center h-full w-96">
                <Dropdown dropdownItems={infoTab}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 fill-black"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                        />
                    </svg>
                </Dropdown>
                <Dropdown dropdownItems={fileTab}>File</Dropdown>
                <Dropdown dropdownItems={viewTab}>View</Dropdown>
            </div>
            <input
                ref={findInputRef}
                onChange={handleFind}
                value={state.find}
                onBlur={cancelFindHandle}
                className="h-3/4 w-1/4 border-black border-2 p-2 invisible"
            />
            <ClockMini/>
        </div>
    );
}

export default Taskbar;
