import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import Route from './src/routes';
import { UserDataContextProvider, ThemeProvider } from './src/context';
import { CommonLoaderProvider } from './src/components';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserDataContextProvider>
          <CommonLoaderProvider>
            <Route />
            <FlashMessage position="bottom" floating={true} />
          </CommonLoaderProvider>
        </UserDataContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
