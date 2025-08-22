import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CreateModal from '../components/CreateModal';

const CreateScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // 화면이 포커스될 때 모달 표시
    const unsubscribe = navigation.addListener('focus', () => {
      setModalVisible(true);
    });

    return unsubscribe;
  }, [navigation]);

  const handleCloseModal = () => {
    setModalVisible(false);
    // 모달 닫으면 이전 화면으로
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <CreateModal 
        visible={modalVisible} 
        onClose={handleCloseModal}
        navigation={navigation}
      />
    </View>
  );
};

export default CreateScreen;