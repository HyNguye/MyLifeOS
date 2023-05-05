import NewText from "../Application/NewText";
import { HomeContext, actions } from "~/homepage-store";
import { useContext} from "react";
import {
    AppContext,
    actions as appActions,
  } from "../../components/Application/app-store";
import * as icon from '@asset/icon';
function AppIcon({children}) {
    const [state, dispatch] = useContext(HomeContext);
    const [stateApp, dispatchApp] = useContext(AppContext);
    function handleExtension(app){
        switch (app.type.name) {
          case 'NewText':
            
            return '.txt'
          
          default:
            return '.exe'
        }
      }
      function autoRename(app){
        let newArr = state.appList.filter(myApp=>myApp.type.name === app.type.name)
        if(newArr.indexOf(app)===0||newArr.indexOf(app)===-1){return ''}
        return newArr.indexOf(app)
      }
      function handleClickIcon(e) {
        e.target.style.backgroundColor = 'black'
        e.target.style.color = 'white'
      }
      function handleUnClickIcon(e) {
        e.target.style.backgroundColor = 'transparent'
        e.target.style.color = 'black'
      }
    const handleSource = (app) =>{
        switch (app.type.name) {
            case 'NewText':
                
                return  icon.TextIcon
            case 'Piano':
                return icon.PianoIcon
            case 'MyShop':
              return icon.ShopIcon
            default:
                return icon.NewFolderIcon
        }
    }
    return ( 
        <button 
        className=" h-28 w-28 flex flex-col"
        onDoubleClick={()=>dispatchApp(appActions.setRunningAppsList(children))}
        onMouseDown={handleClickIcon}
        onMouseUp={handleUnClickIcon}>
          <img className='w-full h-full object-contain' src={handleSource(children)}/>
          <div className="text-xs pt-5">{children.type.name +autoRename(children)+handleExtension(children)}</div>
        </button>
        
     );
}

export default AppIcon;