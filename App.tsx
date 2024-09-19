/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './src/navigations';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SheetProvider} from 'react-native-actions-sheet';
import './src/sheets/sheets';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.parent}>
      <GestureHandlerRootView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <SheetProvider context="global">
              <Navigation />
            </SheetProvider>
          </Provider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
});

export default App;
