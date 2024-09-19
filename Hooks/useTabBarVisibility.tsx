import { useNavigationState } from "@react-navigation/native";
const useTabBarVisibility = () => {
    const state = useNavigationState(state => state);
   // console.log('state',state)
    const routeName=state.routes[state.index]
    const nextState=routeName["state"]?.routes?.find(item=>item.name==='Shop')?.state?.routes?.slice(-1)[0]?.name
    return nextState === 'filters' || nextState=== 'brand'||nextState==='specificItem'
  };
  
  export default useTabBarVisibility;