import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CreateModal from './CreateModal';

class CreateModalManager {
  listeners = [];
  
  show = () => {
    this.listeners.forEach(listener => listener(true));
  };
  
  hide = () => {
    this.listeners.forEach(listener => listener(false));
  };
  
  subscribe = (listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  };
}

export const createModalManager = new CreateModalManager();

export const CreateModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  
  useEffect(() => {
    const unsubscribe = createModalManager.subscribe(setVisible);
    return unsubscribe;
  }, []);
  
  return (
    <>
      {children}
      <CreateModal 
        visible={visible}
        onClose={() => createModalManager.hide()}
        navigation={navigation}
      />
    </>
  );
};